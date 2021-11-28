var config = require('config');
var utils = require('utils');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
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
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        const runs = {
            'harvester': () => roleHarvester.run(creep),
            'upgrader': () => roleUpgrader.run(creep),
            'builder': () => roleBuilder.run(creep),
        }
        runs[creep.memory.role]();
    }
}