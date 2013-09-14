/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( window, document, undefined ) {

var TILESIZE = 36,
    VIEWPORT_SHIFT_BOUNDARY = 2,
    LEFT_KEY = 37,
    RIGHT_KEY = 39,
    DOWN_KEY = 40,
    UP_KEY = 38,
    ACTION_KEY = 88,
    JUMP_KEY = 90,
    PAUSE_KEY = 80,
    MAP_KEY = 77,
    INVENTORY_KEY = 73,
    ENTER_KEY = 13,
    LAND_BACKGROUND = '#000',
    SEA_BACKGROUND = '#003',
    INIT_MAX_HEALTH = 10,
    LEVEL_NAME_COLOR = '#f9f9f9',
    LEVEL_NAME_FONT_SIZE = Math.round( 0.666667 * TILESIZE );


var Game = {
    //Array of entities that should be destroyed on the following update
    toBeDestroyed: [],
    //Dictionary to lookup which keys are pressed on each update
    keysDown: {},
    //Image count for loading sprites
    imageCount: 1,
    paused: false,
    init: function( level ) {
        //Initialize viewport size
        Game.viewportWidth = Game.viewportTileWidth * TILESIZE;
        Game.viewportHeight = Game.viewportTileHeight * TILESIZE;
        Game.viewportOffset = 0;
        Game.viewportShiftBoundary = {
            left: Math.floor( Game.viewportTileWidth / 2 ) * TILESIZE + ( VIEWPORT_SHIFT_BOUNDARY * TILESIZE ),
            right: Math.floor( Game.viewportTileWidth / 2 ) * TILESIZE - ( VIEWPORT_SHIFT_BOUNDARY * TILESIZE )
        };

        //Prepare canvas
        Game.canvas = document.createElement( 'canvas' );
        Game.canvas.width = Game.viewportWidth;
        Game.canvas.height = Game.viewportHeight;
        document.getElementById( 'game' ).appendChild( Game.canvas );
        Game.ctx = Game.canvas.getContext( '2d' );

        //Initialize sprites
        Game.initSprites();

        if ( Game.clickStep ) {
            document.onclick = Game.nextGameFrame;
        }

        Game.keysLocked = false;

        //Initialize drawLayers
        Game.initDrawLayers();

        //Load level and sprites
        Game.currentLevel = Game.Levels[ level ];
        Game.viewportShiftBuffer = Game.currentLevel.width - Game.viewportWidth;
        Game.loadLevel();

        // Initialize cutscene if the level has one
        var oldScene = Game.currentLevel.scene;
        if ( oldScene ) {
            Game.currentLevel.scene = new Game.Scene( oldScene.actors, oldScene.actions );
        }

        // If level has a cutscene - lock the keys and let it play
        if ( Game.currentLevel.scene ) {
            Game.currentLevel.scene.play();
        }
    },
    initSprites: function() {
        Game.totalSprites = 0;

        //Same init as Game.Entity
        for ( var i in Game.Bitmaps ) {
            Game.Sprites[i] = Game.Sprite( Game.convertBitmapToSprite( Game.Bitmaps[i], TILESIZE / 9 ) );
            Game.totalSprites++;
        }
    },
    convertBitmapToSprite: function( bitmap, rectSize ) {
        var i, j,
            tempCanvas, tempContent;

        tempCanvas = document.createElement( 'canvas' );
        tempCanvas.width = bitmap[0].length * rectSize;
        tempCanvas.height = bitmap.length * rectSize;
        tempContext = tempCanvas.getContext( '2d' );
        for ( i in bitmap ) {
            for ( j in bitmap[ i ] ) {
                tempContext.fillStyle = bitmap[ i ][ j ];
                tempContext.fillRect( j * rectSize, i * rectSize, rectSize, rectSize );
            }
        }
        return tempCanvas.toDataURL( 'image/png' );
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
            [],
            //Water
            []
        ];
    },
    startLoop: function() {
        //Start event listeners and main loop
        addEventListener( 'keydown', Game.keyDownListener, false );
        addEventListener( 'keyup', Game.keyUpListener, false );

        //Background
        Game.ctx.fillStyle = Game.background;
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
        var timeDiff;
        if ( Game.lastUpdate ) {
            if ( !Game.clickStep ) {
                timeDiff = timestamp - Game.lastUpdate;
            } else {
                timeDiff = 300;
            }
            Game.update( timeDiff );
            Game.render( timeDiff );
        }
        Game.lastUpdate = timestamp;
        if ( !Game.clickStep ) {
            if ( !Game.stopLoop && !Game.paused ) {
                Game.requestID = requestAnimationFrame( Game.loop ); 
            } else if ( Game.switchToLevel ) {
                Game.performLevelSwitch();
            }
        }
    },
    update: function( timeDiff ) {
        if ( Game.currentLevel.scene && Game.currentLevel.scene.playing ) {
            var scene = Game.currentLevel.scene;
            scene.next();
        }

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
                    entities[j].invalidateRect();
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
            if ( Game.still ) {
                ent.pos.x = ent.oldPos.x;
                ent.pos.y = ent.oldPos.y;
            }
            if ( ent.pos.x != ent.oldPos.x || ent.pos.y != ent.oldPos.y || ent.animated || ent.detached || ent.attached ) {
                ent.invalidateRect();
            }
        }

        //Shift viewport if hero's pos is past the shift boundary
        if ( Game.currentLevel.type == 'sky' ) {
            if ( Game.viewportOffset < Game.viewportShiftBuffer ) {
                Game.lastShift = Date.now();
                Game.hero.pos.x += TILESIZE / 18;
                Game.viewportShiftBoundary.left = Game.hero.pos.x - TILESIZE / 18;
                Game.shiftViewport( 'left' );
            }
        } else {
            if ( Game.hero.pos.x > Game.viewportShiftBoundary.left && Game.viewportOffset < Game.viewportShiftBuffer ) {
                Game.shiftViewport( 'left' );
            } else if ( Game.hero.pos.x < Game.viewportShiftBoundary.right && Game.viewportOffset ) {
                Game.shiftViewport( 'right' );
            }
        }
    },
    shiftViewport: function( direction ) {
        if ( direction == 'left' ) {
            Game.viewportShiftLeft = Game.hero.pos.x - Game.viewportShiftBoundary.left;
            if ( Game.viewportShiftLeft + Game.viewportOffset > Game.viewportShiftBuffer ) {
                Game.viewportShiftLeft = Game.viewportShiftBuffer - Game.viewportOffset;
            }
            Game.viewportShiftBoundary.left += Game.viewportShiftLeft;
            Game.viewportShiftBoundary.right += Game.viewportShiftLeft;
            Game.viewportOffset += Game.viewportShiftLeft;

            Game.lastAddedColumn = Game.lastAddedColumn || Game.viewportTileWidth - 1;

            // Load entities in
            var i, j,
                entity,
                tileOffset = Math.ceil( Game.viewportOffset / TILESIZE ),
                column = Game.viewportTileWidth + tileOffset;

            for ( i = Game.lastAddedColumn + 1; i <= column; i++ ) {
                for ( j = 0; j < Game.currentLevel.entityGrid.length; j++ ) {
                    entity = Game.currentLevel.entityGrid[ j ][ i ];
                    if ( entity ) {
                        Game.currentLevel.entities.push( entity );
                    }
                }
            }
            Game.lastAddedColumn = column;

        } else {
            Game.viewportShiftRight = Game.viewportShiftBoundary.right - Game.hero.pos.x;
            Game.viewportShiftBoundary.left -= Game.viewportShiftRight;
            Game.viewportShiftBoundary.right -= Game.viewportShiftRight;
            if ( Game.viewportOffset - Game.viewportShiftRight >= 0 ) {
                Game.viewportOffset -= Game.viewportShiftRight;
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
            b.collideWith( a, bCollisions );
        } else if ( bCollisions ) {
            b.collideWith( a, bCollisions );
            a.collideWith( b, aCollisions );
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
                // Blit pixels
                var top = 0,
                    left = Game.viewportShiftLeft,
                    width = Game.viewportWidth - left,
                    height = Game.viewportHeight;

                imageData = Game.ctx.getImageData( left, top, width, height );
                Game.ctx.putImageData( imageData, 0, 0 );
                Game.ctx.clearRect( width, top, left, height );

                invalidTop = 0;
                invalidLeft = 0;
                invalidWidth = Game.viewportWidth;
                invalidHeight = Game.viewportHeight;

                Game.viewportShiftLeft = false;
            } else if ( Game.viewportShiftRight ) {
                // Blit pixels
                var top = 0,
                    left = 0,
                    width = Game.viewportWidth - Game.viewportShiftRight,
                    height = Game.viewportHeight;

                imageData = Game.ctx.getImageData( left, top, width, height );
                Game.ctx.putImageData( imageData, Game.viewportShiftRight, 0 );
                Game.ctx.clearRect( 0, 0, Game.viewportShiftRight, height );

                invalidTop = 0;
                invalidLeft = 0;
                invalidWidth = Game.viewportWidth;
                invalidHeight = Game.viewportHeight;

                Game.viewportShiftRight = false;
            }

            //Save canvas context before setting clip
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.rect( invalidLeft, invalidTop, invalidWidth, invalidHeight );
            //Set the clip to the invalidRect's position/dimensions
            Game.ctx.clip();
            Game.ctx.closePath();
            Game.ctx.fillStyle = Game.background;
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

            for ( i = 0; i < Game.maxHealth; i++ ) {
                if ( i % 2 == 0 && i < Game.health ) {
                    Game.ctx.drawImage( Game.Sprites[ 'heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                } else if ( i == Game.health && i % 2 == 1 ) {
                    Game.ctx.drawImage( Game.Sprites[ 'half-heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                } else if ( i % 2 == 0 ) {
                    Game.ctx.drawImage( Game.Sprites[ 'empty-heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                }
            }

            var levelName = Game.currentLevel.title;

            if ( levelName ) {
                Game.ctx.fillStyle = Game.background;

                Game.ctx.font = 'normal ' + LEVEL_NAME_FONT_SIZE + 'px "Terminus (TTF)", "Envy Code R", "Source Code Pro", "Menlo", Courier, monospace';
                Game.ctx.textAlign = 'right';

                Game.ctx.fillText( levelName, Game.viewportWidth - 10, TILESIZE );

                Game.ctx.fillStyle = LEVEL_NAME_COLOR;
                Game.ctx.fillText( levelName, Game.viewportWidth - 10, TILESIZE );
            }
        }
    },
    //Iterate through level grid and instantiate all entities based on class name
    loadLevel: function() {
        var entities,
            entityString,
            offsetMatch,
            offset,
            signMatch,
            signName,
            linkMatch,
            links = [],
            toLevel;

        if ( Game.currentLevel.type == 'sea' ) {
            Game.background = SEA_BACKGROUND;
        } else {
            Game.background = LAND_BACKGROUND;
        }

        Game.hero = null;
        Game.currentLevel.entities = [];

        Game.terrainGroup = null;
        Game.terrainGroupType = '';

        Game.currentLevel.entityGrid = [];
        for ( var i = 0; i < Game.currentLevel.grid.length; i++ ) {
            Game.currentLevel.entityGrid[i] = [];
            for ( var j = 0; j < Game.currentLevel.grid[i].length; j++ ) {
                entities = Game.currentLevel.grid[i][j].split( '|' );
                for ( k = 0; k < entities.length; k++ ) {
                    entityString = entities[k].split( ':' )[0];

                    offsetMatch = entityString.match( /\[([^\[\]]*)\]/ );
                    offset = offsetMatch ? offsetMatch[1] : 0;

                    linkMatch = entityString.match( /\(([^\(\)]*)\)/ );
                    linkIndex = linkMatch ? linkMatch[1] : null;

                    signMatch = entityString.match( /\{([^\{\}]*)\}/ );
                    signName = signMatch ? signMatch[1] : null;

                    entityString = entityString.replace( /\[[^\[\]]*\]/, '' ).replace( /\([^\(\)]*\)/, '' ).replace( /\{[^\{\}]*\}/, '' );
                    toLevel = entities[k].split( ':' )[1];
                    if ( entityString != 'blank' ) {
                        // Each entity gets initialized and put into our level's entity list
                        entity = eval( 'new Game.Entity.' + entityString.capitalize( '.' ) + '( ' + j * TILESIZE + ', ' + ( i * TILESIZE + offset * ( TILESIZE / 9 ) ) + ' )' );

                        if ( linkIndex ) {
                            links[ linkIndex ] = links[ linkIndex ] || [];
                            links[ linkIndex ].push( entity );
                        }
                        if ( signName ) {
                            if ( entity.type.indexOf( 'Friend' ) === 0 ) {
                                entity.setContent( Game.Dialog[ signName ] );
                            } else {
                                entity.setContent( Game.Signs[ signName ] );
                            }
                        }
                        if ( toLevel ) {
                            entity.toLevel = toLevel;
                        }
                        if ( entityString == 'terrain.land' || entityString == 'terrain.water' ) {
                            if ( Game.terrainGroup && entityString == Game.terrainGroupType ) {
                                Game.terrainGroup.attach( [ entity ] );
                            } else {
                                Game.terrainGroup = entity;
                                Game.terrainGroupType = entityString;
                                Game.currentLevel.entities.push( entity );
                            }
                        } else {
                            if ( Game.terrainGroup || j < Game.viewportTileWidth ) {
                                Game.currentLevel.entities.push( entity );
                            }
                            Game.terrainGroup = null;
                        }
                        if ( entityString.indexOf( 'hero' ) != -1 ) {
                            Game.hero = entity;
                        }
                        Game.currentLevel.entityGrid[i][j] = entity;
                    } else {
                        Game.terrainGroup = null;
                        Game.currentLevel.entityGrid[i][j] = null;
                    }
                }
            }
            // One last call for the end of the level
            Game.terrainGroup = null;
        }

        var buttonIndex,
            button,
            linkGroup;

        for ( var i = 0, l1 = links.length; i < l1; i++ ) {
            linkGroup = links[i]

            if ( linkGroup ) {
                for ( var j = 0, len = linkGroup.length; j < len; j++ ) {
                    if ( linkGroup[j] && linkGroup[j].type == 'Interactable.Switch' ) {
                        button = linkGroup[j];
                        buttonIndex = j;
                        break;
                    }
                }

                linkGroup.splice( j, 1 );
                button.setDoors( linkGroup );
            }
        }
    },
    keyDownListener: function( evt ) {
        //Prevent default on up and down so the
        //browser doesn't attempt to scroll the page
        if ( evt.keyCode == JUMP_KEY || evt.keyCode == DOWN_KEY ) {
            evt.preventDefault();
        }
        if ( evt.keyCode == PAUSE_KEY ) {
            if ( !Game.paused ) {
                Game.keysDown[ PAUSE_KEY ] = 'locked';
                Game.pause( 'pause' );
            } else {
                Game.resume();
            }
        } else if ( evt.keyCode == MAP_KEY ) {
            if ( !Game.paused ) {
                Game.keysDown[ MAP_KEY ] = 'locked';
                Game.pause( 'map' );
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
        Game.invalidateRect( 0, Game.viewportWidth, Game.viewportHeight, 0 );
        Game.requestID = requestAnimationFrame( Game.loop ); 
    },
    imageLoaded: function( img ) {
        if ( Game.imageCount < Game.totalSprites ) {
            Game.imageCount++;
            return;
        }
        if ( !Game.hasStarted ) {
            Game.hasStarted = true;
            Game.startLoop();
        }
    },
    stop: function() {
        cancelAnimationFrame( Game.requestID );
        Game.initDrawLayers();
        Game.hasStarted = false;
    },
    nextGameFrame: function() {
        Game.requestID = requestAnimationFrame( Game.loop ); 
    },
    gameOver: function() {
        Game.paused = true;
        document.querySelector( '#game-over' ).classList.add( 'show' );
    },
    switchLevel: function( levelID ) {
        Game.stopLoop = true;
        Game.switchToLevel = levelID;
    },
    performLevelSwitch: function() {
        Game.stop();
        Game.init( Game.switchToLevel );
        Game.stopLoop = false;
        Game.keysLocked = false;
        Game.switchToLevel = null;
    },
    //Draws four sides of a rectangle to make it hollow
    //path's stroke did not render colors well
    drawRectangle: function( left, top, width, height, lineWidth, color ) {
        var right = left + width,
            bottom = top + height;

        width += lineWidth;
        height += lineWidth;

        Game.ctx.fillStyle = color;
        // TL -> TR
        Game.ctx.fillRect( left, top, width, lineWidth );
        // TR -> BR
        Game.ctx.fillRect( right, top, lineWidth, height );
        // BL -> BR
        Game.ctx.fillRect( left, bottom, width, lineWidth );
        // TL -> BL
        Game.ctx.fillRect( left, top, lineWidth, height );
    },
    wrapText: function ( context, text, x, y, maxWidth, lineHeight, measureOnly ) {
        var words = text.split(' '),
            line = '',
            startY = y,
            largestWidth = 0;

        for( var n = 0; n < words.length; n++ ) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText( testLine );
            var testWidth = metrics.width;
            if ( testWidth > maxWidth && n > 0 ) {
                var width = context.measureText( line ).width;
                if ( width > largestWidth ) largestWidth = width;
                if ( !measureOnly ) {
                    context.fillText( line, x, y );
                }
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        width = context.measureText( line ).width;
        if ( width > largestWidth ) largestWidth = width;
        if ( !measureOnly ) {
            context.fillText(line, x, y);
        }

        return { width: largestWidth, height: ( y - startY ), bottom: y + lineHeight * 2 };
    },
    currency: 0,
    maxCurrency: 9999,
    incrementCurrency: function() {
        if ( this.currency < this.maxCurrency ) {
            this.currency++;
        }
    },
    decrementCurrency: function() {
        if ( this.currency > 0 ) {
            this.currency--;
        }
    },
    maxHealth: INIT_MAX_HEALTH,
    health: INIT_MAX_HEALTH,
    incrementHealth: function() {
        if ( this.health < this.maxHealth ) {
            this.health++;
        }
    },
    decrementHealth: function() {
        if ( this.health > 0 ) {
            this.health--;
        }
    },
    godMode: false
};
Game.viewportTileWidth = 25;
Game.viewportTileHeight = 14;
window.Game = Game;

})( window, document );
