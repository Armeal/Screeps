const creepUtils = require("../utils/creepUtils");

var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,sources[0])
            }

            var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                    creepUtils.domoveTo(creep,closestHostile);
                }
                
            }else{

        }
        
	}
};

module.exports = roleDefender;