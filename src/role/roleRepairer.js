const { object } = require('lodash');
var creepUtils = require('../utils/creepUtils');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {



        if (creep.memory.repairering && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairering = false;
            creep.say('🔄 take');
        }

        if (!creep.memory.repairering && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairering = true;
            creep.say('🚧 repairer');
        }

        if (creep.memory.repairering) {

            var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            if (target) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creepUtils.domoveTo(creep, targets[0]);
                }
            } else {

                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });

                targets.sort((a, b) => a.hits - b.hits);

                if (targets.length > 0) {
                    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creepUtils.domoveTo(creep, targets[0]);
                    }
                }
            }

        } else {
            if (creep.room.memory.spawnReady == false) {
                return;
            }
            var struction = creepUtils.findResourceFromStorge(creep);
            if (creep.withdraw(struction, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creepUtils.domoveTo(creep, struction);
            }
        }
    }
};

module.exports = roleRepairer;