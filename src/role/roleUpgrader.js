var creepUtils = require('../utils/creepUtils');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {


	    if(creep.store[RESOURCE_ENERGY] == 0) {
            if(creep.room.memory.spawnReady == false){
                return;
            }
            var struction = creepUtils.findResourceFromStorge(creep);
            if(creep.withdraw(struction, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,struction);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep,creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
