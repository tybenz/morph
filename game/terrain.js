Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    portal: null // portal to another level?
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    bitmaps: [
        [
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
            [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ]
        ]
    ],
    collideWith : function(entity, timeNow) {
	//Did something land on me?
	if (!(entity instanceof Game.Entity.Terrain.Land) && entity.falling && entity.newY > entity.y && entity.x == this.x && // careful with x == x, this means all x moves have to be multiples of Game.unit.
	    (entity.newY > this.y || (entity.y + Game.unit >= this.y && entity.y <= this.y + 50))) {
	    entity.falling = false;
	    entity.y = this.y - Game.unit;
	    entity.timeFallBegan = timeNow;
	    entity.freeFallStartY = entity.y;
	    entity.Y_VEL = 0;
	    entity.X_VEL = 0;
	}

    },
    update : function() { 
	//do nothing, unaffected by gravity.
    }
});
