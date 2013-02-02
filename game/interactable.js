Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    collectable: null, // indicates whether it automatically goes into inventory
    collision: function() {
        //executed with hero collides with it
    }
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
    collideWith: function(entity) { 
	//as of now, handle land, rock, coin, monster
	if (entity instanceof Game.Entity.Hero.Man) {
	    if (32 in Game.keysDown && this.y == entity.y) {
		this.y -= Game.unit;
		this.x -= Game.unit;
	    }
	}
	if (entity instanceof Game.Entity.Interactable.Coin) {
	}
	if (entity instanceof Game.Entity.Terrain.Land) {
	}
	if (entity instanceof Game.Entity.Enemy.Monster) {
	}
    },
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
