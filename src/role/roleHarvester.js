const creepUtils = require("../utils/creepUtils");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,creep.pos.findClosestByPath(FIND_FLAGS));
            }
        
	}
};

module.exports = roleHarvester;