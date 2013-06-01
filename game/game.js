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
    paused: false,
    init: function( level ) {
        //Initialize viewport size
        Game.viewportWidth = Game.viewportTileWidth * Game.unit;
        Game.viewportHeight = Game.viewportTileHeight * Game.unit;
        Game.viewportOffset = 0;
        Game.viewportShiftBoundary = {
            left: Game.viewportWidth / 2 + ( 3 * Game.unit ),
            right: Game.viewportWidth / 2 - ( 3 * Game.unit )
        };

        //Prepare canvas
        Game.canvas = document.createElement( 'canvas' );
        Game.canvas.width = Game.viewportWidth;
        Game.canvas.height = Game.viewportHeight;
        document.getElementById( 'game' ).appendChild( Game.canvas );
        Game.ctx = Game.canvas.getContext( '2d' );

        //Initialize extra sprites
        Game.extraSprites.init();

        if ( !Game.skipResize ) {
            Game.resize();
        }

        //Initialize drawLayers
        Game.initDrawLayers();

        //Load level and sprites
        Game.currentLevel = Game.Levels[ level ];
        Game.viewportShiftBuffer = Game.currentLevel.width - Game.viewportWidth;
        Game.loadLevel();
    },
    initDrawLayers: function() {
        //Layers for rendering - specified by each entity
        Game.drawLayers = [
            //Bullets,
            [],
            //Terrain
            [],
            //Interactables
            [],
            //Enemies
            [],
            //Hero
            []
        ];
    },
    startLoop: function() {
        //Start event listeners and main loop
        addEventListener( 'keydown', Game.keyDownListener, false );
        addEventListener( 'keyup', Game.keyUpListener, false );

        //Background
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );

        // Initial render
        // Make sure all entities get rendered on first render.
        Game.invalidateRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
        for ( var i in Game.currentLevel.entities ) {
            Game.currentLevel.entities[i].render();
        }

        // Set last update to null so a pause/unpause doesn't
        // result in a jump on the screen
        Game.lastUpdate = null;
        //Start the actual loop
        Game.requestID = requestAnimationFrame( Game.loop ); 
    },
    loop: function( timestamp ) {
        //We update and render each loop
        if ( Game.lastUpdate ) {
            var timeDiff = timestamp - Game.lastUpdate;
            Game.update( timeDiff );
            Game.render( timeDiff );
        }
        Game.lastUpdate = timestamp;
        Game.requestID = requestAnimationFrame( Game.loop ); 
    },
    update: function( timeDiff ) {
        if ( Game.hero.pos.x >= ( Game.currentLevel.width - Game.hero.width ) && Game.currentLevel.next ) {
            Game.currentLevel.loadNextLevel();
            return;
        }
	
        var entities = Game.currentLevel.entities;

        //Destroy entities that are queued for removal
        for ( var i = Game.toBeDestroyed.length - 1; i >= 0; i-- ) {
            drawLayer = Game.drawLayers[Game.toBeDestroyed[i].drawLayer];
            for ( var j = entities.length - 1; j >= 0; j-- ) {
                if ( entities[j] == Game.toBeDestroyed[i] ) {
                    entities.splice( j, 1 ); 
                }
            }
            for ( var j = drawLayer.length - 1; j >= 0; j-- ) {
                if ( drawLayer[j] == Game.toBeDestroyed[i] ) {
                    drawLayer.splice( j, 1 );
                }
            }
            Game.toBeDestroyed.splice( i, 1 );
        }

        // Generate each entity's next coordinates.
        for ( var i = 0; i < entities.length; i++ ) {
            entities[ i ].generateNextCoords( timeDiff );
        }

        ////////// Collision Detection ////////

        // Keep entity list sorted on x, ascending.
        entities.sort( function( a, b ) { return a.pos.x - b.pos.x } );

        // List of entities to check entities[ i ] against
        var activeList = new Array( entities[ 0 ] );

        // List of possible collisions
        var possibleCollisions = new Array();

        for ( var i = 1; i < entities.length; i++ ) {
            for ( var j = activeList.length - 1; j >= 0; j-- ) {
                if ( entities[ i ].pos.x > ( activeList[ j ].pos.x + activeList[ j ].width ) ) {
                    // The current entity is past this activeList entity -- we know it
                    // won't collide with the rest of the entities.
                    activeList.splice( j, 1 );
                    continue;		    
                } else if ( entities[ i ] != activeList[ j ] ) {
                    // It's possible that there is a collision (their x coordinates are close).
                    possibleCollisions.push( [ entities[ i ], activeList[ j ] ] );
                }
            }
            // Place the current entity into activeList.
            activeList.push(entities[ i ]);
        }

        // Fine-grained collision detection.
        for ( var i = 0; i < possibleCollisions.length; i++ ) {
            var entityPair = possibleCollisions[ i ];
            if ( entityPair[ 0 ] instanceof Game.Entity && entityPair[ 1 ] instanceof Game.Entity ) {
                Game.collider( entityPair[ 0 ], entityPair[ 1 ] );
            }
        }

        for ( var i = 0; i < entities.length; i++ ) {
            var ent = entities[ i ];
            if ( ent.pos.x != ent.oldPos.x || ent.pos.y != ent.oldPos.y || ent.animated ) {
                ent.invalidateRect();
            }
        }
	
        //Shift viewport if hero's pos is past the shift boundary
        if ( Game.hero.pos.x > Game.viewportShiftBoundary.left && Game.viewportOffset < Game.viewportShiftBuffer ) {
            Game.viewportShiftLeft = true;
            Game.viewportShiftBoundary.left += Game.unit;
            Game.viewportShiftBoundary.right += Game.unit;
            Game.viewportOffset += Game.unit;
        } else if ( Game.hero.pos.x <= Game.viewportShiftBoundary.right && Game.viewportOffset ) {
            Game.viewportShiftRight = true;
            Game.viewportShiftBoundary.left -= Game.unit;
            Game.viewportShiftBoundary.right -= Game.unit;
            if ( Game.viewportOffset - Game.unit >= 0 ) {
                Game.viewportOffset -= Game.unit;
            }
        }
    },
    //The collider is where entities interact
    //Pass it two entities - if they have collisions we call
    //each of their collision handlers
    collider: function( a, b ) {
            // Obtain collision dictionaries for the two objects.
        var aCollisions = a.getCollisions( b ),
            bCollisions = b.getCollisions( a );

        // Adjust the objects because of collision.
	
        if ( aCollisions ) {
            a.collideWith( b, aCollisions );
        }

        if ( bCollisions ) {
            b.collideWith( a, bCollisions );
        }
    },
    //Add entity to the removal queue
    destroyEntity: function( entity ) {
        Game.toBeDestroyed.push( entity );
    },
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
    displayInvalidRect: function() {
        var left = $( Game.canvas ).offset().left + Game.invalidRect.left - Game.viewportOffset,
            top = $( Game.canvas ).offset().top + Game.invalidRect.top,
            width = Game.invalidRect.right - Game.invalidRect.left,
            height = Game.invalidRect.bottom - Game.invalidRect.top,
            box = $( '#invalid-rect' );
        if ( box.length ) {
            box.css( 'left', left + 'px' );
            box.css( 'top', top + 'px' );
            box.width( width );
            box.height( height );
        } else {
            box = $( '<div id="invalid-rect" style="border: 1px solid red;position:absolute;left:'+left+'px;top:'+top+'px;width:'+width+'px;height:'+height+'px"></div>' );
            $( 'body' ).append( box );
        }
    },
    //Called every update - uses the invalidRect to set a clip
    //so we only re-render entities that have changed
    render: function() {
        var i, j, imageData,
            invalidLeft, invalidTop,
            invalidWidth, invalidHeight;

        if ( Game.invalidRect ) {
            invalidLeft = Game.invalidRect.left - Game.viewportOffset;
            invalidTop = Game.invalidRect.top;
            invalidWidth = Game.invalidRect.right - Game.viewportOffset - invalidLeft;
            invalidHeight = Game.invalidRect.bottom - invalidTop;

            // Handle viewport shift
            if ( Game.viewportShiftLeft ) {
                Game.viewportShiftLeft = false;
                // Blit pixels
                imageData = Game.ctx.getImageData( Game.unit, 0, Game.viewportWidth - Game.unit, Game.viewportHeight );
                Game.ctx.putImageData( imageData, 0, 0 );
                Game.ctx.clearRect( Game.viewportWidth - Game.unit, 0, Game.unit, Game.viewportHeight );

                invalidTop = 0;
                invalidWidth = Game.viewportWidth - invalidLeft;
                invalidHeight = Game.viewportHeight;
            } else if ( Game.viewportShiftRight ) {
                Game.viewportShiftRight = false;

                // Blit pixels
                imageData = Game.ctx.getImageData( 0, 0, Game.viewportWidth - Game.unit, Game.viewportHeight );
                Game.ctx.putImageData( imageData, Game.unit, 0 );
                Game.ctx.clearRect( 0, 0, Game.unit, Game.viewportHeight );

                invalidLeft = 0;
                invalidTop = 0;
                invalidWidth = Game.invalidRect.right;
                invalidHeight = Game.viewportHeight;
            }

            if ( Game.debugInvalidRect ) {
                Game.displayInvalidRect();
            }

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
                if ( i % 2 == 0 && i < Game.score.health ) {
                    Game.ctx.drawImage( Game.extraSprites.sprites.heart, Math.floor( i / 2 ) * Game.unit + Game.unit / 2, Game.unit / 2 );
                } else if ( i == Game.score.health && i % 2 == 1 ) {
                    Game.ctx.drawImage( Game.extraSprites.sprites.halfHeart, Math.floor( i / 2 ) * Game.unit + Game.unit / 2, Game.unit / 2 );
                } else if ( i % 2 == 0 ) {
                    Game.ctx.drawImage( Game.extraSprites.sprites.emptyHeart, Math.floor( i / 2 ) * Game.unit + Game.unit / 2, Game.unit / 2 );
                }
            }

            Game.ctx.restore();
        }
    },
    //Iterate through level grid and instantiate all entities based on class name
    loadLevel: function() {
        Game.hero = null;
        Game.currentLevel.entities = [];
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
        if ( evt.keyCode == 38 || evt.keyCode == 40 ) {
            evt.preventDefault();
        }
        if ( evt.keyCode == 80 ) { // "P" key
            if ( Game.paused ) {
                Game.resume();
            } else {
                Game.pause();
            }
        }
        if ( Game.keysDown[ evt.keyCode ] != 'locked' ) {
            Game.keysDown[ evt.keyCode ] = true;
        }
    },
    keyUpListener: function( evt ) {
        delete Game.keysDown[ evt.keyCode ];
    },
    pause: function() {
        Game.paused = true;
        cancelAnimationFrame( Game.requestID );
    },
    resume: function() {
        Game.paused = false;
        Game.lastUpdate = null;
        Game.requestID = requestAnimationFrame( Game.loop ); 
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
            halfHeart: [
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "transparent", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ffffff", "#ffffff", "transparent", "transparent" ],
                [ "transparent", "transparent", "transparent", "#ff55ff", "#ff55ff", "#ffffff", "transparent", "transparent", "transparent" ],
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
        health: 10,
        maxHealth: 10,
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
    stop: function() {
        cancelAnimationFrame( Game.requestID );
        Game.initDrawLayers();
        Game.hasStarted = false;
    },
    resize: function() {
        var $game = $( '#game' );
        $game.width( Game.viewportWidth )
        $game.height( Game.viewportHeight );
        $game.css( 'top', '-' + Game.viewportHeight / 2 + 'px' );
    },
    debugInvalidRect: false
};
Game.viewportTileWidth = 50;
Game.viewportTileHeight = 25;
window.Game = Game;

$(function() {
    $( window ).on( 'resize', Game.resize );
});
