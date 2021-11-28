var utils = {
    newCreep: function(spawn, role) {
        var id = Game.time;
        var newName = role + id;
        console.log('Spawning new role: ' + newName);
        spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: { role, id }});
    }
}

module.exports = utils;