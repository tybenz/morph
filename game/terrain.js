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
    collideWith : function(entity) {
	if (entity instanceof Game.Entity) {
	    //Did something land on me?
	    if (entity.falling && entity.newY > entity.y && entity.x == this.x && 
		(entity.y + Game.unit > this.y || entity.newY > this.y)) {
		entity.falling = false;
		entity.y = this.y - Game.unit;
		entity.timeFallBegan = Date.now();
		entity.freeFallStartY = entity.y;
		entity.Y_VEL = 0;
		entity.X_VEL = 0;
	    }
	}
    },
    update : function() { 
	//do nothing, unaffected by gravity.
    }
});
