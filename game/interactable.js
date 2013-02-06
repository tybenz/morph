Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    collectable: null, // indicates whether it automatically goes into inventory
});

Game.Entity.Interactable.Rock = Game.Entity.Interactable.extend({
    type: 'Interactable.Rock',
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "#777777", "#777777", "#777777", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent", "transparent" ],
            [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent" ],
            [ "rgba(0,0,0,0)", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ]
        ]
    ],
    holder: null,
    collideWith: function(entity) { 
	if (entity instanceof Game.Entity.Hero.Man) {
	    if (this.holder) {
		this.x = this.holder.x;
		this.y = this.holder.y - Game.unit;
		this.falling = false;
	    }
	    //holder throws
	    if (32 in Game.keysDown && this.holder instanceof Game.Entity.Hero.Man) {
		this.timeFallBegan = Date.now();
		this.freeFallStartY = this.y;
		this.Y_VEL = .6;
		this.X_VEL = 2;
		this.thrown = true;
		this.xDirection = this.holder.xDirection;
		this.holder = null;
		delete Game.keysDown[32];
	    }
	    //get picked up
	    if (32 in Game.keysDown && this.y == entity.y) {
		this.y = entity.y - Game.unit;
		this.x = entity.x;
		this.holder = entity;
		delete Game.keysDown[32];
	    }
	}
	if (entity instanceof Game.Entity.Interactable.Coin) {
	}
	if (entity instanceof Game.Entity.Terrain.Land) {
	}
	if (entity instanceof Game.Entity.Enemy.Monster) {
	}
    }
});

Game.Entity.Interactable.Coin = Game.Entity.Interactable.extend({
    type: 'Interactable.Coin',
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffffff", "#ffffff", "#ffff00", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"  ]
        ]
    ],
    collideWith: function(entity) { 
	//as of now, handle land, rock, coin, monster
	if (entity instanceof Game.Entity.Interactable.Rock) {
	    
	}
	if (entity instanceof Game.Entity.Interactable.Coin) {
	}
	if (entity instanceof Game.Entity.Terrain.Land) {
	}
	if (entity instanceof Game.Entity.Enemy.Monster) {
	}
    },
});
