module.exports = {
    ROLE_LIST: {
        'harvester': {
            maxCount: 8,
            sourceId: '5bbcaf1a9099fc012e63a2c3',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE],
        },
        'upgrader': {
            maxCount: 3,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, WORK, CARRY, TOUGH, MOVE],
        },
        'builder': {
            maxCount: 2,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        },
        'collector': {
            maxCount: 4,
            sourceId: '5bbcaf1a9099fc012e63a2c2',
            body: [WORK, CARRY, CARRY, TOUGH, MOVE],
        },
        'porter': {
            maxCount: 0,
            sourceId: null,
            body: [WORK, CARRY, CARRY, TOUGH, MOVE, MOVE],
        },
    },
    BUILD_PRIORITY_ITEM_ID: null,
};
