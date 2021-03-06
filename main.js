const config = require('config');
const utils = require('utils');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const rolePorter = require('role.porter');
const roleCollector = require('role.collector');

module.exports.loop = function () {

    Object.values(Game.rooms).forEach((room) => {
        const towers = room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_TOWER
        });
        towers.forEach((tower) => {
            if (tower) {
                // 攻击所有不属于我的creeps, 开启安全模式
                const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                    room.controller.activateSafeMode();
                } else {
                    // 维修最低血量的建筑
                    const damagedStructureList = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
                    });
                    damagedStructureList.sort((a, b) => a.hits - b.hits);
                    if (damagedStructureList.length > 0) {
                        tower.repair(damagedStructureList[0]);
                    }
                }
            }
        });
    });

    // 使用LINK传送资源
    const linkFrom = Game.getObjectById('61b60973ecdd396f1fdc2e78');
    const linkTo = Game.getObjectById('61b567a2615732cb5dc64f14');
    if (linkTo.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        linkFrom.transferEnergy(linkTo);
    }


    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let log = '';
    let spawning = false;
    for (const role in config.ROLE_LIST) {
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        const roleInfo = config.ROLE_LIST[role];
        if (!spawning && creeps.length < roleInfo.maxCount) {
            utils.newCreep(Game.spawns['Spawn1'], role, roleInfo.body);
            spawning = true;
        }
        log += `${role}: ${creeps.length}, `;
    }
    console.log(log);

    if (Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    let creeps = [];
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        creep.memory.sourceId = config.ROLE_LIST[creep.memory.role].sourceId || creep.memory.sourceId; // TODO: 临时
        if (creep.store.getFreeCapacity() === 0) {
            creeps.unshift(creep);
        } else {
            creeps.push(creep);
        }
    }

    creeps.forEach((creep) => {
        const runs = {
            'harvester': () => roleHarvester.run(creep),
            'upgrader': () => roleUpgrader.run(creep, linkTo),
            'builder': () => roleBuilder.run(creep),
            'porter': () => rolePorter.run(creep),
            'collector': () => roleCollector.run(creep, linkFrom),
        }
        runs[creep.memory.role]();
    });
}
