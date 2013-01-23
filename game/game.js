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
        addEventListener( 'keydown', Game.keyDownLister, false );
        addEventListener( 'keyup', Game.keyUpLister, false );
        Game.then = Date.now();
        // setInterval(Game.loop, 1);
        Game.loop();
    },
    loop: function() {
        var now = Date.now(),
        delta = now - Game.then;

        Game.update( delta / 1000 );
        Game.render();

        Game.then = now;
    },
    update: function() {
    },
    render: function() {
        var i;

        //Background
        Game.ctx.fillStyle = 'rgba(0,0,0,1)';
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
        }
        Game.startLoop();
    }
};
window.Game = Game;

$(function() {
    Game.init();
});
