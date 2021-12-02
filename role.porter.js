const rolePorter = {
  /** @param {Creep} creep **/
  run: function (creep) {
    let rest = false;
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.porting) {
      let storage = null;
      const tombstones = creep.room.find(FIND_TOMBSTONES, {
        filter: (ruin) => ruin.store.getUsedCapacity() > 0
      });
      const ruins = creep.room.find(FIND_RUINS, {
        filter: (ruin) => ruin.store.getUsedCapacity() > 0
      });
      const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES)
      if (Object.keys(tombstones).length > 0) {
        storage = tombstones[0];
      } else if (Object.keys(ruins).length > 0) {
        storage = ruins[0];
      } else if (Object.keys(droppedResources).length > 0) {
        storage = droppedResources[0];
      }
      if (storage) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
          creep.memory.porting = true;
        }
      } else {
        rest = true;
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER ||
            structure.structureType == STRUCTURE_SPAWN) &&
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
        creep.memory.porting = false;
      } else {
        rest = true;
      }
    }
    if (rest) {
      const flag = creep.room.find(FIND_FLAGS).find(flag => flag.name === 'rest');
      creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  },
};

module.exports = rolePorter;