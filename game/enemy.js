Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    move: {
        'right': function() {
            this.x += Game.unit;
        },
        'left': function() {
            this.x -= Game.unit;
        },
        'up': function() {
            //jump
        },
        'down': function() {
            //down for plane and jellyfish
        }
    },
    actions: [],
    sequence: [] //sequence of moves/actions
});

Game.Entity.Enemy.Monster = Game.Entity.Enemy.extend({
    type: 'Enemy.Monster',
    bitmaps: [[
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ]],
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

