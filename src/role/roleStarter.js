const creepUtils = require("../utils/creepUtils");

var roleStarter = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,sources[0])
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == 'spawn' ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == 'container') && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep,targets[0]);
                }
            }
        }
	}
};

module.exports = roleStarter;