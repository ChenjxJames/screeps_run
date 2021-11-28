module.exports = {
    newCreep: function(spawn, role) {
        const id = Game.time;
        const newName = role + id;
        console.log('Spawning new role: ' + newName);
        spawn.spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {memory: { role, id }});
    }
}
