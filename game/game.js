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

        //Initialize extra sprites
        Game.extraSprites.init();

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
        var entities = Game.currentLevel.entities,
            entitiesLength = entities.length;
        for ( var i = 0; i < entitiesLength; i++ ) {
            entities[i].update( timeDiff );
        }
        var a, b, i, j, aX, bX,
            gameUnit = Game.unit;
        for ( i = 0; i < Game.currentLevel.entities.length; i++ ) {
            a = Game.currentLevel.entities[i];
            aX = a.pos.x;
            for ( j = 0; j < Game.currentLevel.entities.length; j++ ) {
                b = Game.currentLevel.entities[j];
                bX = b.pos.x;
                if ( a != b && aX <= ( bX + gameUnit ) && aX >= ( bX - gameUnit * 2 ) ) {
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
    drawLayers: [
        //Terrain
        [],
        //Interactables
        [],
        //Enemies
        [],
        //Hero
        []
    ],
    render: function() {
        var i, j;

        //Background
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( 0, 0, 900, 450 );

        for ( i in Game.drawLayers ) {
            for ( j in Game.drawLayers[i] ) {
                Game.drawLayers[i][j].render();
            }
        }

        for ( i = 0; i < Game.score.maxHealth; i++ ) {
            if ( i < Game.score.health ) {
                Game.ctx.drawImage( Game.extraSprites.sprites.heart, i * Game.unit + 20, 20 );
            } else {
                Game.ctx.drawImage( Game.extraSprites.sprites.emptyHeart, i * Game.unit + 20, 20 );
            }
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
    },
    extraSprites: {
        init: function() {
            var i, j, k,
                tempCanvas, tempContext,
                dataURL, currentSprite,
                rectSize = Game.unit / 9;

            for ( i in this.bitmaps ) {
                currentSprite = this.bitmaps[ i ];
                tempCanvas = document.createElement( 'canvas' );
                tempCanvas.width = Game.unit;
                tempCanvas.height = Game.unit;
                tempContext = tempCanvas.getContext( '2d' );
                for ( j in currentSprite ) {
                    for ( k in currentSprite[ j ] ) {
                        tempContext.fillStyle = currentSprite[ j ][ k ];
                        tempContext.fillRect( k * rectSize, j * rectSize, rectSize, rectSize );
                    }
                }
                dataURL = tempCanvas.toDataURL( 'image/png' );
                sprite = Game.Sprite(dataURL,this.type);
                this.sprites[i] = Game.Sprite( dataURL, this.type );
            }
        },
        sprites: {},
        bitmaps: {
            heart: [
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "transparent", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "#ff55ff", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
            ],
            emptyHeart: [
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ffffff", "#ffffff", "transparent", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
            ]
        }
    },
    score: {
        health: 5,
        maxHealth: 5,
        decrementHealth: function() {
            if ( this.health > 0 ) {
                this.health--;
            }
        },
        incrementHealth: function() {
            if ( this.health < this.maxHealth ) {
                this.health++;
            }
        }
    }
};
window.Game = Game;

$(function() {
    Game.init();
});
