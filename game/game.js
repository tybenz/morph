/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

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
    startLoop: function() {
        //Start event listeners and main loop
        addEventListener( 'keydown', Game.keyDownListener, false );
        addEventListener( 'keyup', Game.keyUpListener, false );
        Game.then = Date.now();
        requestAnimationFrame(Game.loop);
    },
    loop: function( timestamp ) {
        if ( Game.lastUpdate ) {
            var timeDiff = timestamp - Game.lastUpdate;
            Game.update( timeDiff );
            Game.render( timeDiff );
        }
        Game.lastUpdate = timestamp;
        requestAnimationFrame( Game.loop );
    },
    update: function( timeDiff ) {
        if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { // LEFT
            Game.hero.move.left.call( Game.hero );
            Game.keysDown[ 37 ] = 'locked';
        }
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { // RIGHT
            Game.hero.move.right.call( Game.hero );
            Game.keysDown[ 39 ] = 'locked';
        }
        if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) { // UP
            Game.hero.move.up.call( Game.hero, timeDiff );
            Game.keysDown[ 38 ] = 'locked';
        }
        for ( var i = 0; i < Game.currentLevel.entities.length; i++ ) {
            Game.currentLevel.entities[i].update( timeDiff );
        }
        var a, b, i, j;
        for ( i = 0; i < Game.currentLevel.entities.length; i++ ) {
            a = Game.currentLevel.entities[i];
            for ( j = 0; j < Game.currentLevel.entities.length; j++ ) {
                b = Game.currentLevel.entities[j];
                if ( a != b && a.pos.x <= b.pos.x + Game.unit ) {
                    Game.collider( a, b );
                }
            }
        }
    },
    go: true,
    collider: function( a, b ) {
        var i, aCollisions = a.getCollisions( b ),
            bCollisions = b.getCollisions( a );
        for ( i in aCollisions ) {
            if ( aCollisions[i] ) {
                a.collideWith( b, i );
            }
        }
        for ( i in bCollisions ) {
            if ( bCollisions[i] ) {
                b.collideWith( a, i );
            }
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
            for ( j in Game.currentLevel.grid[ i ] ) {
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
        if ( evt.keyCode == '38' || evt.keyCode == '40' ) {
            evt.preventDefault();
        }
        if ( Game.keysDown[ evt.keyCode ] != 'locked' ) {
            Game.keysDown[ evt.keyCode ] = true;
        }
    },
    keyUpListener: function( evt ) {
        delete Game.keysDown[ evt.keyCode ];
    },
    keysDown: {},
    totalImages: function() {
        var count = 0, i;
        for( i in Game.currentLevel.entityTypes ) {
            count++;
        }
        return count;
    },
    imageCount: 1,
    imageLoaded: function( img ) {
        if ( Game.imageCount < Game.currentLevel.entityCount ) {
            Game.imageCount++;
            return;
        }
        if ( !Game.hasStarted ) {
            Game.hasStarted = true;
            Game.startLoop();
        }
    }
};
window.Game = Game;

$(function() {
    Game.init();
});
