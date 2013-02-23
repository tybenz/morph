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
	if (!(entity instanceof Game.Entity.Terrain.Land) && entity.y < entity.newY && this.hasCollision(entity)) {
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
