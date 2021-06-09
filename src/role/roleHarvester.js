const creepUtils = require("../utils/creepUtils");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            var target = creep.room.find(FIND_FLAGS, {
                filter: function (Flag) {
                    return Flag.pos.lookFor(LOOK_CREEPS).length == 0;
                }
            });
            if (target) { 
            creepUtils.domoveTo(creep, target[0]);
        }
    }

}
};

module.exports = roleHarvester;