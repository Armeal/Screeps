const creepUtils = require("../utils/creepUtils");

var roleCarrier = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.ready && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.ready = false;
        }

        if (!creep.memory.ready && creep.store.getFreeCapacity() === 0) {
            creep.memory.ready = true;
        }

        if (creep.memory.ready) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == 'spawn' ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, target);
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == 'container') &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creepUtils.domoveTo(creep, target);
                    }
                }

            }
        } else if (creep.room.memory.spawnReady == false) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'container') &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
                }

            });
            if(!target){
                var resources = creep.room.find(FIND_DROPPED_RESOURCES);
                resources.sort((a,b) => b.amount - a.amount);
                var target = resources[0];
                if (target) {
                    if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creepUtils.domoveTo(creep, target);
                    }
                }
            }
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep, target);
            }

        } else {
            var resources = creep.room.find(FIND_DROPPED_RESOURCES);
            resources.sort((a,b) => b.amount - a.amount);
            var target = resources[0];            if (target) {
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, target);
                }
            }
        }

    }
};

module.exports = roleCarrier;