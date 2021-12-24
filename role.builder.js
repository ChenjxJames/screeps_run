const config = require('config');

const roleBuilder = {

    /**
     * @param {Creep} creep
     * 建设者
     * 建造房间内的建筑
     */
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            const targets = config.BUILD_PRIORITY_ITEM_ID ?
            [Game.getObjectById(config.BUILD_PRIORITY_ITEM_ID)]
            : creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (!creep.memory.sourceId) {
                creep.memory.sourceId = sources[Math.floor(Math.random() * sources.length)].id;
            }
            const source = sources.find(source => source.id === creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;