var creepUnit = require('creepUnit');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            var struction = creepUnit.findResourceFromStorge(creep);
            if(creep.withdraw(struction, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUnit.domoveTo(creep,struction);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creepUnit.domoveTo(creep,creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
