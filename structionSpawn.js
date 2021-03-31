var structionSpawn = {

    /** @param {structure} spwn **/
    run: function(spawn) {

        if(spawn.spawning == null && spawn.store.getCapacity(RESOURCE_ENERGY) > 200){

        var harvesters = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

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


        if(starters <=2 && (harvesters.length < 1 || carriers.length < 1) ){
            var newName = 'Starter' + Game.time;
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'starter'}});
            return;
        }

        if(spawn.room.find(FIND_HOSTILE_CREEPS).length>0) {
            var newName = 'Defender' + Game.time;
            spawn.spawnCreep([ATTACK,ATTACK,MOVE], newName, 
                {memory: {role: 'defender'}});
            return;
        }

        if(carriers.length <= 3) {
            var newName = 'Carrier' + Game.time;
            spawn.spawnCreep([CARRY,CARRY,MOVE], newName, 
                {memory: {role: 'carrier'}});
            return;
        }
        
    
        if(harvesters.length <= 3) {
            var newName = 'Harvester' + Game.time;
            spawn.spawnCreep([WORK,WORK,MOVE], newName, 
                {memory: {role: 'harvester'}});
            return;
        }
    
        if(starters.length < 1 && upgraders.length <= 2) {
            var newName = 'upgrader' + Game.time;
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'upgrader'}});
            return;
        }

        if(starters.length < 1 && upgraders.length <= 2) {
            var newName = 'upgrader' + Game.time;
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'upgrader'}});
            return;
        }
    
        if(starters.length < 1 && repairers.length < 1) {
            var newName = 'repairer' + Game.time;
            spawn.spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'repairer'}});
            return;
        }


    }
	}
};

module.exports = structionSpawn;