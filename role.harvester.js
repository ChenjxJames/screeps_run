const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
        }
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
        }

        if (creep.memory.harvesting) {
            const sources = creep.room.find(FIND_SOURCES);
            if (!creep.memory.sourceId) {
                creep.memory.sourceId = sources[Math.floor(Math.random() * sources.length)].id;
            }
            const source = sources.find(source => source.id === creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                targets.some((target) => {
                    if (creep.store.getUsedCapacity() === 0) {
                        return true;
                    }
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                });
            } else {
                const flag = creep.room.find(FIND_FLAGS).find(flag => flag.name === 'rest');
                creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }
};

module.exports = roleHarvester;