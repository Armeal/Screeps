var roleHarvester = require('./role/roleHarvester')
var roleUpgrader = require('./role/roleUpgrader');
var roleBuilder = require('./role/roleBuilder');
var roleCarrier = require('./role/roleCarrier');
var roleStarter = require('./role/roleStarter');
var roleDefender = require('./role/roleDefenser')
var roleRepairer = require('./role/roleRepairer')
var structionSpawn = require('./struction/structionSpawn');
var structionTown = require('./struction/structionTower');

module.exports.loop = function () {

    //检查房间内是否有敌人
    for(var roomName in Game.rooms){
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        console.log(`User ${username} spotted in room ${roomName}`);
        Game.notify(`User ${username} spotted in room ${roomName}`);
        }
    
        
    Game.rooms[roomName].memory.sourceToken = []

    }


    //清理死亡creep的内存
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //creep执行工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }    
        if(creep.memory.role == 'starter') {
            roleStarter.run(creep);
        }
        if(creep.memory.role == 'defender'){
            roleDefender.run(creep);
        } 
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }   
    }

    //建筑执行工作
    for(var name in Game.structures){
        var structure = Game.structures[name];
        if(structure.structureType == 'spawn'){
            structionSpawn.run(structure);
        }
        if(structure.structureType == 'town'){
            structionTown.run(structure);
        }
        
    }

}