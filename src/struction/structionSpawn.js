var structionSpawn = {

    /** @param {structure} spwn **/
    run: function (spawn) {

        if (spawn.spawning == null && spawn.store.getCapacity(RESOURCE_ENERGY) > 200) {


            var harvesters = 0;
            var carriers = 0;
            var starters = 0;
            var upgraders = 0;
            var builders = 0;
            var repairers = 0;

            var creeps = spawn.room.find(FIND_MY_CREEPS);
            for (var name in creeps) {
                if (creeps[name].memory.role == 'carrier') {
                    carriers++;
                } else if (creeps[name].memory.role == 'harvester') {
                    harvesters++;
                } else if (creeps[name].memory.role == 'upgrader') {
                    upgraders++;
                } else if (creeps[name].memory.role == 'builder') {
                    builders++;
                } else if (creeps[name].memory.role == 'repairer') {
                    repairers++;
                } else if (creeps[name].memory.role == 'starter') {
                    starters++;
                }
            }

            var sourceCount = spawn.room.memory.sourceCount;

            if (starters <= 2 && (harvesters < 1 || carriers < 1)) {
                var newName = 'Starter' + Game.time;
                spawn.spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'starter' } });
                return;
            }

            if (spawn.room.find(FIND_HOSTILE_CREEPS).length > 0) {
                var newName = 'Defender' + Game.time;
                spawn.spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], newName,
                    { memory: { role: 'defender' } });
                return;
            }


            if (!sourceCount) {
                sourceCount = spawn.room.find(FIND_SOURCES).length;
            }


            if (carriers < sourceCount * 2) {
                var newName = 'Carrier' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 100; i++) {
                    part.push(CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'carrier' } });
                return;
            }


            if (harvesters < sourceCount) {
                var newName = 'Harvester' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 150 && i < 6; i++) {
                    part.push(WORK, MOVE);
                }

                var sourceTakers =  Memory.sourceTakers;
                var sourceTakers =  sourceTakers.filter((object)=>{
                    console.log(object.taker);
                    return object.taker == "";
                });
                var target = sourceTakers[0];
                if(spawn.spawnCreep(part, newName, { memory: { role: 'harvester' , target : target.sourceId} }) == 0){
                    target.taker = newName;
                    Memory.sourceTakers.splice(Memory.sourceTakers.indexOf(target),1,target);
                };

                return;
            }

            if (spawn.room.memory.spawnReady == true && starters < 1 && upgraders < sourceCount) {
                var newName = 'upgrader' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 200; i++) {
                    part.push(WORK, CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'upgrader' } });
                return;
            }

            if (spawn.room.memory.spawnReady == true && starters < 1 && builders < sourceCount && spawn.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0) {
                var newName = 'builder' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 200; i++) {
                    part.push(WORK, CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'builder' } });
                return;
            }

            if (spawn.room.memory.spawnReady == true && starters < 1 && repairers < sourceCount) {
                var newName = 'repairer' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 200; i++) {
                    part.push(WORK, CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'repairer' } });
                return;
            }


        }
    }
};

module.exports = structionSpawn;