var structionTown = {

    /** @param {structure} tower **/
    run: function(tower) {

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }else{
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
  
	}
};

module.exports = structionTown;