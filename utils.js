module.exports = {
    newCreep: function (spawn, role, body = [WORK, CARRY, MOVE]) {
        const id = Game.time;
        const newName = role + id;
        console.log('Spawning new role: ' + newName);
        spawn.spawnCreep(body, newName, { memory: { role, id } });
    }
}
