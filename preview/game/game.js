/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var Game = {
    //Global tilesize value
    unit: 18,
    //Array of entities that should be destroyed on the following update
    toBeDestroyed: [],
    //Dictionary to lookup which keys are pressed on each update
    keysDown: {},
    //Image count for loading sprites
    imageCount: 1,
    init: function( level ) {
        //Initialize viewport size
        Game.viewportWidth = Game.viewportTileWidth * Game.unit;
        Game.viewportHeight = Game.viewportTileHeight * Game.unit;
        Game.viewportOffset = 0;
        Game.viewportShiftBoundary = Game.viewportWidth / 2 - ( 3 * Game.unit );

        //Prepare canvas
        Game.canvas = document.createElement( 'canvas' );
        Game.canvas.width = Game.viewportWidth;
        Game.canvas.height = Game.viewportHeight;
        document.getElementById( 'game' ).appendChild( Game.canvas );
        Game.ctx = Game.canvas.getContext( '2d' );

        //Initialize extra sprites
        Game.extraSprites.init();

        Game.resize();

        //Load level and sprites
        Game.currentLevel = Game.Levels[ level ];
        Game.loadLevel();
    },
    startLoop: function() {
        //Start event listeners and main loop
        addEventListener( 'keydown', Game.keyDownListener, false );
        addEventListener( 'keyup', Game.keyUpListener, false );

        //Background
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );

        //Initial render
        for ( var i in Game.currentLevel.entities ) {
            Game.currentLevel.entities[i].render();
        }

        //Start the actual loop
        Game.then = Date.now();
        requestAnimationFrame(Game.loop);
    },
    loop: function( timestamp ) {
        //We update and render each loop
        if ( Game.lastUpdate ) {
            var timeDiff = timestamp - Game.lastUpdate;
            Game.update( timeDiff );
            Game.render( timeDiff );
        }
        Game.lastUpdate = timestamp;
        requestAnimationFrame( Game.loop );
    },
    update: function( timeDiff ) {
        var entities = Game.currentLevel.entities;

        //Destroy entities that are queued for removal
        for ( var i = 0; i < Game.toBeDestroyed.length; i++ ) {
            drawLayer = Game.drawLayers[Game.toBeDestroyed[i].drawLayer];
            for ( var j = 0; j < entities.length; j++ ) {
                if ( entities[j] == Game.toBeDestroyed[i] ) {
                    entities.splice( j, 1 );
                }
            }
            for ( var j = 0; j < drawLayer.length; j++ ) {
                if ( drawLayer[j] == Game.toBeDestroyed[i] ) {
                    drawLayer.splice( j, 1 );
                }
            }
            Game.toBeDestroyed.splice( i, 1 );
        }

        //Call each entities update function
        for ( var i = 0; i < entities.length; i++ ) {
            entities[i].update( timeDiff );
        }

        //Shift viewport if hero's pos is past the shift boundary
        if ( Game.hero.pos.x > Game.viewportShiftBoundary ) {
            for ( var i = Game.hero.pos.x; i > Game.viewportShiftBoundary; i -= Game.unit ) {
                Game.viewportOffset += Game.unit;
            }
        }

        //Collisions - the performance of this can be improved
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
    //The collider is where entities interact
    //Pass it two entities - if they have collisions we call
    //each of their collision handlers
    collider: function( a, b ) {
        var i, aCollisions = a.getCollisions( b ),
            bCollisions = b.getCollisions( a );
        for ( i in aCollisions ) {
            if ( aCollisions[i] && !( aCollisions[i] instanceof Game.Entity ) ) {
                a.collideWith( b, i );
            }
        }
        for ( i in bCollisions && !( bCollisions[i] instanceof Game.Entity ) ) {
            if ( bCollisions[i] ) {
                b.collideWith( a, i );
            }
        }
    },
    //Add entity to the removal queue
    destroyEntity: function( entity ) {
        Game.toBeDestroyed.push( entity );
    },
    //Layers for rendering - specified by each entity
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
    //Used in rendering - anytime an entities animates or moves position
    //We add them to the invalidRect for that update
    invalidateRect: function( top, right, bottom, left ) {
        if ( !Game.invalidRect ) {
            Game.invalidRect = { top: top, right: right, bottom: bottom, left: left };
            return;
        }
        var invalidTop = Game.invalidRect.top,
            invalidBottom = Game.invalidRect.bottom,
            invalidLeft = Game.invalidRect.left,
            invalidRight = Game.invalidRect.right;

        if ( invalidTop > top ) {
            Game.invalidRect.top = top;
        }
        if ( invalidBottom < bottom ) {
            Game.invalidRect.bottom = bottom;
        }
        if ( invalidLeft > left ) {
            Game.invalidRect.left = left;
        }
        if ( invalidRight < right ) {
            Game.invalidRect.right = right;
        }
    },
    //Called every update - uses the invalidRect to set a clip
    //so we only re-render entities that have changed
    render: function() {
        var i, j;

        if ( Game.invalidRect ) {
            var invalidLeft = Game.invalidRect.left - Game.unit,
                invalidTop = Game.invalidRect.top - Game.unit,
                invalidWidth = Game.invalidRect.right - invalidLeft + Game.unit * 2,
                invalidHeight = Game.invalidRect.bottom - invalidTop + Game.unit * 2;
            /*
            //Show invalidRect
            var left = $( Game.canvas ).offset().left + invalidLeft;
            var top = $( Game.canvas ).offset().top + invalidTop;
            var box = $('<div style="border: 1px solid red;position:absolute;left:'+left+'px;top:'+top+'px;width:'+invalidWidth+'px;height:'+invalidHeight+'px"></div>');
            $('body').append(box);
            */

            //Save canvas context before setting clip
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.rect( invalidLeft, invalidTop, invalidWidth, invalidHeight );
            //Set the clip to the invalidRect's position/dimensions
            Game.ctx.clip();
            Game.ctx.closePath();
            Game.ctx.fillStyle = '#000';
            Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );

            //When we render all entities only pixels that actually
            //get redrawn are the ones within the clip
            for ( i = 0; i < Game.drawLayers.length; i++ ) {
                for ( j = 0; j < Game.drawLayers[i].length; j++ ) {
                    Game.drawLayers[i][j].render();
                }
            }

            Game.ctx.restore();
            Game.invalidRect = null;
        }

        //Drawing health meter
        //TODO - refactor HUD rendering
        if ( !Game.HUDOff ) {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.rect( 0, 0, Game.viewportWidth, Game.unit * 2 );
            Game.ctx.clip();

            Game.ctx.fillStyle = "#000";
            Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.unit * 2 );

            for ( i = 0; i < Game.score.maxHealth; i++ ) {
                if ( i < Game.score.health ) {
                    Game.ctx.drawImage( Game.extraSprites.sprites.heart, i * Game.unit + Game.unit / 2, Game.unit / 2 );
                } else {
                    Game.ctx.drawImage( Game.extraSprites.sprites.emptyHeart, i * Game.unit + Game.unit / 2, Game.unit / 2 );
                }
            }

            Game.ctx.restore();
        }
    },
    //Iterate through level grid and instantiate all entities based on class name
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
        //Prevent default on up and down so the
        //browser doesn't attempt to scroll the page
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
    //Extra sprites are those don't have an entity
    //TODO - think about refactoring this into its own class
    extraSprites: {
        init: function() {
            var i, j, k,
                tempCanvas, tempContext,
                dataURL, currentSprite,
                rectSize = Game.unit / 9;

            //Same init as Game.Entity
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
    //Score to represent game logic
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
    },
    resize: function() {
        $( '#game' ).width( Game.viewportWidth ).height( Game.viewportHeight );
        $( '#game' ).css( 'top', '-' + Game.viewportHeight / 2 + 'px' );
    }
};
Game.viewportTileWidth = 50;
Game.viewportTileHeight = 25;
window.Game = Game;

$(function() {
    $( window ).on( 'resize', Game.resize );
});
