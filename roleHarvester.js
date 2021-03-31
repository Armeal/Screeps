const creepUnit = require("./creepUnit");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

            var target = creep.pos.findClosestByRange(FIND_SOURCES);	    
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creepUnit.domoveTo(creep,target)
            }
        
	}
};

module.exports = roleHarvester;