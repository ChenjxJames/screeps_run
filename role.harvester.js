var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (!creep.memory.sourceId) {
                creep.memory.sourceId = sources[Math.floor(Math.random() * sources.length)].id;
            }
            var source = sources.find(source => source.id === creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                targets.some((target)  => {
                    if (creep.store.getUsedCapacity() === 0) {
                        return true;
                    }
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                });
                
            } else {
                var flag = creep.room.find(FIND_FLAGS).find(flag => flag.name === 'rest');
                creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}})
            }
        }
    }
};

module.exports = roleHarvester;