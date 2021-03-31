var creepUnit = {

    findResourceFromStorge: function(creep) {
        var room = creep.room;
        if(room.storage && room.storage.store[RESOURCE_ENERGY]>100){          
                return room.storage;
            
        }else{
            var structures = room.find([FIND_STRUCTURES]);
            for(var name in structures){
                if(structures[name].structureType == 'container' && structures[name].store[RESOURCE_ENERGY]>100){
                    return structures[name];
                }
            }
            for(var name in structures){
                if(structures[name].structureType == 'spawn' && structures[name].store[RESOURCE_ENERGY]>=300){
                    return structures[name];
                }
            }  

        }

    },

    doharvest: function(creep){
        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
    },

    domoveTo: function(creep,target){
            if(creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}},{noPathFinding: true} ) == ERR_NOT_FOUND){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
    }
};

module.exports = creepUnit;