const creepUtils = require("../utils/creepUtils");

var roleStarter = {

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.memory.ready && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.ready = false;
        }

        if (!creep.memory.ready && creep.store.getFreeCapacity() === 0) {
            creep.memory.ready = true;
        }

        if (creep.memory.ready) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == 'spawn') &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, targets[0]);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, creep.room.controller);
                }
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'Ruin')
                }
            });
            if (target) {
                if (creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, target)
                }
            }
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep, source)
            }
        }
    }
};

module.exports = roleStarter;