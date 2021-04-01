var structionSpawn = {

    /** @param {structure} spwn **/
    run: function (spawn) {

        if (spawn.spawning == null && spawn.store.getCapacity(RESOURCE_ENERGY) > 200) {

            var harvesters = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');

            var sourceCount = spawn.room.memory.sourceCount;
            var i = sourceCount - 1;
            //给收割者分配资源，防止多个收割者在同一个资源点工作。
            for (var name in harvesters) {
                var harvester = harvesters[name];
                harvester.memory.target = spawn.room.find(FIND_SOURCES)[i].id;
                i--;

            }
            console.log('Harvesters: ' + harvesters.length);

            //TODO优化成一次遍历
            var carriers = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'carrier');
            console.log('carriers: ' + carriers.length);

            var starters = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'starter');
            console.log('starters: ' + starters.length);

            var upgraders = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader');
            console.log('upgraders: ' + upgraders.length);

            var builders = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builder');
            console.log('builders: ' + builders.length);

            var repairers = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'repairer');
            console.log('repairers: ' + builders.length);



            if (starters <= 2 && (harvesters.length < 1 || carriers.length < 1)) {
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


            if (carriers.length < harvesters.length * 2) {
                var newName = 'Carrier' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 100; i++) {
                    part.push(CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'carrier' } });
                return;
            }


            if (harvesters.length < sourceCount) {
                var newName = 'Harvester' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 150 && i < 6; i++) {
                    part.push(WORK, MOVE);
                }
                spawn.spawnCreep(part, newName, { memory: { role: 'harvester' } });
                return;
            }

            if (starters.length < 1 && upgraders.length < sourceCount && spawn.room.memory.spawnReady == true) {
                var newName = 'upgrader' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 200; i++) {
                    part.push(WORK, CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'upgrader' } });
                return;
            }

            if (starters.length < 1 && builders.length < sourceCount && spawn.room.memory.spawnReady == true) {
                var newName = 'builder' + Game.time;
                var part = [];
                for (var i = 1; i <= spawn.room.energyCapacityAvailable / 200; i++) {
                    part.push(WORK, CARRY, MOVE);
                }
                spawn.spawnCreep(part, newName,
                    { memory: { role: 'builder' } });
                return;
            }

            if (starters.length < 1 && repairers.length < sourceCount && spawn.room.memory.spawnReady == true) {
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