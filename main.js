const config = require('config');
const utils = require('utils');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const rolePorter = require('role.porter');

module.exports.loop = function () {

    Object.values(Game.rooms).forEach((room) =>{
        const towers = room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_TOWER
            });
        towers.forEach((tower) => {
            if(tower) {
                const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && (
                        structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType === STRUCTURE_RAMPART
                    )
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }

                const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        });
    });


    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let log ='';
    for(const role in config.ROLE_LIST) {
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        const roleInfo = config.ROLE_LIST[role];
        if(creeps.length < roleInfo.maxCount) {
            utils.newCreep(Game.spawns['Spawn1'], role, roleInfo.body);
        }
        log += `${role}: ${creeps.length}, `;
    }
    console.log(log);

    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    let creeps = [];
    for(const name in Game.creeps) {
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
            'upgrader': () => roleUpgrader.run(creep),
            'builder': () => roleBuilder.run(creep),
            'porter': () => rolePorter.run(creep),
        }
        runs[creep.memory.role]();
    });
}