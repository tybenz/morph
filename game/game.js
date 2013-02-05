
var Game = {
    unit: 18,
    init: function() {
        //Prepare canvas
        Game.canvas = document.createElement( 'canvas' );
        Game.canvas.width = 900;
        Game.canvas.height = 450;
        document.getElementById( 'game' ).appendChild( Game.canvas );
        Game.ctx = Game.canvas.getContext( '2d' );

        //Load level and sprites
        Game.currentLevel = Game.Levels[0];
        Game.loadLevel();
    },
    loopStarted: false,
    startLoop: function() {
        //Start event listeners and main loop
	if (!this.loopStarted) {
	    this.loopStarted = true;
	    //console.log("I'm from startLoop(). You should see me once.");
            addEventListener( 'keydown', Game.keyDownListener, false );
            addEventListener( 'keyup', Game.keyUpListener, false );
            Game.then = Date.now();
	    //Game.loop();
	    setInterval(Game.loop, 1);
	}
    },
    loop: function() {
	var now = Date.now(),
        delta = now - Game.then;

        Game.update( delta / 1000 );
        Game.render();

        Game.then = now;
    },
    update: function(modifier) {
	if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { //player holding left
            Game.hero.x -= 18;
            Game.keysDown[ 37 ] = 'locked';
        }
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { //player holding right
            Game.hero.x += 18;
            Game.keysDown[ 39 ] = 'locked';
        }
	if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) { //player holding up
            Game.hero.up();
            Game.keysDown[ 38 ] = 'locked';
        }
        if ( 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) { //player holding spacebar
            //action
            Game.keysDown[ 32 ] = 'locked';
        }
	//collision detection
	var axisList = Game.currentLevel.entities.sort(function(a, b) { return a.x - b.x }),
	    activeList = new Array(axisList[0]),
	    //possible_collision_set = {};
	    possible_collision_set = new Array();
	
	for (var i = 1; i < axisList.length; i++) {
	    for (var j = activeList.length - 1; j >= 0; j--) {
		if (axisList[i].x > (activeList[j].x + Game.unit)) {
		    activeList.splice(j, 1);
		    continue;
		}
		var set_item = [ axisList[i], activeList[j] ].sort(function(a, b) { return a.x - b.x });
		//possible_collision_set[ set_item ] = 'dummy'; //I wish this would work
		if (possible_collision_set.indexOf(set_item) == -1) {
		    possible_collision_set.push(set_item);
		}
	    }
	    activeList.push(axisList[i]);
	}
	// for (var collision in possible_collision_set) Game.collider(collision);
	for (var i in possible_collision_set) {
	    Game.collider(possible_collision_set[i]);
	}
	//update all entities
	for (i in Game.currentLevel.entities) {
	    Game.currentLevel.entities[i].update();
	}
    },
    collider: function(a) {
	if (a instanceof Array && a.length == 2 &&
	   a[0] instanceof Game.Entity && a[1] instanceof Game.Entity) {
	        a[0].collideWith(a[1]);
		a[1].collideWith(a[0]);
	}
    },
    render: function() {
        var i;

        //Background
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( 0, 0, 900, 450 );

        for ( i in Game.currentLevel.entities ) {
            Game.currentLevel.entities[ i ].render();
        }
    },
    loadLevel: function() {
        for ( i in Game.currentLevel.grid ) {
	    for (j in Game.currentLevel.grid[i]) {
                entityString = Game.currentLevel.grid[ i ][ j ];
                if ( entityString != 'blank' ) {
		    entity = eval( 'new Game.Entity.' + entityString.capitalize( '.' ) + '( ' + j * Game.unit + ', ' + i * Game.unit + ' )' );
		    Game.currentLevel.entities.push( entity );
                    if ( entityString.indexOf( 'hero' ) != -1 ) {
                        Game.hero = entity
                    }
                }
            }
        }
    },
    keyDownListener: function( evt ) {
        evt.preventDefault();
        if ( Game.keysDown[ evt.keyCode ] != 'locked' ) {
            Game.keysDown[ evt.keyCode ] = true;
        }
    },
    keyUpListener: function( evt ) {
        delete Game.keysDown[ evt.keyCode ];
    },
    keysDown: {},
    imageCount: 1,
    imageLoaded: function( img ) {
        if ( Game.imageCount < Game.currentLevel.entityCount ) {
            Game.imageCount++;
            return;
        } else if (Game.imageCount == Game.currentLevel.entityCount) {
	    //console.log("i'm from image loaded. you should see me once.")
            Game.startLoop();
	}
    }
};
window.Game = Game;

$(function() {
    Game.init();
});
