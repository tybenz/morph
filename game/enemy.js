Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
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
    lastMoved : 0,
    collideWith: function(entity, timeNow) { 
	var BUFFER = 3;
	if (entity instanceof Game.Entity.Interactable.Rock) {
	    if (entity.thrown &&
		entity.x >= this.x - BUFFER && entity.x <= this.x + Game.unit + BUFFER &&
		entity.y >= this.y - BUFFER && entity.y <= this.y + Game.unit + BUFFER) {
		this.dead = true;
	    }
	}
	if (entity instanceof Game.Entity.Terrain.Land) {
	    if (Date.now() - this.lastMoved >= 500) {
		this.X_VEL = Game.unit;
		if (this.x <= 0) this.xDirection = 1;
		if (this.x + Game.unit >= Game.canvas.width) {
		    this.xDirection = -1;
		}
		this.x += this.xDirection*this.X_VEL;
		this.lastMoved = Date.now();
	    } else this.X_VEL = 0; //only have a velocity when it needs to move.
	}
    },
});

