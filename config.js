module.exports = {
    ROLE_LIST: {
        'harvester': {
            maxCount: 5,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE],
        },
        'upgrader': {
            maxCount: 8,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE],
        },
        'builder': {
            maxCount: 5,
            sourceId: null,
            // sourceId: '5bbcaf1a9099fc012e63a2c3',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        },
        'porter': {
            maxCount: 1,
            sourceId: '5bbcaf0b9099fc012e63a094',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        }
    },
    BUILD_PRIORITY_ITEM_ID: null,
};
