const creepUtils = require("../utils/creepUtils");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.target);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,source)
            }
        
	}
};

module.exports = roleHarvester;