const config = require('config');
const utils = require('utils');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {

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
            utils.newCreep(Game.spawns['Spawn1'], role);
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
        }
        runs[creep.memory.role]();
    });
}