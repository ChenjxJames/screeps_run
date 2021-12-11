module.exports = {
    ROLE_LIST: {
        'harvester': {
            maxCount: 8,
            sourceId: '5bbcaf1a9099fc012e63a2c3',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE],
        },
        'upgrader': {
            maxCount: 6,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        },
        'builder': {
            maxCount: 3,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        },
        'porter': {
            maxCount: 0,
            body: [WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        }
    },
    BUILD_PRIORITY_ITEM_ID: null,
};
