var creepUtils = {

    findResourceFromStorge: function(creep) {
        var room = creep.room;
        if(room.storage && room.storage.store[RESOURCE_ENERGY]>100){          
                return room.storage;
            
        }else{
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'container'  && 
                            structure.store[RESOURCE_ENERGY]>0);
                }
        });
            if(target){
                return target;
            }else{
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == 'spawn'  && 
                                structure.store[RESOURCE_ENERGY]>=300);
                    }
            });
                if(target){
                    return target;
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

module.exports = creepUtils;