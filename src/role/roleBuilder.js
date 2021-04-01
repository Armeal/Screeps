var creepUtils = require('../utils/creepUtils');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 take');
	    }

        if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep,target);
                }
            }
        }else {
            var struction = creepUtils.findResourceFromStorge(creep);
            if(creep.withdraw(struction, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,struction);
            }       
        }
    }
};

module.exports = roleBuilder;