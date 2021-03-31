var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarrier = require('role.carrier');
var roleStarter = require('role.starter');
var roleDefender = require('role.defender')
var roleRepairer = require('role.repairer')
var structionSpawn = require('struction.spwan');
var structionTown = require('struction.tower');
var creepUnit = require('creepUnit');

module.exports.loop = function () {

    for(var roomName in Game.rooms){
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        console.log(`User ${username} spotted in room ${roomName}`);
        Game.notify(`User ${username} spotted in room ${roomName}`);
        }
    }


    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

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