/* /Users/tbenzige/Projects/morph/new/lib/inherit.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


/* /Users/tbenzige/Projects/morph/new/game/settings.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( window, document, undefined ) {

window.SECONDS = 1000;
var SCALE = 4,
    TILESIZE = 9 * SCALE;

window.Settings = {
    tileSize: TILESIZE,
    landBackground: '#000',
    seaBackground: '#003',
    // God mode
    godMode: true,
    // Viewport stuff
    viewportShiftBoundary: 2,
    defaultViewportWidth: 25,
    defaultViewportHeight: 14,
    // Menu
    menuWidth: 20,
    menuHeight: 10,
    menuLineWidth: 3,
    menuPadding: 1.2 * TILESIZE,
    menuHeaderHeight: 1.666667 * TILESIZE,
    menuHeaderFontSize: Math.round( 1.111111 * TILESIZE ),
    menuTitleTop: 1.333333 * TILESIZE,
    menuSelectionColor: '#f9f9f9',
    menuLineColor: '#0ed839',
    menuTextColor: '#0ed839',
    menuPaddingLeft: 2.2 * TILESIZE,
    menuRowSize: 2,
    menuSelectionPadding: 0.388889 * TILESIZE,
    menuLineWidth: 0.111111 * TILESIZE,
    menuItemWidth: 2 * TILESIZE,
    menuItemHeight: 2 * TILESIZE,
    gameOverMenuPaddingLeft: 7.2 * TILESIZE,
    gameOverMenuPaddingTop: 4.5 * TILESIZE,
    transformMenuRowSize: 4,
    signFontSize: Math.round( 0.740741 * TILESIZE ),
    dialogPromptSize: Math.round( 0.666667 * TILESIZE ),
    dialogResponseSize: Math.round( 0.481481 * TILESIZE ),
    questlogFontSize: Math.round( 0.555556 * TILESIZE ),
    levelNameFontSize: Math.round( 0.666667 * TILESIZE ),
    walkthroughMaxWidth: 10 * TILESIZE,
    walkthroughAlign: 'left',
    walkthroughLineHeight: Math.round( 0.6666667 * TILESIZE ) * 1.3,
    // Colors
    levelNameColor: '#f9f9f9',
    transparentColor: 'transparent',
    blackColor: '#000000',
    heroColor: '#0ed839',
    enemyColor: '#e92f2f',
    waterColor: '#3b48e3',
    friendColor: '#23edda',
    rockColor: '#777777',
    heartColor: '#f996e2',
    tongueColor: '#ff55ff',
    cloudColor: '#f9f9f9',
    landColor: '#102015',
    coinColor: '#dddd13',
    kidColor: '#e09448',
    machineColor: '#7a237a',
    woodColor: '#69542d',
    // Keys
    leftKey: 37, // left arrow
    rightKey: 39, // right arrow
    downKey: 40, // down arrow
    upKey: 38, // up arrow
    actionKey: 88, // X
    jumpKey: 90, // Z
    pauseKey: 80, // P
    questlogKey: 81, // Q
    inventoryKey: 73, // I
    mapKey: 77, // M?
    enterKey: 13,
    // Debug flags
    debugInvalidRect: false,
    debugInvalidRectColor: 'red',
    // Terrian stuff
    waveSpeed: 0.4 * SECONDS,
    // Enemy stuff
    turretInterval: 2 * SECONDS,
    quickTurretInterval: 0.8 * SECONDS,
    smartTurretInterval: 0.4 * SECONDS,
    turretSpeed: -0.022222 * TILESIZE,
    quickTurretSpeed: -0.044444 * TILESIZE,
    smartTurretSpeed: -0.033333 * TILESIZE,
    submarineSpeed: -0.022222 * TILESIZE,
    balloonSpeed: -0.022222 * TILESIZE,
    battleshipSpeed: -0.022222 * TILESIZE,
    birdVelocity: -0.005 * TILESIZE,
    spiderVelocity: 0.003333 * TILESIZE,
    spiderClimbingVelocity: -0.004444 * TILESIZE,
    balloonHorizontalVelocity: -0.001111 * TILESIZE,
    balloonVerticalVelocity: 0.000389 * TILESIZE,
    balloonVerticalBoundary: 0.388889 * TILESIZE,
    monsterWalkingInterval: 0.5 * SECONDS,
    // Hero stuff
    transformAnimationDuration: SECONDS,
    manJumpVelocity: -0.022222 * TILESIZE,
    blockJumpVelocity: -0.027778 * TILESIZE,
    gravity: 0.000055555 * TILESIZE,
    rockThrowVelocity: 0.005556 * TILESIZE,
    boatBulletSpeed: -0.016667 * TILESIZE,
    boatBulletReloadRate: 0.5 * SECONDS,
    planeBulletSpeed: 0.016667 * TILESIZE,
    planeBulletReloadRate: 0.3 * SECONDS,
    planeHorizontalVelocity: 0.005556 * TILESIZE,
    planeLandingVelocity: 0.004444 * TILESIZE,
    planeTakeoffVelocity: -0.016667 * TILESIZE,
    takingDamageDuration: SECONDS,
    frogGravity: 0.0000444 * TILESIZE,
    frogJumpVelocity: -0.033333 * TILESIZE,
    frogTongueVelocity: 0.006667 * TILESIZE,
    jellyfishGravity: 0.000005555 * TILESIZE,
    clockStopDuration: 5 * SECONDS,
    clockStopCooldown: 15 * SECONDS,
    clockJumpVelocity: -0.016667 * TILESIZE,
    flameJumpVelocity: -0.016667 * TILESIZE,
    kidJumpVelocity: -0.016667 * TILESIZE,
    machineWidth: TILESIZE * 2,
    machineHeight: TILESIZE * 2,
    // Inventory stuff
    initialMaxHealth: 10,
    initialMaxCurrency: 25
};

})( window, document );


/* /Users/tbenzige/Projects/morph/new/game/utils.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( window, document, undefined ) {

// Flip bitmap
window.flipBitmap = function( b ) {
    for ( var i = 0, len = b.length; i < len; i++ ) {
        b[i].reverse();
    }

    return JSON.stringify(b, undefined, 4).
                replace( /",\n(\s)*/g, '", ' ).
                replace( /\[\n\s*"/g, '[ "' ).
                replace( /"\n\s*\]/g, '" ]' );
};

// Capitalize only the first letters in a string
// passing in a delimiters means each "word" will be capitalized
String.prototype.capitalize = function( delim ) {
    var arr, i;
    if ( !delim ) {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    arr = this.split( delim );
    for ( i in arr ) {
        arr[ i ] = arr[ i ].capitalize();
    }
    return arr.join( delim );
};

// Request/Cancel Animation Frame Polyfill
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

})( window, document );


/* /Users/tbenzige/Projects/morph/new/game/game.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    VIEWPORT_SHIFT_BOUNDARY = Settings.viewportShiftBoundary,
    MENU_WIDTH = Settings.menuWidth,
    MENU_HEIGHT = Settings.menuHeight,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    LEFT_KEY = Settings.leftKey,
    RIGHT_KEY = Settings.rightKey,
    DOWN_KEY = Settings.downKey,
    UP_KEY = Settings.upKey,
    ACTION_KEY = Settings.actionKey,
    JUMP_KEY = Settings.jumpKey,
    PAUSE_KEY = Settings.pauseKey,
    MAP_KEY = Settings.mapKey,
    INVENTORY_KEY = Settings.inventoryKey,
    ENTER_KEY = Settings.enterKey,
    DEBUG_INVALID_RECT = Settings.debugInvalidRect,
    DEBUG_INVALID_RECT_COLOR = Settings.debugInvalidRectColor,
    GOD_MODE = Settings.godMode,
    LAND_BACKGROUND = Settings.landBackground,
    SEA_BACKGROUND = Settings.seaBackground,
    LEVEL_NAME_COLOR = Settings.levelNameColor,
    LEVEL_NAME_FONT_SIZE = Settings.levelNameFontSize;

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

        //Initialize pause menu
        var pauseMenuWidth = TILESIZE * MENU_WIDTH,
            pauseMenuHeight = TILESIZE * MENU_HEIGHT,
            pauseMenuLineWidth = MENU_LINE_WIDTH;
        Game.pauseMenu = new Game.Menu.Pause( ( Game.viewportWidth - pauseMenuWidth ) / 2, ( Game.viewportHeight - pauseMenuHeight ) / 2, pauseMenuWidth, pauseMenuHeight, pauseMenuLineWidth );

        //Initialize transform menu
        Game.transformMenu = new Game.Menu.Transform( ( Game.viewportWidth - pauseMenuWidth ) / 2, ( Game.viewportHeight - pauseMenuHeight ) / 2, pauseMenuWidth, pauseMenuHeight, pauseMenuLineWidth );

        //Initialize game over menu
        Game.gameOverMenu = new Game.Menu.GameOver( ( Game.viewportWidth - pauseMenuWidth ) / 2, ( Game.viewportHeight - pauseMenuHeight ) / 2, pauseMenuWidth, pauseMenuHeight, pauseMenuLineWidth );

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

        var heroList = {
            'block': Game.Bitmaps[ 'block' ],
            'man-right': Game.Bitmaps[ 'man-right' ],
            'boat-right': Game.Bitmaps[ 'boat-right' ],
            'frog-right': Game.Bitmaps[ 'frog-right' ],
            'plane-right': Game.Bitmaps[ 'plane-right' ],
            'jellyfish': Game.Bitmaps[ 'jellyfish' ],
            'clock': Game.Bitmaps[ 'clock-1' ],
            'flame': Game.Bitmaps[ 'flame-big' ],
            'restart': Game.Bitmaps[ 'restart' ],
            'exit': Game.Bitmaps[ 'exit' ],
            'friend-man-closeup': Game.Bitmaps[ 'friend-man-closeup' ],
            'friend-monster-closeup': Game.Bitmaps[ 'friend-monster-closeup' ],
            'kid-closeup': Game.Bitmaps[ 'kid-closeup' ]
        };

        for ( var i in heroList ) {
            Game.Sprites[i + '-double'] = Game.Sprite( Game.convertBitmapToSprite( heroList[i], TILESIZE / 4.5 ) );
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
            if ( ( !Game.stopLoop && !Game.startTransform && !Game.showSign ) && !Game.paused ) {
                Game.requestID = requestAnimationFrame( Game.loop ); 
            } else if ( Game.startTransform ) {
                Game.showTransformMenu();
            } else if ( Game.showSign ) {
                Game.showSignMenu();
            } else if ( Game.switchToLevel ) {
                Game.performLevelSwitch();
            }
        }
    },
    nextWalkthrough: function() {
        if ( Game.currentLevel.walkthroughs && Game.currentLevel.walkthroughs[ Game.lastWalkthrough + 1 ] ) {
            Game.lastWalkthrough++;
            Game.activeWalkthrough = Game.currentLevel.walkthroughs[ Game.lastWalkthrough ];
        } else {
            Game.activeWalkthrough = null;
        }
    },
    update: function( timeDiff ) {
        if ( 73 in Game.keysDown && Game.keysDown[ 73 ] != 'locked' ) {
            // "I" key for inventory
            // show inventory menu
        }

        if ( Game.currentLevel.scene && Game.currentLevel.scene.playing ) {
            var scene = Game.currentLevel.scene;
            scene.next();
        }

        if ( Game.transforming ) {
            Game.hero.generateNextCoords( timeDiff );
            Game.hero.invalidateRect();
            for ( var i = 0; i < Game.currentLevel.entities.length; i++ ) {
                var collisions = Game.hero.getCollisions( Game.currentLevel.entities[i] );
                if ( collisions ) {
                    Game.hero.collideWith( Game.currentLevel.entities[i], collisions );
                }
            }
        } else {
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

            if ( DEBUG_INVALID_RECT ) {
                Game.displayInvalidRect();
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

            for ( i = 0; i < Game.Inventory.maxHealth; i++ ) {
                if ( i % 2 == 0 && i < Game.Inventory.health ) {
                    Game.ctx.drawImage( Game.Sprites[ 'heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                } else if ( i == Game.Inventory.health && i % 2 == 1 ) {
                    Game.ctx.drawImage( Game.Sprites[ 'half-heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                } else if ( i % 2 == 0 ) {
                    Game.ctx.drawImage( Game.Sprites[ 'empty-heart' ], Math.floor( i / 2 ) * TILESIZE + TILESIZE / 2, TILESIZE / 2 );
                }
            }

            var levelName = Game.currentLevel.title;

            if ( levelName ) {
                Game.ctx.fillStyle = Game.background;

                Game.ctx.font = 'normal ' + LEVEL_NAME_FONT_SIZE + 'px uni05';
                Game.ctx.textAlign = 'right';

                Game.ctx.fillText( levelName, Game.viewportWidth - 10, TILESIZE );

                Game.ctx.fillStyle = LEVEL_NAME_COLOR;
                Game.ctx.fillText( levelName, Game.viewportWidth - 10, TILESIZE );
            }

            if ( Game.activeWalkthrough ) {
                var check = Game.activeWalkthrough.callback();

                if ( !check ) {
                    Game.invalidateRect( 0 - TILESIZE, Game.viewportWidth + 2 * TILESIZE, Game.viewportHeight + 2 * TILESIZE, 0 - TILESIZE );
                } else {
                    Game.activeWalkthrough.render();
                }
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

        if ( Game.currentLevel.walkthroughs && Game.currentLevel.walkthroughs.length ) {
            Game.activeWalkthrough = Game.currentLevel.walkthroughs[0];
            Game.lastWalkthrough = 0;
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
    pause: function( menu ) {
        if ( menu == 'pause' ) {
            Game.pauseMenu.show();
        } else if ( menu == 'map' ) {
            Game.mapMenu.show();
        } else if ( menu == 'questlog' ) {
            Game.questlogMenu.show();
        }
        Game.paused = true;
        cancelAnimationFrame( Game.requestID );
    },
    resume: function() {
        Game.paused = false;
        Game.lastUpdate = null;
        Game.invalidateRect( 0, Game.viewportWidth, Game.viewportHeight, 0 );
        Game.requestID = requestAnimationFrame( Game.loop ); 
    },
    showTransformMenu: function() {
        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.transformMenu.show();
        Game.startTransform = false;
    },
    openTransformMenu: function() {
        if ( Game.Questlog.inLog( 'man' ) || Game.godMode ) {
            Game.startTransform = true;
            return true;
        }
        // Can't transform - play sound
        return false;
    },
    openSign: function( content ) {
        var menuWidth = TILESIZE * MENU_WIDTH,
            menuHeight = TILESIZE * MENU_HEIGHT,
            menuLineWidth = MENU_LINE_WIDTH;

        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.currentSign = new Game.Menu.Sign( ( Game.viewportWidth - menuWidth ) / 2, ( Game.viewportHeight - menuHeight ) / 2, menuWidth, menuHeight, menuLineWidth, content );
        Game.showSign = true;
    },
    openDialog: function( content ) {
        var menuWidth = TILESIZE * MENU_WIDTH,
            menuHeight = TILESIZE * MENU_HEIGHT,
            menuLineWidth = MENU_LINE_WIDTH;

        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.currentSign = new Game.Menu.Dialog( ( Game.viewportWidth - menuWidth ) / 2, ( Game.viewportHeight - menuHeight ) / 2, menuWidth, menuHeight, menuLineWidth, content );
        Game.showSign = true;
    },
    showSignMenu: function() {
        Game.paused = true;
        Game.currentSign.show();
        Game.showSign = false;
    },
    startTransformAnimation: function( newType ) {
        Game.startTransform = false;
        Game.transforming = true;
        Game.keysLocked = true;
        Game.hero.transform( newType );
        Game.lastUpdate = null;
        Game.invalidateRect( 0, Game.viewportWidth + Game.viewportOffset, Game.viewportHeight, Game.viewportOffset );
        Game.render( 0 );
        Game.requestID = requestAnimationFrame( Game.loop );
    },
    doneTransforming: function() {
        Game.paused = false;
        Game.transforming = false;
        Game.keysLocked = false;
        Game.startTransform = false;
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
        Game.gameOverMenu.show();
        Game.paused = true;
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
    godMode: GOD_MODE
};
Game.viewportTileWidth = Settings.defaultViewportWidth;
Game.viewportTileHeight = Settings.defaultViewportHeight;
window.Game = Game;

})( Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/sprite.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var tr = Settings.transparentColor,
    gn = Settings.heroColor,
    re = Settings.enemyColor,
    bu = Settings.waterColor,
    cy = Settings.friendColor,
    gy = Settings.rockColor,
    pi = Settings.heartColor,
    wh = Settings.cloudColor,
    bk = Settings.blackColor,
    sg = Settings.landColor,
    yl = Settings.coinColor,
    or = Settings.kidColor,
    pu = Settings.machineColor,
    br = Settings.woodColor;

Game.Sprite = function( path ) {
    var image = new Image();
    image.onload = function() {
        if ( !Game.Editing ) {
            Game.imageLoaded();
        }
    };
    image.src = path;
    return image;
}

Game.Sprites = {};

Game.Bitmaps = {
    'transparent': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'turret': [
        [ tr, tr, re, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'turret-quick-left': [
        [ tr, tr, re, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, re, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'turret-quick-right': [
        [ tr, tr, tr, re, re, re, re, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, re, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'turret-smart-left': [
        [ tr, tr, re, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, tr, re, re, re, tr, re, tr ],
        [ tr, re, tr, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, re, re, re, tr, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'turret-smart-right': [
        [ tr, tr, tr, re, re, re, re, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, tr, re, re, re, tr, re, tr ],
        [ tr, re, tr, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, re, re, re, tr, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'monster-open': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ re, re, bk, bk, bk, bk, bk, re, re ],
        [ tr, re, bk, bk, bk, bk, bk, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-closing': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ re, re, bk, bk, bk, bk, bk, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-gnashed': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-closed': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'bird-wings-up': [
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, re, re, re, tr, re ],
        [ tr, tr, tr, re, re, re, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'bird-wings-down': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, re, tr, tr ]
    ],
    'spider-web': [ [ re ] ],
    'spider-walking-left-1': [
        [ re, tr, tr, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-2': [
        [ tr, re, re, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-3': [
        [ re, tr, tr, re, tr, re, re, tr, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-4': [
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-1': [
        [ re, tr, tr, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-2': [
        [ tr, re, tr, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-3': [
        [ tr, tr, re, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-4': [
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-falling': [
        [ tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ re, tr, tr, re, re, re, tr, tr, re ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, tr, tr, re, re, re, tr, tr, re ],
        [ tr, tr, tr, re, tr, re, tr, tr, tr ]
    ],
    'heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, pi, pi, tr, pi, pi, tr, tr ],
        [ tr, tr, pi, pi, pi, pi, pi, tr, tr ],
        [ tr, tr, pi, pi, pi, pi, pi, tr, tr ],
        [ tr, tr, tr, pi, pi, pi, tr, tr, tr ],
        [ tr, tr, tr, tr, pi, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'half-heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, pi, pi, tr, wh, wh, tr, tr ],
        [ tr, tr, pi, pi, pi, wh, wh, tr, tr ],
        [ tr, tr, pi, pi, pi, wh, wh, tr, tr ],
        [ tr, tr, tr, pi, pi, wh, tr, tr, tr ],
        [ tr, tr, tr, tr, pi, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'empty-heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, wh, wh, tr, wh, wh, tr, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ tr, tr, tr, wh, wh, wh, tr, tr, tr ],
        [ tr, tr, tr, tr, wh, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'man-right': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, gn, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, tr, tr, tr, tr, gn, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, gn, gn  ]
    ],
    'man-left': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, gn ],
        [ tr, gn, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn  ]
    ],
    'man-holding-right': [
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, tr, tr, tr, tr, gn, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, gn, gn ]
    ],
    'man-holding-left': [
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, gn ],
        [ tr, gn, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn ]
    ],
    'block': [
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ]
    ],
    'rock': [
        [ tr, tr, tr, gy, gy, gy, tr, tr, tr ],
        [ tr, tr, gy, gy, gy, gy, gy, tr, tr ],
        [ tr, tr, gy, gy, gy, gy, gy, gy, tr ],
        [ tr, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ]
    ],
    'coin': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, yl, yl, yl, tr, tr, tr ],
        [ tr, tr, yl, wh, wh, yl, yl, tr, tr ],
        [ tr, tr, yl, yl, yl, wh, yl, tr, tr ],
        [ tr, tr, yl, yl, yl, wh, yl, tr, tr ],
        [ tr, tr, tr, yl, yl, yl, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr  ]
    ],
    'bullet-red': [
        [ re, re ],
        [ re, re ]
    ],
    'bullet-green': [
        [ gn, gn ],
        [ gn, gn ]
    ],
    'egg': [
        [ tr, re, tr ],
        [ re, re, re ],
        [ re, re, re ],
        [ tr, re, tr ]
    ],
    'machine-green': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, pu, pu, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, tr, tr, tr, tr, tr, tr, tr, tr, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, tr, tr, tr, tr, tr, tr, tr, tr, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, gn, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, bk, bk, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, bk, bk, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, pu, pu ]
    ],
    'machine-red': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, pu, pu, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, tr, tr, tr, tr, tr, tr, tr, tr, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, pu, tr, tr, tr, tr, tr, tr, tr, tr, pu, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, re, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, bk, bk, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, bk, bk, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, pu, pu, pu, pu, pu, pu, pu, pu, pu ]
    ],
    'land': [
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ]
    ],
    'enemy-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, re, tr, tr ]
    ],
    'enemy-dying-2': [
        [ tr, tr, re, tr, tr, tr, tr, re, re ],
        [ re, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ tr, re, tr, re, tr, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr ]
    ],
    'enemy-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, re, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, re, tr ]
    ],
    'enemy-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, re ],
        [ re, re, tr, tr, tr, tr, re, tr, tr ]
    ],
    'enemy-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, tr, tr, re, tr, re, tr, tr ]
    ],
    'enemy-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, re, tr, re, tr, tr, tr, re ],
        [ tr, re, tr, tr, tr, re, tr, re, tr ]
    ],
    'enemy-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, tr, tr, re, tr, tr, re ],
        [ re, tr, re, tr, re, tr, re, tr, tr ]
    ],
    'enemy-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr ],
        [ re, re, re, tr, re, tr, re, re, re ]
    ],
    'enemy-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ]
    ],
    'hero-scramble-1': [
        [ tr, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, gn, tr, gn, gn, tr, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, tr, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, tr, gn, tr, gn, tr ]
    ],
    'hero-scramble-2': [
        [ gn, tr, tr, tr, gn, tr, tr, gn, gn ],
        [ tr, gn, tr, tr, tr, gn, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, gn, gn, tr ],
        [ tr, gn, gn, tr, gn, tr, tr, gn, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, tr, tr ]
    ],
    'hero-scramble-3': [
        [ tr, tr, tr, gn, tr, gn, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, gn, gn, tr, gn, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, gn, tr, tr, gn, gn, tr ],
        [ gn, tr, gn, tr, tr, tr, tr, tr, tr ]
    ],
    'hero-scramble-4': [
        [ tr, gn, gn, tr, tr, tr, gn, tr, tr ],
        [ gn, tr, tr, tr, tr, gn, tr, gn, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, gn ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, gn ],
        [ gn, tr, tr, tr, tr, gn, tr, gn, gn ],
        [ tr, tr, gn, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, gn, tr ],
        [ gn, gn, tr, tr, tr, tr, gn, tr, tr ]
    ],
    'hero-scramble-5': [
        [ gn, gn, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, gn, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, gn, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, gn, tr, tr ],
        [ tr, gn, tr, tr, tr, gn, gn, tr, tr ],
        [ tr, gn, gn, tr, tr, tr, tr, tr, gn ]
    ],
    'boat-left': [
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, tr, tr, tr, tr ],
        [ tr, tr, gn, gn, gn, tr, tr, tr, tr ],
        [ tr, gn, gn, gn, gn, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'boat-right': [
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, gn, gn, tr, tr ],
        [ tr, tr, tr, tr, gn, gn, gn, gn, tr ],
        [ tr, tr, tr, tr, gn, gn, gn, gn, gn ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'water': [
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'wave-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ bu, tr, tr, tr, tr, tr, bu, bu, bu ]
    ],
    'wave-2': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ bu, bu, tr, tr, tr, tr, tr, bu, bu ]
    ],
    'wave-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, bu ]
    ],
    'wave-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, bu, tr, tr, tr, tr, tr, tr ],
        [ tr, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ]
    ],
    'wave-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, bu, tr, tr, tr, tr, tr ],
        [ tr, tr, bu, bu, tr, tr, tr, tr, tr ],
        [ tr, bu, bu, bu, bu, tr, tr, tr, tr ]
    ],
    'wave-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, bu, tr, tr, tr, tr ],
        [ tr, tr, tr, bu, bu, tr, tr, tr, tr ],
        [ tr, tr, bu, bu, bu, bu, tr, tr, tr ]
    ],
    'wave-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, bu, tr, tr, tr ],
        [ tr, tr, tr, tr, bu, bu, tr, tr, tr ],
        [ tr, tr, tr, bu, bu, bu, bu, tr, tr ]
    ],
    'wave-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, bu, tr, tr ],
        [ tr, tr, tr, tr, tr, bu, bu, tr, tr ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, tr ]
    ],
    'wave-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, tr ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, tr ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ]
    ],
    'battleship-right': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr, tr, tr ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr ],
    ],
    'battleship-left': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr, tr, tr ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ]
    ],
    'battleship-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re, tr, re, re, re, re, re, re, re, re, tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr, re, re, re, re, re, re, re, re, tr, re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr, tr, tr, re, re, tr, re, re, tr, tr, tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr, tr, tr, re, re, tr, re, re, tr, tr, tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr ]
    ],
    'battleship-dying-2': [
        [ tr, tr, re, tr, tr, tr, tr, re, re, tr, tr, re, tr, tr, tr, tr, re, re, tr, tr, re, tr, tr, tr, tr, re, re ],
        [ re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr ]
    ],
    'battleship-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, re, tr, re, tr, tr, tr, tr, re, tr, re, tr, re, tr, tr, tr, tr, re, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, tr, re, tr, re, tr, tr, re, tr, tr, tr, re, tr, re, tr, tr, re, tr, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, re, tr, tr, tr, re, tr, tr, tr, re, re, tr, tr, tr, re, tr, tr, tr, re, re, tr ]
    ],
    'battleship-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, tr, re, tr, tr, tr, tr, tr, tr, re, tr, re, tr, tr, tr, tr, tr, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re ],
        [ re, re, tr, tr, tr, tr, re, tr, tr, re, re, tr, tr, tr, tr, re, tr, tr, re, re, tr, tr, tr, tr, re, tr, tr ]
    ],
    'battleship-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr, tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr ]
    ],
    'battleship-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re ],
        [ tr, re, tr, tr, tr, re, tr, re, tr, tr, re, tr, tr, tr, re, tr, re, tr, tr, re, tr, tr, tr, re, tr, re, tr ]
    ],
    'battleship-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re, tr, re, tr, tr, tr, re, tr, tr, re ],
        [ re, tr, re, tr, re, tr, re, tr, tr, re, tr, re, tr, re, tr, re, tr, tr, re, tr, re, tr, re, tr, re, tr, tr ]
    ],
    'battleship-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, re, tr ],
        [ re, re, re, tr, re, tr, re, re, re, re, re, re, tr, re, tr, re, re, re, re, re, re, tr, re, tr, re, re, re ]
    ],
    'battleship-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ]
    ],
    'balloon': [
        [ tr, tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, re, re, re, re, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr ],
        [ tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, re, tr, tr, tr, tr, re, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'waterfall-1': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-2': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-3': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-4': [
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-5': [
        [ bu, tr, tr, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-6': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-7': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-8': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, tr, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterfall-9': [
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, bu, tr, tr, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, tr ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, bu, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-2': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, bu, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, bu, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, bu, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-5': [
        [ tr, tr, tr, tr, tr, bu, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-6': [
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ tr, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ tr, tr, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ tr, tr, tr, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'waterclimb-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, bu ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ],
        [ bu, tr, tr, tr, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'frog-right': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, gn, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, gn, gn, tr, gn, gn, tr ]
    ],
    'frog-right-lick': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, pi ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, gn, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, gn, gn, tr, gn, gn, tr ]
    ],
    'frog-right-jump': [
        [ tr, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, gn, gn, gn, gn, tr, tr, tr ],
        [ tr, gn, gn, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, gn, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, gn, tr, tr, tr, tr, tr, tr ]
    ],
    'frog-left': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, gn, tr, tr, gn, gn, gn, tr ],
        [ tr, tr, gn, tr, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, tr, gn, gn, gn, tr, tr ]
    ],
    'frog-left-lick': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ pi, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, gn, tr, tr, gn, gn, gn, tr ],
        [ tr, tr, gn, tr, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, tr, gn, gn, gn, tr, tr ]
    ],
    'frog-tongue': [
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi, pi ]
    ],
    'frog-left-jump': [
        [ tr, tr, gn, tr, tr, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, gn, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, gn, gn, tr ],
        [ tr, tr, tr, tr, tr, tr, gn, gn, tr ],
        [ tr, tr, tr, tr, tr, tr, gn, gn, tr ]
    ],
    'hero-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, tr, gn, gn, tr, tr ],
        [ tr, tr, gn, gn, tr, gn, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, gn, tr, tr ]
    ],
    'hero-dying-2': [
        [ tr, tr, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, gn, tr, gn, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, gn, tr ]
    ],
    'hero-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, gn, tr, tr, gn, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, gn, tr, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, tr ]
    ],
    'hero-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, gn, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, gn ],
        [ gn, gn, tr, tr, tr, tr, gn, tr, tr ]
    ],
    'hero-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, gn, tr, gn, tr, tr ]
    ],
    'hero-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, gn, tr, gn, tr ]
    ],
    'hero-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, gn, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, tr, gn, tr, tr, gn ],
        [ gn, tr, gn, tr, gn, tr, gn, tr, tr ]
    ],
    'hero-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, gn, tr ],
        [ gn, gn, gn, tr, gn, tr, gn, gn, gn ]
    ],
    'hero-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ]
    ],
    'restart': [
        [ tr, tr, tr, gn, gn, gn, gn, tr, tr ],
        [ gn, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, gn, tr, tr ]
    ],
    'exit': [
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, gn, gn, gn, tr, tr, gn ],
        [ gn, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'plane-right': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, gn, gn, tr, tr, tr ],
        [ gn, gn, tr, tr, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, tr, tr, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ]
    ],
    'plane-left': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, tr, tr, tr, gn ],
        [ tr, tr, tr, gn, gn, tr, tr, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, tr, tr, gn, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ]
    ],
    'cloud-1': [
        [ tr, wh, wh, wh, tr, wh, wh, wh, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ tr, wh, wh, wh, wh, wh, wh, wh, tr ],
        [ tr, wh, wh, wh, wh, wh, wh, tr, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ tr, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ tr, tr, wh, wh, wh, wh, wh, wh, tr ]
    ],
    'cloud-2': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, wh, tr, tr, tr, wh, wh, tr ],
        [ wh, wh, wh, wh, tr, wh, wh, wh, wh ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ tr, wh, wh, wh, wh, wh, wh, tr, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, tr ],
        [ wh, wh, wh, tr, tr, wh, wh, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'cloud-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, wh, wh, wh, tr, wh, wh, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, wh, tr ],
        [ tr, tr, tr, wh, wh, wh, wh, wh, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, tr ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ wh, wh, wh, wh, wh, wh, wh, wh, wh ],
        [ tr, wh, wh, wh, tr, tr, wh, wh, tr ]
    ],
    'jellyfish': [
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, tr, gn, tr, gn, tr, gn, tr ],
        [ gn, gn, tr, gn, tr, gn, tr, gn, tr ],
        [ gn, tr, tr, gn, tr, gn, tr, gn, tr ],
        [ gn, tr, tr, gn, tr, gn, tr, gn, gn ],
        [ gn, tr, gn, gn, tr, gn, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, gn, gn, tr, tr ]
    ],
    'lightning': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, cy, cy, cy, tr, tr, tr, tr, tr, tr, cy, tr, cy, cy, tr ],
        [ tr, tr, cy, tr, tr, tr, tr, cy, tr, tr, cy, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, cy, tr, tr ],
        [ tr, tr, cy, cy, cy, tr, tr, cy, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, cy, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, cy, tr, cy, tr, tr, tr, cy, tr, tr, tr, cy, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, cy, tr, cy, tr, tr, tr, tr, tr, cy, tr, cy, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr ],
        [ tr, tr, cy, cy, tr, tr, cy, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, cy, tr, tr, cy, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, cy, tr, cy, cy, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr ],
        [ tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, cy, tr, tr ],
        [ cy, cy, tr, cy, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, cy, tr, tr, tr ],
        [ tr, tr, cy, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, cy, tr, tr, tr, cy, tr, tr ],
        [ tr, cy, tr, tr, tr, tr, cy, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, cy, tr ],
        [ tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, cy, tr, tr, tr, cy, cy ],
        [ tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, cy, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, cy, cy, cy, tr, tr, tr, tr, cy, tr, cy, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, cy, tr, tr, cy, tr, tr, tr, cy, tr, tr, cy, cy, cy, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, cy, tr, tr, cy, tr, tr, cy, tr, tr, tr, cy, cy, tr, tr, tr, cy, tr ],
        [ tr, tr, tr, tr, cy, tr, tr, tr, tr, cy, tr, tr, cy, tr, cy, tr, tr, tr, tr, tr, cy, tr, cy, tr, tr, tr, cy ],
        [ tr, tr, tr, tr, tr, cy, cy, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, cy, tr, tr, cy, tr, tr, cy ],
        [ tr, cy, cy, tr, cy, tr, tr, cy, tr, tr, tr, tr, cy, cy, cy, tr, tr, tr, tr, cy, tr, tr, tr, cy, tr, cy, tr ],
        [ tr, tr, tr, cy, tr, tr, tr, cy, tr, tr, tr, cy, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, cy, cy, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, cy, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'submarine': [
        [ tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re ],
        [ tr, tr, tr, tr, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, re, re ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ re, re, tr, tr, re, re, tr, tr, re, re, tr, tr, re, re, re, re, re, re ],
        [ re, re, tr, tr, re, re, tr, tr, re, re, tr, tr, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, re, re, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'bubble': [
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ tr, wh, tr, tr, tr, tr, tr, wh, tr ],
        [ wh, tr, tr, tr, wh, wh, tr, tr, wh ],
        [ wh, tr, tr, tr, tr, tr, wh, tr, wh ],
        [ wh, tr, tr, tr, tr, tr, wh, tr, wh ],
        [ wh, tr, tr, tr, tr, tr, wh, tr, wh ],
        [ wh, tr, tr, tr, tr, tr, tr, tr, wh ],
        [ tr, wh, tr, tr, tr, tr, tr, wh, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ]
    ],
    'clock-1': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, bk, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, bk, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-2': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, bk, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-3': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, bk, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-4': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, bk, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, bk, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-5': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, bk, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, bk, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-6': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, bk, gn, gn, gn, gn, gn ],
        [ gn, gn, bk, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-7': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, bk, bk, bk, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'clock-8': [
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ gn, gn, bk, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, bk, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, bk, bk, bk, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'flame-big': [
        [ tr, tr, yl, tr, tr, yl, yl, tr, tr ],
        [ yl, tr, yl, yl, tr, tr, yl, tr, yl ],
        [ yl, yl, yl, yl, yl, tr, yl, yl, yl ],
        [ yl, yl, or, yl, yl, tr, yl, yl, tr ],
        [ yl, yl, or, or, yl, yl, yl, tr, tr ],
        [ tr, yl, yl, or, or, or, yl, tr, yl ],
        [ tr, yl, yl, or, or, or, yl, yl, yl ],
        [ tr, yl, yl, or, or, or, or, or, yl ],
        [ tr, tr, yl, yl, yl, yl, yl, yl, tr ]
    ],
    'flame-small': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, yl, yl, tr, tr, tr ],
        [ tr, tr, tr, yl, yl, tr, tr, tr, tr ],
        [ tr, tr, yl, yl, yl, tr, tr, tr, tr ],
        [ tr, tr, yl, or, yl, yl, yl, tr, tr ],
        [ tr, tr, yl, or, or, or, yl, tr, tr ],
        [ tr, tr, yl, yl, or, or, yl, tr, tr ],
        [ tr, tr, tr, yl, yl, yl, tr, tr, tr ]
    ],
    'heat': [
        [ tr, tr, tr, tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr, tr, tr, tr ],
        [ tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr ],
        [ tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr ],
        [ tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.3)" ]
    ],
    'heat-2': [
        [ tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr, tr, tr, tr ],
        [ tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr ],
        [ tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr ],
        [ tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ],
        [ "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)" ],
        [ "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", tr, tr, tr, tr, tr, tr, tr, tr, tr, "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)", "rgba(50,50,50,0.5)", "rgba(50,50,50,0.1)" ]
    ],
    'land-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, sg ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, sg ],
        [ tr, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, tr ],
        [ tr, tr, sg, sg, tr, sg, sg, tr, tr ],
        [ tr, tr, sg, sg, tr, sg, sg, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, sg, tr, tr ]
    ],
    'land-dying-2': [
        [ tr, tr, sg, tr, tr, tr, tr, sg, sg ],
        [ sg, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, sg, tr, tr, sg ],
        [ tr, tr, sg, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, tr, tr, sg, tr, tr, tr, tr ],
        [ tr, sg, tr, sg, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, tr, tr, sg, tr, tr, tr ],
        [ sg, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, sg, tr ]
    ],
    'land-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, tr, tr, tr ],
        [ sg, tr, tr, tr, sg, tr, tr, sg, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, sg, tr, sg, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, sg, tr, tr, tr, sg ],
        [ tr, tr, sg, tr, tr, tr, sg, sg, tr ]
    ],
    'land-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, sg, tr, sg, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, sg ],
        [ sg, sg, tr, tr, tr, tr, sg, tr, tr ]
    ],
    'land-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, sg, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, sg, tr, tr, sg, tr, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, sg, tr, tr, sg, tr, sg, tr, tr ]
    ],
    'land-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ sg, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, sg, tr, sg, tr, tr, tr, sg ],
        [ tr, sg, tr, tr, tr, sg, tr, sg, tr ]
    ],
    'land-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, sg, tr, tr, sg, tr ],
        [ tr, sg, tr, tr, tr, sg, tr, tr, sg ],
        [ sg, tr, sg, tr, sg, tr, sg, tr, tr ]
    ],
    'land-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, sg, tr ],
        [ sg, sg, sg, tr, sg, tr, sg, sg, sg ]
    ],
    'land-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ]
    ],
    'flame-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, yl ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, yl ],
        [ tr, yl, yl, yl, yl, yl, yl, yl, yl ],
        [ yl, yl, yl, yl, yl, yl, yl, yl, tr ],
        [ tr, tr, yl, yl, tr, yl, yl, tr, tr ],
        [ tr, tr, yl, yl, tr, yl, yl, tr, tr ],
        [ tr, tr, tr, yl, tr, tr, yl, tr, tr ]
    ],
    'flame-dying-2': [
        [ tr, tr, yl, tr, tr, tr, tr, yl, yl ],
        [ yl, tr, tr, yl, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, yl, tr, tr, yl ],
        [ tr, tr, yl, tr, tr, tr, yl, tr, tr ],
        [ tr, tr, tr, tr, yl, tr, tr, tr, tr ],
        [ tr, yl, tr, yl, tr, tr, tr, yl, tr ],
        [ tr, tr, tr, tr, tr, yl, tr, tr, tr ],
        [ yl, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, yl, tr, tr, tr, yl, tr ]
    ],
    'flame-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, yl, tr, tr, tr, tr, tr, tr ],
        [ yl, tr, tr, tr, yl, tr, tr, yl, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, yl, tr, yl, tr, yl, tr, tr ],
        [ tr, yl, tr, tr, tr, tr, tr, yl, tr ],
        [ tr, tr, tr, yl, tr, tr, tr, tr, tr ],
        [ tr, yl, tr, tr, yl, tr, tr, tr, yl ],
        [ tr, tr, yl, tr, tr, tr, yl, yl, tr ]
    ],
    'flame-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, yl, tr, tr, tr, tr, yl, tr ],
        [ tr, tr, tr, yl, tr, tr, tr, tr, tr ],
        [ tr, yl, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, yl, tr, yl, tr, tr ],
        [ tr, yl, tr, tr, tr, tr, yl, tr, tr ],
        [ tr, tr, tr, yl, tr, tr, tr, tr, yl ],
        [ yl, yl, tr, tr, tr, tr, yl, tr, tr ]
    ],
    'flame-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, yl, tr, tr, yl, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, yl, tr ],
        [ tr, tr, yl, tr, tr, yl, tr, tr, tr ],
        [ tr, yl, tr, tr, tr, tr, tr, yl, tr ],
        [ tr, yl, tr, tr, yl, tr, yl, tr, tr ]
    ],
    'flame-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ yl, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, yl, tr, tr, tr, yl, tr, tr ],
        [ tr, tr, yl, tr, yl, tr, tr, tr, yl ],
        [ tr, yl, tr, tr, tr, yl, tr, yl, tr ]
    ],
    'flame-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, yl, tr, tr, yl, tr, tr, yl, tr ],
        [ tr, yl, tr, tr, tr, yl, tr, tr, yl ],
        [ yl, tr, yl, tr, yl, tr, yl, tr, tr ]
    ],
    'flame-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, yl, tr, tr, tr, yl, tr ],
        [ yl, yl, yl, tr, yl, tr, yl, yl, yl ]
    ],
    'flame-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ yl, yl, yl, yl, yl, yl, yl, yl, yl ]
    ],
    'kid': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, or, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, or, or, or, or, or, tr, tr ],
        [ tr, tr, tr, or, or, or, tr, tr, tr ],
        [ tr, tr, tr, or, or, or, tr, tr, tr ],
        [ tr, tr, tr, or, tr, or, tr, tr, tr ]
    ],
    'kid-closeup': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, or, or, or, tr, tr, tr ],
        [ tr, tr, tr, or, or, or, tr, tr, tr ],
        [ tr, tr, tr, or, or, or, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ or, or, or, or, or, or, or, or, or ],
        [ or, or, or, or, or, or, or, or, or ],
        [ or, or, or, or, or, or, or, or, or ]
    ],
    'wood': [
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br ]
    ],
    'window': [
        [ br, br, br, br, br, br, br, br, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, br, br, br, br, br, br, br, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, bk, bk, bk, br, bk, bk, bk, br ],
        [ br, br, br, br, br, br, br, br, br ]
    ],
    'door': [
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, bk, bk, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, bk, bk, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ],
        [ br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br, br, bk, br, br, br, br, br, br, br, br ]
    ],
    'friend-man': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, cy, tr, tr, tr, tr ],
        [ tr, cy, tr, tr, tr, tr, tr, cy, tr ],
        [ tr, cy, cy, cy, cy, cy, cy, cy, tr ],
        [ tr, tr, tr, cy, cy, cy, tr, tr, tr ],
        [ tr, tr, tr, cy, cy, cy, tr, tr, tr ],
        [ tr, tr, cy, tr, tr, tr, cy, tr, tr ],
        [ tr, cy, cy, tr, tr, tr, cy, cy, tr ],
        [ cy, cy, cy, tr, tr, tr, cy, cy, cy ]
    ],
    'friend-man-closeup': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, cy, cy, cy, tr, tr, tr ],
        [ tr, tr, tr, cy, cy, cy, tr, tr, tr ],
        [ tr, tr, tr, cy, cy, cy, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ]
    ],
    'friend-monster': [
        [ tr, cy, tr, tr, tr, tr, tr, cy, tr ],
        [ tr, cy, cy, tr, tr, tr, cy, cy, tr ],
        [ tr, cy, bk, cy, cy, cy, bk, cy, tr ],
        [ tr, cy, cy, cy, cy, cy, cy, cy, tr ],
        [ cy, cy, bk, cy, cy, cy, bk, cy, cy ],
        [ cy, cy, cy, bk, bk, bk, cy, cy, cy ],
        [ tr, cy, cy, cy, cy, cy, cy, cy, tr ],
        [ tr, tr, cy, cy, tr, cy, cy, tr, tr ],
        [ tr, cy, cy, cy, tr, cy, cy, cy, tr ]
    ],
    'friend-monster-closeup': [
        [ cy, tr, tr, tr, tr, tr, tr, tr, cy ],
        [ cy, cy, tr, tr, tr, tr, tr, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ],
        [ cy, cy, bk, cy, cy, cy, bk, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ],
        [ cy, bk, cy, cy, cy, cy, cy, bk, cy ],
        [ cy, cy, bk, bk, bk, bk, bk, cy, cy ],
        [ cy, cy, cy, cy, cy, cy, cy, cy, cy ]
    ],
    'sign': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, br, br, br, br, br, tr, tr ],
        [ tr, tr, br, br, br, br, br, tr, tr ],
        [ tr, tr, br, br, br, br, br, tr, tr ],
        [ tr, tr, tr, tr, br, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, br, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, br, tr, tr, tr, tr ]
    ],
    'switch': [
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ],
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ],
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ]
    ],
    'trapdoor': [
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ]
    ]
};

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/vector.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

Game.Vector = Class.extend({
    init: function( x, y ) {
        this.x = x;
        this.y = y;
    },
    add: function(vector) {
        var vector = new Game.Vector(
            this.x + vector.x,
            this.y + vector.y
        );
        return vector
    },
    subtract: function(vector) {
        var vector = new Game.Vector(
            this.x - vector.x,
            this.y - vector.y
        );
        return vector
    },
    multiply: function(scalar) {
        var vector = new Game.Vector(
            this.x*scalar,
            this.y*scalar
        );
        return vector
    },
    length: function() {
        var squareSum = Math.pow(this.x, 2) + Math.pow(this.y, 2)
        return Math.sqrt(squareSum)
    },
    duplicate: function() {
        var duplicate = new Game.Vector(this.x, this.y)
        return duplicate
    }
});

Game.getIntersection = function( p1, p2, p3, p4 ) {
    var m1, c1, m2, c2,
        intersectionX, intersectionY;

    // HACK - avoid infinite and zero slopes
    if ( !( p2.x - p1.x ) ) {
        p2.x += 0.001;
    }
    if ( !( p4.x - p3.x ) ) {
        p4.x += 0.001;
    }
    if ( !( p2.y - p1.y ) ) {
        p2.y += 0.001;
    }
    if ( !( p4.y - p3.y ) ) {
        p4.y += 0.001;
    }

    m1 = ( p2.y - p1.y ) / ( p2.x - p1.x );
    c1 = p1.y - m1 * p1.x;


    m2 = ( p4.y - p3.y ) / ( p4.x - p3.x );
    c2 = p3.y - m2 * p3.x;

    if ( !( m1 - m2 ) ) {
        return null;
    } else {
        intersectionX = ( c2 - c1 ) / ( m1 - m2 );
        intersectionY = m1 * intersectionX + c1;

        return new Game.Vector( intersectionX, intersectionY );
    }
}

Game.isOnSegment = function( xi, yi, xj, yj, xk, yk ) {
    return (xi <= xk || xj <= xk) && (xk <= xi || xk <= xj) &&
        (yi <= yk || yj <= yk) && (yk <= yi || yk <= yj);
};

Game.computeDirection = function( xi, yi, xj, yj, xk, yk ) {
    var a = (xk - xi) * (yj - yi),
        b = (xj - xi) * (yk - yi);
    return a < b ? -1 : a > b ? 1 : 0;
};

/** Do line segments (x1, y1)--(x2, y2) and (x3, y3)--(x4, y4) intersect? */
Game.checkIntersection = function( p1, p2, p3, p4 ) {
    var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y,
        x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y,
        d1 = Game.computeDirection(x3, y3, x4, y4, x1, y1),
        d2 = Game.computeDirection(x3, y3, x4, y4, x2, y2),
        d3 = Game.computeDirection(x1, y1, x2, y2, x3, y3),
        d4 = Game.computeDirection(x1, y1, x2, y2, x4, y4);

    return (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) ||
        (d1 == 0 && Game.isOnSegment(x3, y3, x4, y4, x1, y1)) ||
        (d2 == 0 && Game.isOnSegment(x3, y3, x4, y4, x2, y2)) ||
        (d3 == 0 && Game.isOnSegment(x1, y1, x2, y2, x3, y3)) ||
        (d4 == 0 && Game.isOnSegment(x1, y1, x2, y2, x4, y4));
};

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/entity.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    GRAVITY = Settings.gravity;

Game.Entity = Class.extend({
    type: 'Entity',
    drawLayer: 0,
    initialState: 'still',
    states: {
        'still': {
            animation: null,
            actions: null
        }
    },
    changeState: function( state ) {
        if ( state != this.state ) {
            this.state = state;
            this.activeMove = 0;
            this.stateChanged = true;
        }
        this.stateChanged = false;
    },
    init: function( x, y ) {
        this.width = this.width || TILESIZE;
        this.height = this.height || TILESIZE;
        this.ignoreGravity = false;
        this.lastAnimated = Date.now();
        this.activeSprite = this.initialSprite || 'transparent';
        this.visible = true;
        this.sprites = [];
        this.changeState( this.initialState );

        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentSprite,
            rectSize = TILESIZE / 9;

        //Entities should be initialized with an x and y
        if ( x !== null && y !== null ) {
            this.pos = new Game.Vector( x, y );
        } else {
            this.pos = new Game.Vector( 0, 0 );
        }
        this.velocity = new Game.Vector( 0, 0 );
        this.gravity = new Game.Vector( 0, GRAVITY ); // Changed to test collisions

        this.oldPos = this.pos;

        //Iterate through an array of bitmaps and cache them as images
        for ( i in this.bitmaps ) {
            currentSprite = this.bitmaps[ i ];
            tempCanvas = document.createElement( 'canvas' );
            tempCanvas.width = this.width;
            tempCanvas.height = this.height;
            tempContext = tempCanvas.getContext( '2d' );
            for ( j in currentSprite ) {
                for ( k in currentSprite[ j ] ) {
                    tempContext.fillStyle = currentSprite[ j ][ k ];
                    tempContext.fillRect( k * rectSize, j * rectSize, rectSize, rectSize );
                }
            }
            dataURL = tempCanvas.toDataURL( 'image/png' );
            this.sprites.push( Game.Sprite( dataURL, this.type ) );
        }
        Game.drawLayers[this.drawLayer].push( this );
    },
    //Animate method uses the entities dictionary of states
    //and cycles through sprites in each animation
    animate: function() {

        if ( !this.states[ this.state ] ) {
            console.log( 'ERROR ANIMATING', this.state, this.type );
        }

        var animation = this.states[ this.state ].animation,
            oldSprite = this.activeSprite,
            wasVisible = this.visible,
            isVisible;

        if ( typeof animation == 'string' ) {
            this.activeSprite = animation;
        } else if ( animation ) {
            var timeToAnimate = ( Date.now() - this.lastAnimated ) > animation.delta;

            // Get next sprite
            if ( timeToAnimate ) {
                var nextSprite = this.activeSprite;

                this.activeAnimation = this.activeAnimation || 0;
                this.activeAnimation++;
                this.activeAnimation %= animation.sequence.length;
                if ( this.stateChanged ) {
                    this.activeAnimation = 0;
                }
                if ( animation.times == 'infinite' || Math.floor( this.activeAnimation / animation.sequence.length ) < animation.times ) {
                    nextSprite = animation.sequence[ this.activeAnimation % animation.sequence.length ];
                    if ( nextSprite == 'initial' ) {
                        nextSprite = this.activeSprite;
                    } else if ( nextSprite == 'invisible' ) {
                        nextSprite = 'invisible';
                    }
                }

                if ( nextSprite == 'invisible' ) {
                    this.visible = false;
                } else {
                    this.activeSprite = nextSprite;
                    this.visible = true;
                    isVisible = true;
                }

                this.lastAnimated = Date.now();
            }
        }

        //Return a bool to tell invalidRect if the entity animated
        return oldSprite != this.activeSprite || ( !wasVisible && isVisible );
    },
    // Checks dictionary of states for any "actions" and cycles through them if they exist
    // mostly used for enemies - AI
    performAction: function() {
        var actions = this.states[ this.state ].actions,
            actionObj;

        if ( actions ) {
            // Get active action
            this.activeAction = this.activeAction || 0;
            if ( this.stateChanged ) {
                this.activeAction = 0;
            }
            actionObj = actions[ this.activeAction ];

            // Define last action if not defined
            this.lastAction = this.lastAction || Date.now();

            if ( ( Date.now() - this.lastAction ) > actionObj.delta ) {
                if ( actionObj.until ) {
                    if ( actionObj.until.call( this ) ) {
                        this.activeAction++;
                        this.activeAction %= actions.length;
                    } else {
                        actionObj.action.call( this );
                        this.lastAction = Date.now();
                    }
                } else {
                    actionObj.action.call( this );
                    this.lastAction = Date.now();
                }
            }
        }
    },
    say: function( quote ) {
        console.log(quote);
    },
    generateNextCoords: function( timeDiff ) {
        //Bool that will tell us if the entity animated
        this.animated = this.animate( timeDiff );
        this.attached = false;
        this.detached = false;
        this.oldPos = new Game.Vector( this.pos.x, this.pos.y );

        this.performAction();

        //Gravity
        if ( !this.ignoreGravity ) {
            this.applyGravity( timeDiff );
        }

        //Change position based on velocity
        var positionChange = this.velocity.multiply( timeDiff );
        this.pos = this.pos.add( positionChange );
    },
    invalidateRect: function( offsetTop, offsetRight, offsetBottom, offsetLeft ) {
        offsetTop = offsetTop || 0;
        offsetRight = offsetRight || 0;
        offsetBottom = offsetBottom || 0;
        offsetLeft = offsetLeft || 0;

        var newX = this.pos.x,
            newY = this.pos.y,
            oldX = this.oldPos.x,
            oldY = this.oldPos.y,
            width = this.width,
            height = this.height,
            top = oldY <= newY ? oldY + offsetTop : newY + offsetTop,
            left = oldX <= newX ? oldX + offsetLeft : newX + offsetLeft,
            bottom = ( oldY + height ) >= ( newY + height ) ? oldY + height + offsetBottom : newY + height + offsetBottom,
            right = ( oldX + width ) >= ( newX + width ) ? oldX + width + offsetRight : newX + width + offsetRight;

        //Pass a rect (position/dimensions) to the global invalidRect
        Game.invalidateRect( top, right, bottom, left );
    },
    attach: function( arr ) {
        var append = [], entityList;

        // Initialize the entitylist with yourself if necessary
        if ( !this.entityList || !this.entityList.length ) {
            this.entityList = [{
                entity: this,
                relativePos: { x: 0, y: 0 },
                oldDimensions: { width: this.width, height: this.height }
            }];
        }
        // Cache the entityList
        entityList = this.entityList;

        // Convert entity array to have relativePos and append
        for ( var i = 0; i < arr.length; i++ ) {
            var ent = arr[i];
            if ( ent.entity ) {
                ent = ent.entity;
            }
            entityList.push({
                entity: ent,
                relativePos: { x: ent.pos.x - this.pos.x, y: ent.pos.y - this.pos.y },
                oldDimensions: { width: ent.width, height: ent.height }
            });
        }


        this.refreshDimensions();
        this.attached = true;
    },
    detach: function( entity ) {
        if ( this.entityList && this.entityList.length ) {
            var entityList = this.entityList,
                newEntity, newEntityList,
                relativePos;

            for ( var i = entityList.length - 1; i >= 0; i-- ) {
                relativePos = entityList[i].relativePos;
                if ( entityList[i].entity == entity ) {
                    entity.pos = new Game.Vector( this.pos.x + relativePos.x, this.pos.y + relativePos.y );
                    newEntityList = entityList.splice( i + 1, entityList.length - i );
                    entityList.splice( i, 1 );
                    break;
                }
            }

            this.detached = true;
            this.refreshDimensions();

            if ( this.entityList.length <= 1 ) {
                this.entityList = [];
            }

            return newEntityList;
        }
        return [];
    },
    refreshDimensions: function() {
        // Calculate top bottom left and right
        var entityList = this.entityList,
            entity, relativePos,
            top, bottom, left, right,
            entityTop, entityBottom,
            entityLeft, entityRight,
            oldX, oldY;

        for ( var i = 0; i < entityList.length; i++ ) {
            entity = entityList[i].entity;
            relativePos = entityList[i].relativePos;
            dimensions = entityList[i].oldDimensions;

            entityTop = this.pos.y + relativePos.y;
            entityBottom = this.pos.y + relativePos.y + dimensions.height;
            entityLeft = this.pos.x + relativePos.x;
            entityRight = this.pos.x + relativePos.x + dimensions.width;

            if ( top === undefined || entityTop < top ) {
                top = entityTop;
            }
            if ( bottom === undefined || entityBottom > bottom ) {
                bottom = entityBottom;
            }
            if ( left === undefined || entityLeft < left ) {
                left = entityLeft;
            }
            if ( right === undefined || entityRight > right ) {
                right = entityRight;
            }
        }

        for ( var i = 0; i < entityList.length; i++ ) {
            entity = entityList[i].entity;
            relativePos = entityList[i].relativePos;
            oldX = this.pos.x + relativePos.x;
            oldY = this.pos.y + relativePos.y;
            entityList[i].relativePos = { x: oldX - left, y: oldY - top };
        }

        this.height = bottom - top;
        this.width = right - left;
        this.pos.x = left;
        this.pos.y = top;
    },
    getActualDimensions: function() {
        if ( this.entityList && this.entityList.length ) {

            var entityObj = this.entityList[0],
                relativePos = entityObj.relativePos,
                dimensions = entityObj.oldDimensions;

            return {
                pos: {
                    x: this.pos.x + relativePos.x,
                    y: this.pos.y + relativePos.y
                },
                oldPos: {
                    x: this.oldPos.x + relativePos.x,
                    y: this.oldPos.y + relativePos.y
                },
                width: dimensions.width,
                height: dimensions.height
            };

        }

        return this;
    },
    render: function() {
        //Render the activeSprite
        if ( this.visible ) {
            if ( this.entityList && this.entityList.length ) {
                // Iterate over entityList and render them relative to actual position
                for ( var i = 0; i < this.entityList.length; i++ ) {

                    var entity = this.entityList[i].entity,
                        relativePos = this.entityList[i].relativePos;

                    Game.ctx.drawImage( Game.Sprites[ entity.activeSprite ], this.pos.x + relativePos.x - Game.viewportOffset, this.pos.y + relativePos.y );

                }
            } else {
                Game.ctx.drawImage( Game.Sprites[ this.activeSprite ], this.pos.x - Game.viewportOffset, this.pos.y );
            }
        }
    },
    //Two entities -> collision dictionary or false if no collision
    getCollisions: function( entity, self ) {
        self = self || this;
        var src = {
                top: Math.round( self.pos.y ),
                bottom: Math.round( self.pos.y + self.height ),
                left: Math.round( self.pos.x ),
                right: Math.round( self.pos.x + self.width ),
                oldTop: Math.round( self.oldPos.y ),
                oldBototm: Math.round( self.oldPos.y + self.height ),
                oldLeft: Math.round( self.oldPos.x ),
                oldRight: Math.round( self.oldPos.x + self.width ),
                oldCenter: {
                    x: Math.round ( self.oldPos.x + ( self.width / 2 ) ),
                    y: Math.round ( self.oldPos.y + ( self.height / 2 ) ),
                },
                center: {
                    x: Math.round ( self.pos.x + ( self.width / 2 ) ),
                    y: Math.round ( self.pos.y + ( self.height / 2 ) ),
                }
            },
            target = {
                top: Math.round( entity.pos.y ),
                bottom: Math.round( entity.pos.y + entity.height ),
                left: Math.round( entity.pos.x ),
                right: Math.round( entity.pos.x + entity.width ),
                oldTop: Math.round( entity.oldPos.y ),
                oldBototm: Math.round( entity.oldPos.y + entity.height ),
                oldLeft: Math.round( entity.oldPos.x ),
                oldRight: Math.round( entity.oldPos.x + entity.width ),
                oldCenter: {
                    x: Math.round ( entity.oldPos.x + ( entity.width / 2 ) ),
                    y: Math.round ( entity.oldPos.y + ( entity.height / 2 ) ),
                },
                center: {
                    x: Math.round ( entity.pos.x + ( entity.width / 2 ) ),
                    y: Math.round ( entity.pos.y + ( entity.height / 2 ) ),
                }
            },

            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) ||
                ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) ||
                ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAligned = src.left == target.left,
            rightAligned = src.right == target.right,
            leftAndRightAligned = ( leftAligned && rightAligned ),
            topAligned = src.top == target.top,
            bottomAligned = src.bottom == target.bottom,
            topAndBottomAligned = ( topAligned && bottomAligned ),

            movingRight = src.oldRight < src.right,
            movingLeft = src.oldLeft > src.left,
            movingUp = src.oldTop > src.top,
            movingDown = src.oldBottom < src.bottom,

            intersection = Game.checkIntersection( src.oldCenter, src.center, target.oldCenter, target.center ),

            skipRight = ( betweenTopAndBottom || topAndBottomAligned ) && src.right < target.left && 
                ( src.left > target.oldRight || src.right >= target.oldLeft ),
            skipLeft = ( betweenTopAndBottom || topAndBottomAligned ) && src.left > target.right && 
                ( src.right < target.oldLeft || src.left <= target.oldRight ),
            skipDown = ( betweenLeftAndRight || leftAndRightAligned ) && src.bottom < target.top && 
                ( src.top > target.oldBottom || src.bottom >= target.oldTop ),
            skipUp = ( betweenLeftAndRight || leftAndRightAligned ) && src.top > target.bottom && 
                ( src.bottom < target.oldTop || src.top <= target.oldBottom ),

            // The problem with only allowing collisions when self is moving, is that what happens when
            // self is NOT moving and it gets hit? The offending entity must be able to handle 
            // the behavior of self too!
            collisions = {
                exact: leftAndRightAligned && topAndBottomAligned,
                almostExact: leftAligned && topAndBottomAligned || rightAligned && topAndBottomAligned ||
                    topAligned && leftAndRightAligned || bottomAligned && leftAndRightAligned,
                overlapping: ( betweenTopAndBottom || topAligned || bottomAligned ) && ( betweenLeftAndRight || leftAligned || rightAligned ),
                overlappingVertical: leftAndRightAligned && ( betweenTopAndBottom || skipDown || skipUp ),
                overlappingHorizontal: topAndBottomAligned && ( betweenLeftAndRight || skipRight || skipLeft )
            };

        if ( !intersection && self.oldPos.x == self.pos.x && self.oldPos.y == self.pos.y ) {
            if ( target.oldTop <= target.top ) {
                intersection = Game.checkIntersection( { x: self.pos.x, y: self.pos.y },
                        { x: self.pos.x + self.width, y: self.pos.y + self.height },
                        target.oldCenter, target.center );
            } else {
                intersection = Game.checkIntersection( { x: self.pos.x + self.width, y: self.pos.y },
                        { x: self.pos.x, y: self.pos.y + self.height },
                        target.oldCenter, target.center );
            }

            if ( !collisions.overlapping ) {
                collisions.overlapping = ( betweenTopAndBottom && betweenLeftAndRight ) || intersection
            }
        }

        // If there are any collisions we build an object of only those that are true
        // If none, we return false
        var returnCollisions = {},
            count = 0;
        for ( var i in collisions ) {
            if ( collisions[i] ) {
                returnCollisions.entity = entity;
                returnCollisions[i] = collisions[i];
                count++;
            }
        }
        if ( count ) {
            return returnCollisions;
        }

        return false;
    },
    getAdjacents: function( entity ) {
        var src = {
                top: Math.round( this.oldPos.y ),
                bottom: Math.round( this.oldPos.y + this.height ),
                left: Math.round( this.oldPos.x ),
                right: Math.round( this.oldPos.x + this.width ),
            },
            target = {
                top: Math.round( entity.oldPos.y ),
                bottom: Math.round( entity.oldPos.y + entity.height ),
                left: Math.round( entity.oldPos.x ),
                right: Math.round( entity.oldPos.x + entity.width )
            },
            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) ||
                ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) ||
                ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAligned = src.left == target.left,
            rightAligned = src.right == target.right,
            leftAndRightAligned = ( leftAligned && rightAligned ),
            topAligned = src.top == target.top,
            bottomAligned = src.bottom == target.bottom,
            topAndBottomAligned = ( topAligned && bottomAligned ),
            directions = {
                exact: leftAndRightAligned && topAndBottomAligned,
                top: ( betweenLeftAndRight || leftAligned || rightAligned ) && src.top == target.bottom,
                bottom: ( betweenLeftAndRight || leftAligned || rightAligned ) && src.bottom == target.top,
                left: ( betweenTopAndBottom || topAligned || bottomAligned ) && src.left == target.right,
                right: ( betweenTopAndBottom || topAligned || bottomAligned ) && src.right == target.left
            };
        // If there are any entities adjacent, we build an object of only those that are true
        // If none, we return false
        var returnDirections = {},
            count = 0;
        for ( var i in directions ) {
            if ( directions[i] ) {
                returnDirections.entity = entity;
                returnDirections[i] = directions[i];
                count++;
            }
        }
        if ( count ) {
            return returnDirections;
        }
        return false;
    },
    //Checks all entities for collision with a specific type
    hasCollisionWith: function( entityType ) {
        var i = 0, collisions;
        for ( ; i < Game.currentLevel.entities.length; i++ ) {
            entity = Game.currentLevel.entities[i];
            collisions = this.getCollisions( entity );
            if ( collisions && entity.type == entityType ) {
                return collisions;
            }
        }
        return false;
    },
    adjacentTo: function( entityType, direction ) {
        var i = 0, directions,
            top, bottom, left, right;
        for ( ; i < Game.currentLevel.entities.length; i++ ) {
            entity = Game.currentLevel.entities[i];
            if ( entity.type == entityType ) {
                directions = this.getAdjacents( entity );
                if ( direction ) {
                    if ( directions && direction in directions ) {
                        return directions;
                    }
                } else if ( directions ) {
                    return directions;
                }
            }
        }
        return false;
    },
    adjacentToLevelEdge: function( direction ) {
        switch( direction ) {
            case 'left':
                return this.pos.x <= 0;
            case 'right':
                return ( this.pos.x + this.width ) >= Game.currentLevel.width;
            case 'top':
                return this.pos.y <= 0;
                break;
            case 'bottom':
                return ( this.pos.y + this.height ) >= Game.currentLevel.height;
                break;
            default: return false;
        }
    },
    below: function( type ) {
        var entities = Game.currentLevel.entities,
            i, j, entity;

        for ( i = 0; i < entities.length; i++ ) {
            entity = entities[i];
            if ( entity.entityList ) {
                for ( j = 0; j < entities[i].entityList.length; j++ ) {
                    entity = entities[i].entityList[j];
                    if ( entity.type == type && entity.pos.y < this.pos.y && this.pos.x == this.pos.y ) {
                        return true;
                    }
                }
            } else {
                if ( entity.type == type && entity.pos.y < this.pos.y && this.pos.x == this.pos.y ) {
                    return true;
                }
            }
        }

        return false;
    },
    //Collision handler -> to be extended by derived entities
    //By default entities stop moving when they hit land
    collideWith: function( entity, collisionTypes ) {
        switch ( entity.type ) {
            case 'Terrain.Trapdoor':
            case 'Terrain.Land':
                if ( this.velocity.y > 0 && collisionTypes ) {
                    this.velocity.y = 0;
                    if ( this.oldPos.y % TILESIZE == 0 ) {
                        this.pos.y = this.oldPos.y;
                    } else {
                        this.pos.y = entity.pos.y - this.height;
                    }
                }
                if ( this.velocity.y < 0 && collisionTypes ) {
                    this.velocity.y = 0;
                    this.pos.y = entity.pos.y + this.height;
                }
                break;
            default: break;
        }
    },
    applyGravity: function( timeDiff ) {
        if ( !this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            var gravitationalForce = this.gravity.multiply( timeDiff );
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/level.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize;

var bl = 'blank',
    ld = 'terrain.land',
    wt = 'terrain.water',
    wv = 'terrain.wave',
    hm = 'hero.man',
    hb = 'hero.boat',
    hp = 'hero.plane',
    mn = 'enemy.monster',
    cm = 'enemy.monster.cautious',
    sp = 'enemy.spider',
    bd = 'enemy.bird',
    bs = 'enemy.battleship',
    ba = 'enemy.balloon',
    tr = 'enemy.turret',
    mc = 'machine',
    co = 'interactable.coin',
    ht = 'interactable.heart',
    rk = 'interactable.rock',
    td = function( id ) {
        return 'terrain.trapdoor(' + id + ')';
    },
    sw = function( id ) {
        return 'interactable.switch[6](' + id + ')';
    }

Game.Level = Class.extend({
    init: function( type, title, next, grid, scene, walkthroughs ) {
        var ents = {},
            i, j, entity;

        this.entities = [];
        this.title = title;
        this.type = type;
        this.width = TILESIZE * grid[0].length;
        this.height = TILESIZE * grid.length;
        this.next = next;
        this.grid = grid;
        this.scene = scene;
        this.walkthroughs = walkthroughs
        for ( i in this.grid ) {
            for ( j in this.grid[ i ] ) {
                entity = this.grid[ i ][ j ];
                if ( !( entity in ents ) ) {
                    ents[ entity ] = entity;
                    this.entityCount++;
                }
            }
        }
    },
    loadNextLevel: function() {
        if ( this.next ) {
            Game.stop();
            Game.init( this.next );
        }
    }
});

Game.Levels = {
    'impressionism': new Game.Level( 'land', 'Impressionism', 'irontown', [
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, tr, ld ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mn, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, ld, ld ],
        [ bl, bl, bl, bl, bl, bl, ht, bl, cm, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, tr, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, ld, ld, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, ld, ld, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mn, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, ld, bl, bl, bl, mn, ld, bl, bl, bl, bl, bl, bl, bl, mn, bl, bl, bl, mn, bl, bl, bl, tr, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mn, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, rk, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, tr, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, tr, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, mn, bl, bl, mn, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mc, bl ],
        [ hm, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, mn, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, wv, wv, wv, wv, bl, bl, rk, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, tr, bl, bl, bl, bl, mn, bl, mn, bl, mn, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, tr, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, tr, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, wt, wt, wt, wt, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld ]
    ], undefined, Game.Walkthroughs[ 'intro' ] ),
    'the-cliffs-of-magnitude': new Game.Level( 'land', 'The Cliffs of Magnitude', 'fade-to-black', [
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, ld, ld, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, mc, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, ld, ld, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, ld, ld ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, ld, ht, bl, bl, bl, bl, ld, ld, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ht, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl ],
        [ mc, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl ],
        [ hm, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ]
    ]),
    'fade-to-black': new Game.Level( 'land', 'Fade to Black', null, [
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, mn, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mn, ld, ld, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, ld, td(1), ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, ld, ld, ld, bl, bl, sp, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, rk, bl, bl, sw(2), bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, td(2), td(2) ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, sp, bl, ld, bl, bl, bl, bl, sp, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, ld, bl, bl, bl, bl, ld, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bd, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, cm, bl, bl, cm, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl ],
        [ bl, bl, bl, bl, bl, bl, bl, ld, ld, td(3), td(3), td(3), ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl ],
        [ mc, bl, bl, bl, bl, bl, bl, ld, bl, bl, bl, bl, sp, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, mc, bl ],
        [ hm, bl, rk, sw(3), bl, bl, bl, ld, ht, bl, bl, bl, bl, mn, bl, ld, ld, ld, bl, bl, bl, bl, ld, ld, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, mn, bl, mn, bl, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, sw(1), bl, wv, wv, wv, wv, wv, bl, bl, tr, bl, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, bl, bl, bl ],
        [ ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, wt, wt, wt, wt, wt, ld, ld, ld, ld, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, ld, bl, bl, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld, ld ]
    ])
};

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/hero.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    PLANE_TAKEOFF_VELOCITY = Settings.planeTakeoffVelocity,
    TRANSFORM_ANIMATION_DURATION = Settings.transformAnimationDuration,
    LEFT_KEY = Settings.leftKey,
    RIGHT_KEY = Settings.rightKey,
    DOWN_KEY = Settings.downKey,
    UP_KEY = Settings.upKey,
    ACTION_KEY = Settings.actionKey,
    JUMP_KEY = Settings.jumpKey,
    PAUSE_KEY = Settings.pauseKey,
    ENTER_KEY = Settings.enterKey,
    TAKING_DAMAGE_DURATION = Settings.takingDamageDuration,
    MAN_JUMP_VELOCITY = Settings.manJumpVelocity,
    BLOCK_JUMP_VELOCITY = Settings.blockJumpVelocity,
    ROCK_THROW_VELOCITY = Settings.rockThrowVelocity,
    BOAT_BULLET_SPEED = Settings.boatBulletSpeed,
    BOAT_BULLET_RELOAD_RATE = Settings.boatBulletReloadRate,
    PLANE_BULLET_SPEED = Settings.planeBulletSpeed,
    PLANE_BULLET_RELOAD_RATE = Settings.planeBulletReloadRate,
    PLANE_HORIZONTAL_VELOCITY = Settings.planeHorizontalVelocity,
    PLANE_LANDING_VELOCITY = Settings.planeLandingVelocity,
    PLANE_TAKEOFF_VELOCITY = Settings.planeTakeoffVelocity,
    TAKING_DAMAGE_DURATION = Settings.takingDamageDuration,
    FROG_GRAVITY = Settings.frogGravity,
    FROG_JUMP_VELOCITY = Settings.frogJumpVelocity,
    FROG_TONGUE_VELOCITY = Settings.frogTongueVelocity,
    JELLYFISH_GRAVITY = Settings.jellyfishGravity,
    CLOCK_STOP_DURATION = Settings.clockStopDuration,
    CLOCK_STOP_COOLDOWN = Settings.clockStopCooldown,
    CLOCK_JUMP_VELOCITY = Settings.clockJumpVelocity,
    FLAME_JUMP_VELOCITY = Settings.flameJumpVelocity;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    drawLayer: 4,
    states: {
        'blinking': {
            animation: {
                delta: 70,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            }
        },
        'transforming': {
            animation: {
                delta: 80,
                sequence: [ 'hero-scramble-1', 'hero-scramble-2', 'hero-scramble-3', 'hero-scramble-4', 'hero-scramble-5' ],
                times: 'infinite'
            }
        },
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'hero-dying-1', 'hero-dying-2', 'hero-dying-3', 'hero-dying-4', 'hero-dying-5', 'hero-dying-6', 'hero-dying-7', 'hero-dying-8', 'hero-dying-9' ],
                times: 1
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.direction = 'right';
    },
    right: function() {
        this.direction = 'right';
        if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
            this.pos.x += TILESIZE;
        }
    },
    left: function() {
        this.direction = 'left';
        if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
            this.pos.x -= TILESIZE;
        }
    },
    up: function() {},
    down: function() {},
    transform: function( newType ) {
        var self = this;
        if ( this.__proto__ == newType.prototype ) {
            Game.doneTransforming();
            this.skipAction = false;
        } else {
            this.changeState( 'transforming' );
            setTimeout( function() {
                var oldX = self.pos.x,
                    newHero = new newType( self.pos.x, self.pos.y ),
                    machine, wave, type;

                // Destroy old hero
                Game.destroyEntity( self );
                for ( var i = 0; i < Game.drawLayers[ self.drawLayer ]; i++ ) {
                    if ( Game.drawLayers[ self.drawLayer ] == self ) {
                        Game.drawLayers[ self.drawLayer ].splice( i, 1 );
                        break;
                    }
                }

                Game.currentLevel.entities.push( newHero );
                Game.drawLayers[ newHero.drawLayer ].push( newHero );
                Game.hero = newHero;
                newHero.skipAction = false;

                machine = newHero.hasCollisionWith( 'Machine' );
                if ( machine ) {
                    machine = machine.entity;
                    type = newHero.type;
                    if ( type == 'Hero.Boat' || type == 'Hero.Jellyfish' ) {
                        wave = machine.adjacentTo( 'Terrain.Wave' );
                        if ( wave ) {
                            wave = wave.entity;
                            newHero.pos = new Game.Vector( wave.pos.x, wave.pos.y );
                        } else {
                            newHero.pos.x = oldX + machine.width;
                            if ( newHero.hasCollisionWith( 'Terrain.Land' ) ) {
                                newHero.pos.x = oldX;
                            }
                        }
                    } else if ( type == 'Hero.Plane' ) {
                        if ( !newHero.below( 'Terrain.Land' ) ) {
                            Game.keysLocked = true;
                            newHero.velocity.y = PLANE_TAKEOFF_VELOCITY;
                        }
                    } else {
                        wave = newHero.adjacentTo( 'Terrain.Water', 'bottom' );
                        if ( wave ) {
                            land = machine.adjacentTo( 'Terrain.Land', 'bottom' ) || machine.adjacentTo( 'Terrain.Land', 'left' );
                            if ( land ) {
                                land = land.entity;
                                newHero.pos = new Game.Vector( land.pos.x, land.pos.y - newHero.height );
                            }
                        }
                    }
                }

                Game.doneTransforming();
            }, TRANSFORM_ANIMATION_DURATION );
        }
    },
    //Handling user input
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.keysLocked ) {
            if ( !Game.keysLocked && !this.doNotMove && LEFT_KEY in Game.keysDown && Game.keysDown[ LEFT_KEY ] != 'locked' ) { // LEFT
                this.left();
                Game.keysDown[ LEFT_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && RIGHT_KEY in Game.keysDown && Game.keysDown[ RIGHT_KEY ] != 'locked' ) { // RIGHT
                this.right();
                Game.keysDown[ RIGHT_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && UP_KEY in Game.keysDown && Game.keysDown[ UP_KEY ] != 'locked' ) { // UP
                this.up();
                Game.keysDown[ UP_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) { // UP
                this.up();
                Game.keysDown[ JUMP_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && DOWN_KEY in Game.keysDown && Game.keysDown[ DOWN_KEY ] != 'locked' ) { // UP
                this.down();
                Game.keysDown[ DOWN_KEY ] = 'locked';
            }
            if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) { // SPACE
                var adjacent = this.adjacentTo( 'Terrain.Sign' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openSign( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Kid' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Man' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Monster' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                } else {
                    var collisions = this.hasCollisionWith( 'Machine' );
                    if ( collisions && this.pos.x == collisions.entity.pos.x ) {
                        var opened = Game.openTransformMenu();
                        if ( opened ) {
                            this.skipAction = true;
                        }
                    }
                }
            }
        }
        //Lose health and blink when hitting an enemy
        //When in blinking state cannot take more damage
        //TODO - don't use setTimeout
        if ( this.takingDamage && this.takingDamage != 'locked' ) {
            var hero = this;
            var oldState = this.state;
            Game.Inventory.decrementHealth();
            if ( Game.Inventory.health > 0 ) {
                this.changeState( 'blinking' );
                this.takingDamage = 'locked';
            } else {
                this.changeState( 'dying' );
            }
            setTimeout( function() {
                hero.takingDamage = false;
                hero.changeState( oldState );
                hero.visible = true;
            }, TAKING_DAMAGE_DURATION );
        }

        var adj = this.adjacentTo( 'Terrain.Land' );
        if ( adj.exact ) {
            this.pos.y = adj.entity.pos.y - adj.entity.height;
        }

        if ( ( this.activeSprite == 'hero-dying-9' || this.activeSprite == 'flame-dying-9' ) && !Game.godMode ) {
            this.visible = false;
            Game.destroyEntity( this );
            Game.gameOver();
        }

        if ( this.pos.y > Game.viewportHeight ) {
            this.visible = false;
            Game.destroyEntity( this );
            Game.gameOver();
        }
    },
    collideWith: function( entity, collisionTypes ) {
        var entityType = entity.type;
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( this.velocity.y > 0 ) {
                    this.disableJump = false;
                }
                break;
            case 'Interactable.Heart':
                Game.destroyEntity( entity );
                Game.Inventory.incrementHealth();
                break;
            case 'Interactable.Coin':
                Game.destroyEntity( entity );
                Game.Inventory.incrementCurrency();
                break;
            case 'Terrain.Portal':
                Game.switchLevel( entity.toLevel );
                break;
            case 'Terrain.Water':
                if ( this.type != 'Hero.Jellyfish' && this.type != 'Hero.Boat' ) {
                    Game.destroyEntity( this );
                    Game.gameOver();
                }
                break;
            default: break;
        }

        var hit = ( entityType.indexOf( 'Enemy' ) == 0 && !( this.type == 'Hero.Block' && this.oldPos.y < entity.pos.y ) ) || ( entityType == 'Interactable.Egg' && entity.oldPos.y < this.pos.y );

        // If the here is hit, not dying, not already taking and not "holding" anything
        // e.g. a rock should protect him
        if ( hit && entity.state != 'dying' && this.takingDamage != 'locked' && !this.holding ) {
            this.takingDamage = true;
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    initialSprite: 'man-right',
    initialState: 'walking',
    init: function( x, y ) {
        this.jumpVelocity = MAN_JUMP_VELOCITY;
        this._super( x, y );
    },
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            if ( this.holding ) {
                this.actions.throw.call( this );
                Game.keysDown[ ACTION_KEY ] = 'locked';
            } else {
                var adjacent = this.adjacentTo( 'Interactable.Rock' ),
                    collision = this.hasCollisionWith( 'Interactable.Rock' );

                if ( adjacent ) {
                    this.actions.pickup.call( this, adjacent.entity );
                    Game.keysDown[ ACTION_KEY ] = 'locked';
                } else if ( collision ) {
                    this.actions.pickup.call( this, collision.entity );
                    Game.keysDown[ ACTION_KEY ] = 'locked';
                }
            }
        }
	
        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    right: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = 'man-holding-right';
        } else {
            this.activeSprite = 'man-right';
        }
    },
    left: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = 'man-holding-left';
        } else {
            this.activeSprite = 'man-left';
        }
    },
    up: function() {
        //jump
        if ( this.activeSprite.match( 'holding' ) ) {
            this.actions.drop.call( this );
        } else if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, this.jumpVelocity );
            this.velocity = this.velocity.add( jumpForce );
        }
    },
    //Interacting with rock
    actions: {
        pickup: function( entity ) {
            this.holding = entity;
            entity.pos.y = this.pos.y - entity.height;
            entity.pos.x = this.pos.x;
            if ( this.direction == 'right' ) {
                this.activeSprite = 'man-holding-right';
                this.invalidateRect( 0, 0 + TILESIZE, 0, 0 );
            } else if ( this.direction == 'left' ) {
                this.activeSprite = 'man-holding-left';
                this.invalidateRect( 0, 0, 0, 0 - TILESIZE );
            }

            this.attach( [ entity ] );
            Game.destroyEntity( entity );
        },
        throw: function() {
            this.detach( this.holding );

            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.holding.drawLayer ].push( this.holding );

            if ( this.direction == 'right' ) {
                this.holding.velocity.x = ROCK_THROW_VELOCITY;
                this.activeSprite = 'man-right';
            } else {
                this.holding.velocity.x = 0 - ROCK_THROW_VELOCITY;
                this.activeSprite = 'man-left';
            }
            this.holding.velocity.y = this.jumpVelocity;

            this.holding = false;
        },
        drop: function() {
            var rightLand = this.adjacentTo( 'Terrain.Land', 'right' ),
                leftLand = this.adjacentTo( 'Terrain.Land', 'left' );

            this.detach( this.holding );
            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.holding.drawLayer ].push( this.holding );

            if ( this.direction == 'right' ) {
                if ( !rightLand ) {
                    this.holding.pos.x = this.pos.x + this.width;
                    this.invalidateRect( 0, 0 + TILESIZE, 0, 0 );
                } else {
                    this.holding.pos.x = this.pos.x;
                }
                this.holding.pos.y = this.pos.y;
                this.activeSprite = 'man-right';
                this.holding = false;
            } else {
                if ( !leftLand ) {
                    this.holding.pos.x = this.pos.x - this.holding.width;
                    this.invalidateRect( 0, 0, 0, 0 - TILESIZE );
                } else {
                    this.holding.pos.x = this.pos.x;
                }
                this.holding.pos.y = this.pos.y;
                this.activeSprite = 'man-left';
                this.holding = false;
            }
        }
    }
});

Game.Entity.Hero.Block = Game.Entity.Hero.extend({
    type: 'Hero.Block',
    initialSprite: 'block',
    initialState: 'walking',
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    up: function() {
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, BLOCK_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    }
});

Game.Entity.Hero.Boat = Game.Entity.Hero.extend({
    type: 'Hero.Boat',
    initialSprite: 'boat-right',
    initialState: 'sailing',
    bulletSpeed: BOAT_BULLET_SPEED,
    bulletInterval: BOAT_BULLET_RELOAD_RATE,
    lastFired: Date.now(),
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'sailing': { animation: null, actions: null }
    },
    right: function() {
        this._super();
        this.activeSprite = 'boat-right';
    },
    left: function() {
        this._super();
        this.activeSprite = 'boat-left';
    },
    collideWith: function( entity, collisionTypes ) {
        this._super( entity, collisionTypes );
        if ( entity.type == 'Terrain.Water' ) {
            this.velocity.y = 0;
            this.pos.y = entity.pos.y - entity.height;
        } else if ( entity.type == 'Machine' ) {
            this.pos = new Game.Vector( entity.pos.x, entity.pos.y + entity.height - this.height );
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shoot();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( !this.skipAction && !Game.keysLocked && JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) {
            this.lockTarget();
            Game.keysDown[ JUMP_KEY ] = 'locked';
        }

        if ( this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.doNotMove = true;
        } else {
            this.doNotMove = false;
        }
    },
    shoot: function() {
        var xVelocity = this.bulletSpeed;
        if ( this.direction == 'right' ) {
            xVelocity = 0 - xVelocity;
        }
        if ( ( Date.now() - this.lastFired ) > this.bulletInterval ) {
            this.createBullet( this.pos.x, this.pos.y + ( TILESIZE / 9 ) * 5, xVelocity, 0 );
            this.lastFired = Date.now();
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    lockTarget: function() {
        if ( this.direction == 'right' ) {
            this.locked = this.locked || this;
            for ( var i = 0; i < Game.currentLevel.entities.length; i++ ) {
                entity = Game.currentLevel.entities[i];
                if ( entity.type.indexOf( 'Enemy' ) === 0 && entity.type.indexOf( 'Bullet' ) == -1 && entity.pos.x > this.locked.pos.x ) {
                    this.locked = entity;
                    break;
                }
            }
        } else {
        }
    },
    applyGravity: function( timeDiff ) {
        if ( !this.adjacentTo( 'Terrain.Water', 'bottom' ) && !this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            var gravitationalForce = this.gravity.multiply( timeDiff );
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});

Game.Entity.Hero.Frog = Game.Entity.Hero.extend({
    type: 'Hero.Frog',
    initialSprite: 'frog-right',
    initialState: 'still',
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'jumping': {},
        'licking': {},
        'licking-jumping': {},
    },
    init: function( x, y ) {
        this._super( x, y );
        this.gravity = new Game.Vector( 0, FROG_GRAVITY );
    },
    up: function() {
        if ( !this.disableJump ) {
            this.changeState( 'jumping' );
            var jumpForce = new Game.Vector( 0, FROG_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
            if ( this.direction == 'right' ) {
                this.activeSprite = 'frog-right-jump';
            }
            if ( this.direction == 'left' ) {
                this.activeSprite = 'frog-left-jump';
            }
        }
    },
    right: function() {
        this._super();
        switch ( this.state ) {
            case 'jumping':
                this.activeSprite = 'frog-right-jump';
                if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
                    this.pos.x += TILESIZE;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x -= TILESIZE;
                }
                break;
            case 'licking':
                this.activeSprite = 'frog-right-lick';
                break;
            case 'still':
                this.activeSprite = 'frog-right';
                break;
            default: break;
        }
    },
    left: function() {
        this._super();
        switch ( this.state ) {
            case 'jumping':
                this.activeSprite = 'frog-left-jump';
                if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
                    this.pos.x -= TILESIZE;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x += TILESIZE;
                }
                break;
            case 'licking':
                this.activeSprite = 'frog-left-lick';
                break;
            case 'still':
                this.activeSprite = 'frog-left';
                break;
            default: break;
        }
    },
    lick: function() {
        var tongue, rectSize = TILESIZE / 9,
            x = this.pos.x + this.width - rectSize * 4,
            y = this.pos.y + rectSize * 4,
            velocity = this.direction == 'left' ? 0 - FROG_TONGUE_VELOCITY : FROG_TONGUE_VELOCITY;

        if ( this.state.indexOf( 'licking' ) == -1 ) {
            if ( this.state == 'jumping' ) {
                this.changeState( 'licking-jumping' );
            } else {
                this.changeState( 'licking' );
            }
            if ( this.direction == 'left' ) {
                x = this.pos.x - rectSize * 4;
            }
            var tongue = new Game.Entity.Interactable.Tongue( x, y, this, velocity );
            Game.currentLevel.entities.push( tongue );
        }
    },
    doneLicking: function() {
        if ( this.state == 'licking-jumping' ) {
            this.activeSprite = this.direction == 'left' ? 'frog-left-jump' : 'frog-right-jump';
            this.changeState( 'jumping' );
        } else {
            this.activeSprite = this.direction == 'left' ? 'frog-left' : 'frog-right';
            this.changeState( 'still' );
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }

        if ( this.state == 'jumping' && this.adjacentTo('Terrain.Land','bottom') && this.velocity.y >= 0 ) {
            this.changeState( 'still' );
            this.activeSprite = this.direction == 'left' ? 'frog-left' : 'frog-right';
            this.invalidateRect();
        }

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.lick();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }
    }
});

Game.Entity.Hero.Plane = Game.Entity.Hero.extend({
    type: 'Hero.Plane',
    initialSprite: 'plane-right',
    initialState: 'still',
    bulletSpeed: PLANE_BULLET_SPEED,
    bulletInterval: PLANE_BULLET_RELOAD_RATE,
    lastFired: Date.now(),
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming
    },
    init: function( x, y ) {
        this._super( x, y );
        this.beginLandingSequence = true;
        this.ignoreGravity = true;
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shoot();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( Game.viewportOffset >= Game.viewportShiftBuffer && this.beginLandingSequence ) {
            this.velocity.x = PLANE_HORIZONTAL_VELOCITY;
            this.beginLandingSequence = false;
        }
    },
    up: function() {
        if ( !this.adjacentTo( 'Terrain.Land', 'top' ) && !this.adjacentToLevelEdge( 'top' ) ) {
            this.pos.y -= TILESIZE;
        }
    },
    down: function() {
        if ( !this.adjacentTo( 'Terrain.Land', 'bottom' ) && !this.adjacentToLevelEdge( 'bottom' ) ) {
            this.pos.y += TILESIZE;
        }
    },
    left: function() {
        if ( this.pos.x - TILESIZE >= Game.viewportOffset && !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
            this.pos.x -= TILESIZE;
        }
    },
    right: function() {
        if ( ( this.pos.x + TILESIZE < Game.viewportOffset + Game.viewportWidth ) && !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
            this.pos.x += TILESIZE;
        }
    },
    shoot: function() {
        var xVelocity = this.bulletSpeed;
        if ( ( Date.now() - this.lastFired ) > this.bulletInterval ) {
            this.createBullet( this.pos.x + this.width, this.pos.y + ( TILESIZE / 9 ) * 5, xVelocity, 0 );
            this.lastFired = Date.now();
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    collideWith: function( entity, collisions ) {
        this._super( entity, collisions );

        if ( entity.type == 'Terrain.Invisible' ) {
            this.pos.x = entity.pos.x - this.width;
            this.velocity.x = 0;
            this.velocity.y = PLANE_LANDING_VELOCITY;
        }
    }
});

Game.Entity.Hero.Jellyfish = Game.Entity.Hero.extend({
    type: 'Hero.Jellyfish',
    initialSprite: 'jellyfish',
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( Game.currentLevel.type == 'sea' ) {
            this.gravity = new Game.Vector( 0, JELLYFISH_GRAVITY ); // Changed to test collisions
        }

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shock();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }
    },
    shock: function() {
        var lightning;

        lightning = new Game.Entity.Interactable.Lightning( this.pos.x - TILESIZE, this.pos.y - TILESIZE, this );
        Game.currentLevel.entities.push( lightning );
    },
    up: function() {
        this.pos.y -= this.height;
        this.velocity.y = 0;
    }
});

Game.Entity.Hero.Clock = Game.Entity.Hero.extend({
    type: 'Hero.Clock',
    initialSprite: 'clock-1',
    initialState: 'ticking',
    timeStopDuration: CLOCK_STOP_DURATION,
    coolDown: CLOCK_STOP_COOLDOWN,
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'ticking': {
            animation: {
                delta: 400,
                sequence: [ 'clock-1', 'clock-2', 'clock-3', 'clock-4', 'clock-5', 'clock-6', 'clock-7', 'clock-8' ],
                times: 'infinite'
            }
        }
    },
    stopTime: function() {
        var self = this,
            oldState = this.state;

        Game.transforming = true;
        this.timeStopped = true;
        this.changeState( 'still' );

        setTimeout(function() {
            Game.transforming = false;
            self.timeStopped = false;
            self.changeState( oldState );
        }, this.timeStopDuration);
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.timeStopped && !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.stopTime();
        }

        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    up: function() {
        //jump
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, CLOCK_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
        }
    }
});

Game.Entity.Hero.Flame = Game.Entity.Hero.extend({
    type: 'Hero.Flame',
    initialSprite: 'flame-small',
    initialState: 'still',
    states: {
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'melting': {},
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'flame-dying-1', 'flame-dying-2', 'flame-dying-3', 'flame-dying-4', 'flame-dying-5', 'flame-dying-6', 'flame-dying-7', 'flame-dying-8', 'flame-dying-9' ],
                times: 1
            }
        }
    },
    meltStuff: function() {
        if ( this.state != 'melting' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.activeSprite = 'flame-big';
            this.changeState( 'melting' );
            this.animated = true;
            this.heat = new Game.Entity.Interactable.Heat( this.pos.x - 2 * TILESIZE, this.pos.y - 2 * TILESIZE, this );
            Game.currentLevel.entities.push( this.heat );
            this.doNotMove = true;
        }
    },
    stopMelting: function() {
        this.activeSprite = 'flame-small';
        this.changeState( 'still' );
        this.animated = true;
        Game.destroyEntity( this.heat );
        this.heat = null;
        this.doNotMove = false;
    },
    generateNextCoords: function( timeDiff) {
        this._super( timeDiff );

        if ( !this.skipAction && ACTION_KEY in Game.keysDown ) {
            this.meltStuff();
        } else {
            if ( this.state == 'melting' ) {
                this.stopMelting();
            }
        }

        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    up: function() {
        //jump
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, FLAME_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
        }
    }
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/enemy.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    TURRET_INTERVAL = Settings.turretInterval,
    QUICK_TURRET_INTERVAL = Settings.quickTurretInterval,
    SMART_TURRET_INTERVAL = Settings.smartTurretInterval,
    TURRET_SPEED = Settings.turretSpeed,
    QUICK_TURRET_SPEED = Settings.quickTurretSpeed,
    SMART_TURRET_SPEED = Settings.smartTurretSpeed,
    SUBMARINE_SPEED = Settings.submarineSpeed,
    BALLOON_SPEED = Settings.balloonSpeed,
    BATTLESHIP_SPEED = Settings.battleshipSpeed,
    BIRD_VELOCITY = Settings.birdVelocity,
    SPIDER_VELOCITY = Settings.spiderVelocity,
    SPIDER_CLIMBING_VELOCITY = Settings.spiderClimbingVelocity,
    BALLOON_HORIZONTAL_VELOCITY = Settings.balloonHorizontalVelocity,
    BALLOON_VERTICAL_VELOCITY = Settings.balloonVerticalVelocity,
    BALLOON_VERTICAL_BOUNDARY = Settings.balloonVerticalBoundary,
    MONSTER_WALKING_INTERVAL = Settings.monsterWalkingInterval;

Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    drawLayer: 3,
    states: {
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'enemy-dying-1', 'enemy-dying-2', 'enemy-dying-3', 'enemy-dying-4', 'enemy-dying-5', 'enemy-dying-6', 'enemy-dying-7', 'enemy-dying-8', 'enemy-dying-9' ],
                times: 1
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
    },
    collideWith: function( entity, collisionTypes ) {
        if ( ( entity.type == 'Interactable.Rock' && ( entity.velocity.x > 0 || entity.velocity.y > 0 ) && collisionTypes )
            || ( entity.type == 'Hero.Block' && entity.velocity.y > 0 && entity.oldPos.y < this.pos.y )
            || ( entity.type == 'Hero.Clock' && entity.velocity.y > 0 && entity.oldPos.y < this.pos.y )
            || entity.type == 'Interactable.Bullet' || entity.type == 'Interactable.Tongue' || entity.type == 'Interactable.Lightning' || entity.type == 'Interactable.Heat' ) {

            this.changeState( 'dying' );
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Enemy.Turret = Game.Entity.Enemy.extend({
    type: 'Enemy.Turret',
    bulletSpeed: TURRET_SPEED,
    initialSprite: 'turret',
    rightSprite: 'turret',
    leftSprite: 'turret',
    initialState: 'shooting',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'shooting': {
            animation: null,
            actions: [{
                delta: TURRET_INTERVAL,
                action: function() { this.shoot(); }
            }]
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.lastShot = Date.now();
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.activeSprite == 'enemy-dying-9' ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    },
    lockTarget: function() {
        var heroX = Game.hero.pos.x,
            myX = this.pos.x;

        if ( heroX > myX ) {
            this.activeSprite = this.rightSprite;
            this.direction = 'right';
        } else if ( heroX < myX ) {
            this.activeSprite = this.leftSprite;
            this.direction = 'left';
        }
        this.animated = true;
    },
    shoot: function() {
        this.createBullet( this.pos.x, this.pos.y, this.bulletSpeed, 0 );
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Enemy.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    }
});

Game.Entity.Enemy.Turret.Quick = Game.Entity.Enemy.Turret.extend({
    bulletSpeed: QUICK_TURRET_SPEED,
    initialSprite: 'turret-quick-left',
    rightSprite: 'turret-quick-right',
    leftSprite: 'turret-quick-left',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'shooting': {
            animation: null,
            actions: [{
                delta: QUICK_TURRET_INTERVAL,
                action: function() { this.shoot(); }
            }]
        }
    },
    shoot: function() {
        this.lockTarget();
        if ( this.direction == 'left' ) {
            this.createBullet( this.pos.x, this.pos.y, this.bulletSpeed, 0 );
        } else {
            this.createBullet( this.pos.x, this.pos.y, 0 - this.bulletSpeed, 0 );
        }
    }
});

Game.Entity.Enemy.Turret.Smart = Game.Entity.Enemy.Turret.extend({
    bulletSpeed: SMART_TURRET_SPEED,
    initialSprite: 'turret-smart-left',
    rightSprite: 'turret-smart-right',
    leftSprite: 'turret-smart-left',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'shooting': {
            animation: null,
            actions: [{
                delta: SMART_TURRET_INTERVAL,
                action: function() { this.shoot(); }
            }]
        }
    },
    shoot: function() {
        this.lockTarget();

        var heroX = Game.hero.pos.x,
            heroY = Game.hero.pos.y,
            myX = this.pos.x - ( this.width / 2 ),
            myY = this.pos.y - ( this.height / 2 ),
            xDiff = heroX - myX,
            yDiff = heroY - myY,
            ratio = yDiff / xDiff,
            xVelocity = this.direction == 'left' ? this.bulletSpeed : 0 - this.bulletSpeed,
            yVelocity = ratio * xVelocity;

        if ( Math.abs( yVelocity ) <= Math.abs( xVelocity ) ) {
            this.createBullet( this.pos.x, this.pos.y, xVelocity, yVelocity );
        }
    }
});

Game.Entity.Enemy.Monster = Game.Entity.Enemy.extend({
    type: 'Enemy.Monster',
    initialSprite: 'monster-open',
    initialState: 'walking',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'walking': {
            animation: {
                delta: 150,
                sequence: [ 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-closing', 'monster-closed', 'monster-closed', ],
                times: 'infinite'
            },
            actions: [
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x -= TILESIZE; },
                    until: function() {
                        return this.adjacentTo( 'Terrain.Land', 'left' ) || this.adjacentToLevelEdge( 'left' );
                    }
                },
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x += TILESIZE; },
                    until: function() {
                        return this.adjacentTo( 'Terrain.Land', 'right' ) || this.adjacentToLevelEdge( 'right' );
                    }
                }
            ]
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.activeSprite == 'enemy-dying-9' ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Enemy.Monster.Cautious = Game.Entity.Enemy.Monster.extend({
    type: 'Enemy.Monster.Cautious',
    states: {
        dying: Game.Entity.Enemy.prototype.states.dying,
        'walking': {
            animation: {
                delta: 150,
                sequence: [ 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-closing', 'monster-closed', 'monster-closed', ],
                times: 'infinite'
            },
            actions: [
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x -= TILESIZE; },
                    until: function() {
                        if ( this.adjacentToLevelEdge( 'left' ) ) return true;

                        var land = this.adjacentTo( 'Terrain.Land', 'bottom' ).entity || this.adjacentTo( 'Terrain.Trapdoor', 'bottom' ).entity,
                            edgePiece;

                        if ( land ) {
                            edgePiece = !land.adjacentTo( 'Terrain.Land', 'left' ) && !land.adjacentTo( 'Terrain.Trapdoor', 'left' ) && !land.adjacentToLevelEdge( 'left' );
                            if ( ( edgePiece && this.pos.x <= land.pos.x ) || this.adjacentTo( 'Terrain.Land', 'left') ) {
                                return true;
                            }
                            return false;
                        }
                        return true;
                    }
                },
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x += TILESIZE; },
                    until: function() {
                        if ( this.adjacentToLevelEdge( 'right' ) ) return true;

                        var land = this.adjacentTo( 'Terrain.Land', 'bottom' ).entity || this.adjacentTo( 'Terrain.Trapdoor', 'bottom' ).entity,
                            edgePiece;

                        if ( land ) {
                            edgePiece = !land.adjacentTo( 'Terrain.Land', 'right' ) && !land.adjacentTo( 'Terrain.Trapdoor', 'right' ) && !land.adjacentToLevelEdge( 'right' );
                            if ( ( edgePiece && this.pos.x >= land.pos.x + land.width - this.width ) || this.adjacentTo( 'Terrain.Land', 'right' ) ) {
                                return true;
                            }
                            return false;
                        }
                        return true;
                    }
                }
            ]
        }
    }
});

Game.Entity.Enemy.Bird = Game.Entity.Enemy.extend({
    type: 'Enemy.Bird',
    count: 0,
    initialSprite: 'bird-wings-up',
    initialState: 'flying',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'flying': {
            animation: {
                delta: 200,
                sequence: [ 'bird-wings-up', 'bird-wings-down' ],
                times: 'infinite'
            },
            actions: [{
                delta: 500,
                action: function() {
                    this.dropEgg();
                },
                until: function() { return false }
            }]
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
        this.velocity.x = BIRD_VELOCITY;
    },
    dropEgg: function() {
        if ( Math.abs( Game.hero.pos.x - this.pos.x ) < TILESIZE * 4 ) {
            var eggWidth = Game.Entity.Interactable.Egg.prototype.width,
                x = this.pos.x + ( TILESIZE - eggWidth ) / 2,
                y = this.pos.y + this.height,
                xVelocity = this.velocity.x,
                yVelocity = 0,
                egg = new Game.Entity.Interactable.Egg( x, y );

            Game.currentLevel.entities.push( egg );
            egg.velocity = new Game.Vector( xVelocity, yVelocity );
        }
    },
    generateNextCoords: function( timeDiff ) {
        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }
        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
        this._super( timeDiff );
    },
    collideWith: function( entity, collisionTypes ) {
        this._super( entity, collisionTypes );
        if ( entity.type == 'Terrain.Land' && this.state != 'dying' ) {
            this.pos.x = entity.pos.x + entity.width;
            this.velocity.x = 0;
            this.changeState( 'dying' );
        }
    }
});

Game.Entity.Enemy.Spider = Game.Entity.Enemy.extend({
    type: 'Enemy.Spider',
    dropFor: 2000,
    initialSprite: 'spider-walking-left-1',
    initialState: 'walking-left',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'walking-left': {
            animation: {
                delta: 180,
                sequence: [ 'spider-walking-left-1', 'spider-walking-left-2', 'spider-walking-left-3', 'spider-walking-left-4' ],
                times: 'infinite'
            },
            actions: [{
                delta: 0,
                action: function() {
                    this.velocity.x = 0 - SPIDER_VELOCITY;
                },
                until: function() {
                    var land = this.adjacentTo( 'Terrain.Land', 'top' ).entity,
                        edgePiece;

                    if ( !land ) {
                        land = this.adjacentTo( 'Terrain.Trapdoor', 'top' ).entity;
                    }

                    if ( !land || land.type == 'Terrain.Trapdoor' && land.state == 'dying' ) {
                        this.changeState( 'dying' );
                        this.ignoreGravity = false;
                        this.activeSprite = 'spider-falling';
                        return true;
                    }

                    if ( land ) {
                        edgePiece = ( !land.adjacentTo( 'Terrain.Land', 'left' ) && !land.adjacentTo( 'Terrain.Trapdoor', 'left' ) ) || land.adjacentToLevelEdge( 'left' ) ;
                        if ( ( edgePiece && this.pos.x <= land.pos.x ) ) {
                            this.changeState( 'walking-right' );
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
            }]
        },
        'walking-right': {
            animation: {
                delta: 180,
                sequence: [ 'spider-walking-right-1', 'spider-walking-right-2', 'spider-walking-right-3', 'spider-walking-right-4' ],
                times: 'infinite'
            },
            actions: [{
                delta: 0,
                action: function() {
                    this.velocity.x = SPIDER_VELOCITY;
                },
                until: function() {
                    var land = this.adjacentTo( 'Terrain.Land', 'top' ).entity,
                        edgePiece;

                    if ( !land ) {
                        land = this.adjacentTo( 'Terrain.Trapdoor', 'top' ).entity;
                    }

                    if ( !land || land.type == 'Terrain.Trapdoor' && land.state == 'dying' ) {
                        this.changeState( 'dying' );
                        this.ignoreGravity = false;
                        this.activeSprite = 'spider-falling';
                        return true;
                    }

                    if ( land ) {
                        edgePiece = ( !land.adjacentTo( 'Terrain.Land', 'right' ) && !land.adjacentTo( 'Terrain.Trapdoor', 'right' ) ) || land.adjacentToLevelEdge( 'right' ) ;
                        if ( ( edgePiece && this.pos.x >= land.pos.x + land.width - this.width ) ) {
                            this.pos.x = land.pos.x + land.width - this.width;
                            this.changeState( 'walking-left' );
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
            }]
        },
        'falling': {
            animation: 'spider-falling',
            actions: [{
                delta: 100,
                action: function() {
                    this.ignoreGravity = false;
                    this.velocity.x = 0
                },
                until: function() {
                    this.fellOn = this.fellOn || Date.now();
                    if ( ( Date.now() - this.fellOn ) > this.dropFor ) {
                        this.changeState( 'climbing' );
                        this.fellOn = null;
                    }
                    return false;
                } 
            }],
        },
        'climbing': {
            animation: 'spider-falling',
            actions: [{
                delta: 100,
                action: function() {
                    this.velocity.y = SPIDER_CLIMBING_VELOCITY;
                    this.ignoreGravity = true;
                },
                until: function() {
                    if ( this.pos.y <= this.initialY ) {
                        this.changeState( 'walking-left' );
                    }
                    return false;
                }
            }]
        }
    },
    render: function() {
        if ( this.visible ) {
            Game.ctx.drawImage( Game.Sprites[ this.activeSprite ], this.pos.x - Game.viewportOffset, this.pos.y );
            if ( this.state == 'falling' || this.state == 'climbing' ) {
                for ( var i = this.initialY; i < this.pos.y; i++ ) {
                    Game.ctx.drawImage( Game.Sprites[ 'spider-web' ], this.pos.x + ( TILESIZE / 9 ) * 4 - Game.viewportOffset, i );
                }
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
        this.initialY = y;
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( Math.abs( Game.hero.pos.x - this.pos.x ) < 2 * TILESIZE && this.pos.y < Game.hero.pos.y ) {
            this.pos.x = Math.round( this.pos.x / TILESIZE ) * TILESIZE;
            this.changeState( 'falling' );
            this.fellOn = Date.now();
        }

        if ( this.state == 'falling' || this.state == 'dying' ) {
            Game.invalidateRect( this.initialY, this.pos.x + this.width, this.pos.y + this.height, this.pos.x );
        }

        if ( this.state == 'dying' ) {
            if ( this.velocity.y < 0 ) {
                this.velocity.y = 0;
            }
            this.ignoreGravity = false;
        }

        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    },
    collideWith: function( entity, collisionTypes ) {
        if ( this.velocity.x != 0 && entity.pos.y == this.pos.y && entity.type == 'Terrain.Land' || entity.type == 'Terrain.Trapdoor' ) {
            if ( this.velocity.x < 0 ) {
                this.pos.x = entity.pos.x + entity.width;
                this.changeState( 'walking-right' );
            } else {
                this.pos.x = entity.pos.x - this.width;
                this.changeState( 'walking-left' );
            }
        }

        this._super( entity, collisionTypes );
    }
});

Game.Entity.Enemy.Bullet = Game.Entity.Enemy.extend({
    type: 'Enemy.Bullet',
    initialSprite: 'bullet-red',
    drawLayer: 0,
    width: 4,
    height: 4,
    states: Game.Entity.prototype.states,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' || entity.type == 'Interactable.Lightning' ) {
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Enemy.Battleship = Game.Entity.Enemy.extend({
    type: 'Enemy.Battleship',
    initialSprite: 'battleship-left',
    rightSprite: 'battleship-right',
    leftSprite: 'battleship-left',
    width: TILESIZE * 3,
    height: TILESIZE,
    bulletSpeed: BATTLESHIP_SPEED,
    initialState: 'cruising-left',
    states: {
        'cruising-right': {
            animation: 'battleship-right',
            actions: [{
                delta: TURRET_INTERVAL,
                action: function() {
                    this.shoot();
                }
            }]
        },
        'cruising-left': {
            animation: 'battleship-left',
            actions: [{
                delta: TURRET_INTERVAL,
                action: function() {
                    this.shoot();
                }
            }]
        },
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'battleship-dying-1', 'battleship-dying-2', 'battleship-dying-3', 'battleship-dying-4', 'battleship-dying-5', 'battleship-dying-6', 'battleship-dying-7', 'battleship-dying-8', 'battleship-dying-9' ],
                times: 1
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.activeSprite == 'battleship-dying-9' ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    },
    lockTarget: function() {
        var heroX = Game.hero.pos.x,
            myX = this.pos.x;

        if ( heroX > myX ) {
            this.changeState( 'cruising-right' );
            this.direction = 'right';
        } else if ( heroX < myX ) {
            this.changeState( 'cruising-left' );
            this.direction = 'left';
        }
    },
    shoot: function() {
        this.lockTarget();
        if ( this.direction == 'left' ) {
            this.createBullet( this.pos.x, this.pos.y + ( TILESIZE / 9 ) * 5, this.bulletSpeed, 0 );
        } else {
            this.createBullet( this.pos.x, this.pos.y + ( TILESIZE / 9 ) * 5, 0 - this.bulletSpeed, 0 );
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Enemy.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    collideWith: function( entity, collisionTypes ) {
        this._super( entity, collisionTypes );
        if ( entity.type == 'Terrain.Water' ) {
            if ( this.velocity.y > 0 && collisionTypes ) {
                this.velocity.y = 0;
                this.pos.y = entity.pos.y - entity.height;
            }
        }
    },
    applyGravity: function( timeDiff ) {
        if ( !this.adjacentTo( 'Terrain.Water', 'bottom' ) && !this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            var gravitationalForce = this.gravity.multiply( timeDiff );
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});

// TODO - need a dying animation for a 2x2 enemy
Game.Entity.Enemy.Balloon = Game.Entity.Enemy.extend({
    type: 'Enemy.Balloon',
    width: TILESIZE * 2,
    height: TILESIZE * 2,
    bulletSpeed: BALLOON_SPEED,
    initialSprite: 'balloon',
    initialState: 'floating',
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
        this.startY = y;
        this.velocity.x = BALLOON_HORIZONTAL_VELOCITY;
        this.direction = 'left';
    },
    states: {
        'floating': {
            actions: [
                {
                    delta: TURRET_INTERVAL,
                    action: function() {
                        this.velocity.y = BALLOON_VERTICAL_VELOCITY;
                        this.shoot();
                    },
                    until: function() { return this.pos.y - this.startY >= BALLOON_VERTICAL_BOUNDARY; }
                },
                {
                    delta: TURRET_INTERVAL,
                    action: function() {
                        this.velocity.y = 0 - BALLOON_VERTICAL_VELOCITY;
                        this.shoot();
                    },
                    until: function() { return this.pos.y - this.startY <= 0 - BALLOON_VERTICAL_BOUNDARY; }
                }
            ]
        },
        'dying': {
            animation: 'transparent'
        }
    },
    shoot: function() {
        var heroX = Game.hero.pos.x - Game.hero.width / 2,
            heroY = Game.hero.pos.y - Game.hero.height / 2,
            myX = this.pos.x - ( this.width / 2 ),
            myY = this.pos.y - ( this.height / 2 ),
            xDiff = heroX - myX,
            yDiff = heroY - myY,
            ratio = yDiff / xDiff,
            xVelocity = this.direction == 'left' ? this.bulletSpeed : 0 - this.bulletSpeed,
            yVelocity = ratio * xVelocity;

        if ( Math.abs( yVelocity ) <= Math.abs( xVelocity ) && this.pos.x > heroX ) {
            this.createBullet( this.pos.x, this.pos.y, xVelocity, yVelocity );
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Enemy.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    }
});

Game.Entity.Enemy.Submarine = Game.Entity.Enemy.Balloon.extend({
    type: 'Enemy.Submarine',
    width: TILESIZE * 2,
    height: TILESIZE * 2,
    bulletSpeed: SUBMARINE_SPEED,
    initialSprite: 'submarine',
    initialState: 'floating'
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/friend.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

KID_JUMP_VELOCITY = Settings.kidJumpVelocity;

Game.Entity.Friend = Game.Entity.extend({
    type: 'Friend',
    setContent: function( content ) {
        this.content = content;
    }
});

Game.Entity.Friend.Man = Game.Entity.Friend.extend({
    type: 'Friend.Man',
    initialSprite: 'friend-man'
});

Game.Entity.Friend.Monster = Game.Entity.Friend.extend({
    type: 'Friend.Monster',
    initialSprite: 'friend-monster'
});

Game.Entity.Friend.Kid = Game.Entity.Friend.extend({
    type: 'Friend.Kid',
    initialSprite: 'kid',
    jump: function() {
        this.velocity.y = KID_JUMP_VELOCITY;
    }
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/terrain.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var WAVE_SPEED = Settings.waveSpeed,
    TILESIZE = Settings.tileSize;

Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    drawLayer: 1,
    portal: null, // portal to another level?
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    initialSprite: 'land',
    heatThreshold: 400,
    states: {
        'still': Game.Entity.prototype.states.still,
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'land-dying-1', 'land-dying-2', 'land-dying-3', 'land-dying-4', 'land-dying-5', 'land-dying-6', 'land-dying-7', 'land-dying-8', 'land-dying-9' ],
                times: 1
            }
        }
    },
    collideWith: function( entity, collisions, parent ) {
        this._super( entity, collisions );

        var entityList = this.entityList,
            length = entityList ? entityList.length : 0;

        if ( entity.type == 'Interactable.Heat' ) {

            var actualCollisions = this.getCollisions( entity, this.getActualDimensions() );
            if ( actualCollisions ) {
                this.heatTouched = this.heatTouched || Date.now();
            }

            if ( length ) {
                for ( var i = 1; i < this.entityList.length; i++ ) {
                    var subEnt = entityList[i].entity,
                        subCollisions = subEnt.getCollisions( entity );
                    if ( subCollisions ) {
                        subEnt.collideWith( entity, subCollisions, this );
                    }
                }
            }
        }

        if ( ( Date.now() - this.heatTouched ) > this.heatThreshold ) {
            if ( length ) {

                var newList = this.detach( this );
                length = this.entityList.length;

                if ( newList[0] ) {
                    var first = newList[0].entity;
                    newList = newList.splice( 1, newList.length );

                    // Create new composite entity
                    first.attach( newList );
                    // Add new composite entity to list of entities to track
                    Game.drawLayers[ first.drawLayer ].push( first );
                    Game.currentLevel.entities.push( first );

                    this.changeState( 'dying' );

                    if ( length ) {
                        for ( var i = 1; i < length; i++ ) {
                            var subEnt = entityList[i].entity,
                                subCollisions = subEnt.getCollisions( entity );
                            if ( subCollisions ) {
                                subEnt.collideWith( entity, subCollisions, this );
                            }
                        }
                    }
                }
            } else if ( parent ) {
                var newList = parent.detach( this );

                if ( newList[0] ) {
                    var first = newList[0].entity;
                    newList = newList.splice( 1, newList.length );

                    // Create new composite entity
                    first.attach( newList );
                    // Add new composite entity to list of entities to track
                    Game.drawLayers[ first.drawLayer ].push( first );
                    Game.currentLevel.entities.push( first );
                }

                // Just detached add as a singular entity to entity list
                Game.drawLayers[ this.drawLayer ].push( this );
                Game.currentLevel.entities.push( this );
                this.changeState( 'dying' );
            } else {
                this.changeState( 'dying' );
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.heatTouched && !this.hasCollisionWith( 'Interactable.Heat' ) ) {
            this.heatTouched = null;
        }

        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }

        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Terrain.Trapdoor = Game.Entity.Terrain.Land.extend({
    type: 'Terrain.Trapdoor',
    initialSprite: 'trapdoor'
});

Game.Entity.Terrain.Wave = Game.Entity.Terrain.extend({
    type: 'Terrain.Wave',
    drawLayer: 4,
    initialSprite: 'wave-1',
    initialState: 'rolling',
    states: {
        'rolling': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5', 'wave-6', 'wave-7', 'wave-8', 'wave-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Water = Game.Entity.Terrain.extend({
    type: 'Terrain.Water',
    drawLayer: 5,
    initialSprite: 'water'
});

Game.Entity.Terrain.Waterfall = Game.Entity.Terrain.extend({
    type: 'Terrain.Waterfall',
    drawLayer: 5,
    initialSprite: 'waterfall-1',
    initialState: 'falling',
    states: {
        'falling': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'waterfall-1', 'waterfall-2', 'waterfall-3', 'waterfall-4', 'waterfall-5', 'waterfall-6', 'waterfall-7', 'waterfall-8', 'waterfall-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Waterclimb = Game.Entity.Terrain.extend({
    type: 'Terrain.Waterclimb',
    drawLayer: 5,
    initialSprite: 'waterclimb-1',
    initialState: 'climbing',
    states: {
        'climbing': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'waterclimb-1', 'waterclimb-2', 'waterclimb-3', 'waterclimb-4', 'waterclimb-5', 'waterclimb-6', 'waterclimb-7', 'waterclimb-8', 'waterclimb-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Portal = Game.Entity.Terrain.extend({
    type: 'Terrain.Portal',
    initialState: 'still'
});

Game.Entity.Terrain.Invisible = Game.Entity.Terrain.extend({
    type: 'Terrain.Invisible',
    initialState: 'still'
});

Game.Entity.Terrain.Cloud = Game.Entity.Terrain.extend({
    type: 'Terrain.Cloud',
    initialState: 'still',
    initialSprite: 'cloud-1',
    init: function( x, y ) {
        this._super( x, y );
        var rand = Math.random();
        if ( rand > 0.66 ) {
            this.activeSprite = 'cloud-1';
        } else if ( rand > 0.33 ) {
            this.activeSprite = 'cloud-2';
        } else {
            this.activeSprite = 'cloud-3';
        }
    }
});

Game.Entity.Terrain.Bubble = Game.Entity.Terrain.extend({
    type: 'Terrain.Bubble',
    initialState: 'still',
    initialSprite: 'bubble'
});

Game.Entity.Terrain.Wood = Game.Entity.Terrain.extend({
    type: 'Terrain.Wood',
    initialSprite: 'wood'
});

Game.Entity.Terrain.Window = Game.Entity.Terrain.extend({
    type: 'Terrain.Window',
    initialSprite: 'window'
});

Game.Entity.Terrain.Door = Game.Entity.Terrain.extend({
    type: 'Terrain.Door',
    width: 3 * TILESIZE,
    height: 2 * TILESIZE,
    initialSprite: 'door'
});

Game.Entity.Terrain.Sign = Game.Entity.Terrain.extend({
    type: 'Terrain.Sign',
    width: TILESIZE,
    height: TILESIZE,
    initialSprite: 'sign',
    setContent: function( content ) {
        this.content = content;
    }
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/interactable.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize;

Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    drawLayer: 2,
    collectable: null // indicates whether it automatically goes into inventory
});

Game.Entity.Interactable.Rock = Game.Entity.Interactable.extend({
    type: 'Interactable.Rock',
    initialSprite: 'rock',
    init: function( x, y ) {
        this.velocity = new Game.Vector( 0, 0 );
        this._super( x, y );
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Hero.Man' ) {
            if ( this.velocity.y > 0 && collisionTypes ) {
                this.velocity.y = 0;
                this.pos.y = entity.pos.y - entity.height;
                if ( !entity.holding ) {
                    entity.actions.pickup.call( entity, this );
                }
            }
        }
        if ( entity.type == 'Terrain.Land' ) {
            if ( this.velocity.x > 0 && this.velocity.y == 0 && collisionTypes ) {
                this.velocity.x = 0;
                this.pos.x = entity.pos.x - this.width;
            } else if ( this.velocity.x < 0 && this.velocity.y == 0 && collisionTypes ) {
                this.velocity.x = 0;
                this.pos.x = entity.pos.x + this.width;
            }
        }
        this._super( entity, collisionTypes );
    },
    generateNextCoords: function( timeDiff ) {
        var frictionalForce;
        if ( this.velocity.x >= 0 ) {
            frictionalForce = ( new Game.Vector( -0.0003, 0 ) ).multiply( timeDiff );
        } else {
            frictionalForce = ( new Game.Vector( 0.0003, 0 ) ).multiply( timeDiff );
        }
        if ( this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            if ( this.velocity.x != 0 ) {
                this.velocity = this.velocity.add( frictionalForce );
            }
            if ( Math.abs( this.velocity.x ) < 0.05 ) {
                this.velocity.x = 0;
            }
        }
        this._super( timeDiff );
    }
});

Game.Entity.Interactable.Coin = Game.Entity.Interactable.extend({
    type: 'Interactable.Coin',
    initialSprite: 'coin',
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Heart = Game.Entity.Interactable.extend({
    type: 'Interactable.Heart',
    initialSprite: 'heart',
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Bullet = Game.Entity.Interactable.extend({
    type: 'Interactable.Bullet',
    initialSprite: 'bullet-green',
    drawLayer: 0,
    width: ( TILESIZE / 9 ) * 2,
    height: ( TILESIZE / 9 ) * 2,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Egg = Game.Entity.Interactable.extend({
    type: 'Interactable.Egg',
    initialSprite: 'egg',
    width: ( TILESIZE / 9 ) * 3,
    height: ( TILESIZE / 9 ) * 4,
    drawLayer: 0,
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Tongue = Game.Entity.Interactable.extend({
    type: 'Interactable.Tongue',
    initialSprite: 'frog-tongue',
    width: ( TILESIZE / 9 ) * 10,
    height: TILESIZE / 9,
    yOffset: ( TILESIZE / 9 ) * 4,
    drawLayer: 2,
    init: function( x, y, frog, velocity ) {
        this._super( x, y );
        this.initialX = x;
        this.velocity.x = velocity || 0;
        this.initialVelocity = this.velocity.x;
        this.ignoreGravity = true;
        this.frog = frog;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
        if ( entity.type ==  'Interactable.Coin' ) {
            Game.destroyEntity( entity );
            Game.Inventory.incrementCurrency();
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.frog.state.indexOf( 'jumping' ) != -1 ) {
            this.pos.y = this.frog.pos.y + this.yOffset - ( TILESIZE / 9 ) * 2;
        } else {
            this.pos.y = this.frog.pos.y + this.yOffset;
        }

        if ( Math.abs( this.pos.x - this.initialX ) >= this.width - ( ( TILESIZE / 9 ) * 6.5 ) ) {
            this.velocity.x = 0 - this.velocity.x;
        }

        if ( this.initialVelocity > 0 && this.velocity.x < 0 && Math.abs( this.pos.x - this.initialX ) <= ( ( TILESIZE / 9 ) * 5 ) ) {
            Game.hero.doneLicking();
            Game.destroyEntity( this );
        }
        if ( this.initialVelocity < 0 && this.velocity.x > 0 && Math.abs( this.pos.x - this.initialX ) <= ( ( TILESIZE / 9 ) * 5 ) ) {
            Game.hero.doneLicking();
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Lightning = Game.Entity.Interactable.extend({
    type: 'Interactable.Lightning',
    initialSprite: 'lightning',
    initialState: 'flashing',
    width: TILESIZE * 3,
    height: TILESIZE * 3,
    shockFor: 1000,
    init: function( x, y, jellyfish ) {
        this._super( x, y );
        this.created = Date.now();
        this.ignoreGravity = true;
        this.jellyfish = jellyfish;
    },
    states: {
        'flashing': {
            animation: {
                delta: 120,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( Date.now() - ( this.created ) > this.shockFor ) {
            Game.destroyEntity( this );
        }

        this.pos.x = this.jellyfish.pos.x - TILESIZE;
        this.pos.y = this.jellyfish.pos.y - TILESIZE;
    }
});

Game.Entity.Interactable.Heat = Game.Entity.Interactable.extend({
    type: 'Interactable.Heat',
    drawLayer: 5,
    initialSprite: 'heat',
    initialState: 'wave',
    width: TILESIZE * 5,
    height: TILESIZE * 3,
    states: {
        'wave': {
            animation: {
                delta: 50,
                sequence: [ 'heat', 'heat-2' ],
                times: 'infinite'
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        this.pos.x = this.flame.pos.x - 2 * TILESIZE;
        this.pos.y = this.flame.pos.y - 2 * TILESIZE;
    },
    init: function( x, y, flame ) {
        this._super( x, y );
        this.flame = flame;
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Switch = Game.Entity.Interactable.extend({
    type: 'Interactable.Switch',
    initialSprite: 'switch',
    width: TILESIZE,
    height: ( TILESIZE / 9 ) * 3,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    setDoors: function( doors ) {
        doors = Object.prototype.toString.call( doors ) === '[object Array]' ? doors : [ doors ];

        this.doors = doors;
    },
    collideWith: function( entity, collisions ) {
        if ( entity.type == 'Interactable.Rock' && entity.pos.y <= this.pos.y ) {
            for ( var i = 0, len = this.doors.length; i < len; i++ ) {
                this.doors[i].changeState( 'dying' );
            }
        }
    }
});

Game.Entity.Interactable.Map = Game.Entity.Interactable.extend({
    type: 'Interactable.Map'
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/machine.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var MACHINE_WIDTH = Settings.machineWidth,
    MACHINE_HEIGHT = Settings.machineHeight;

Game.Entity.Machine = Game.Entity.extend({
    type: 'Machine',
    width: MACHINE_WIDTH,
    height: MACHINE_HEIGHT,
    initialSprite: 'machine-green',
    initialState: 'flashing-light',
    states: {
        'flashing-light': {
            animation: {
                delta: 1200,
                sequence: [ 'machine-green', 'machine-red' ],
                times: 'infinite'
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/inventory.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var INIT_MAX_CURRENCY = Settings.initialMaxCurrency,
    INIT_MAX_HEALTH = Settings.initialMaxHealth;

Game.Inventory = {
    currency: 0,
    items: [], //array of items collected
    health: INIT_MAX_HEALTH,
    maxHealth: INIT_MAX_HEALTH,
    maxCurrency: INIT_MAX_CURRENCY,
    decrementHealth: function() {
        if ( this.health > 0 ) {
            this.health--;
        }
    },
    incrementHealth: function() {
        if ( this.health < this.maxHealth ) {
            this.health++;
        }
    },
    decrementCurrency: function() {
        if ( this.currency > 0 ) {
            this.currency--;
        }
    },
    incrementCurrency: function() {
        if ( this.currency < this.maxCurrency ) {
            this.currency++;
        }
    },
    push: function( item ) {
        var instance;

        if ( typeof item == 'function' ) {
            instance = new item;
        } else {
            instance = item;
        }

        if ( !this.inInventory( instance ) ) {
            this.items.push( instance );
        }
    },
    inInventory: function( item ) {
        var instance;

        if ( typeof item == 'function' ) {
            instance = new item;
        } else {
            instance = item;
        }

        for ( var i = 0, len = this.items.length; i < len; i++ ) {
            if ( this.items[i].type == instance.type ) {
                return true;
            }
        }

        return false;
    }
};

})( Game, Settings, window, document );


/* /Users/tbenzige/Projects/morph/new/game/menu.js */
/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize;
    MENU_WIDTH = Settings.menuWidth,
    MENU_HEIGHT = Settings.menuHeight,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    MENU_PADDING = Settings.menuPadding,
    MENU_HEADER_HEIGHT = Settings.menuHeaderHeight,
    MENU_HEADER_FONT_SIZE = Settings.menuHeaderFontSize,
    MENU_TITLE_TOP = Settings.menuTitleTop,
    MENU_SELECTION_COLOR = Settings.menuSelectionColor,
    MENU_LINE_COLOR = Settings.menuLineColor,
    MENU_TEXT_COLOR = Settings.menuTextColor,
    MENU_PADDING_LEFT = Settings.menuPaddingLeft,
    MENU_ROW_SIZE = Settings.menuRowSize,
    MENU_SELECTION_PADDING = Settings.menuSelectionPadding,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    MENU_ITEM_WIDTH = Settings.menuItemWidth,
    MENU_ITEM_HEIGHT = Settings.menuItemHeight,
    SIGN_FONT_SIZE = Settings.signFontSize,
    DIALOG_PROMPT_SIZE = Settings.dialogPromptSize,
    DIALOG_RESPONSE_SIZE = Settings.dialogResponseSize,
    QUESTLOG_FONT_SIZE = Settings.questlogFontSize,
    BLACK = Settings.blackColor,
    GAME_OVER_MENU_PADDING_LEFT = Settings.gameOverMenuPaddingLeft,
    GAME_OVER_MENU_PADDING_TOP = Settings.gameOverMenuPaddingTop,
    TRANSFORM_MENU_ROW_SIZE = Settings.transformMenuRowSize,
    LEFT_KEY = Settings.leftKey,
    RIGHT_KEY = Settings.rightKey,
    DOWN_KEY = Settings.downKey,
    UP_KEY = Settings.upKey,
    ACTION_KEY = Settings.actionKey,
    JUMP_KEY = Settings.jumpKey,
    PAUSE_KEY = Settings.pauseKey,
    ENTER_KEY = Settings.enterKey,
    QUESTLOG_KEY = Settings.questlogKey,
    MAP_KEY = Settings.mapKey;

Game.Menu = Class.extend({
    titleText: 'MENU',
    init: function( left, top, width, height, lineWidth ) {
        this.x = left;
        this.y = top;
        this.padding = MENU_PADDING;
        this.paddingLeft = this.padding + MENU_PADDING_LEFT;
        this.headerHeight = MENU_HEADER_HEIGHT;
        this.paddingTop = this.headerHeight + this.padding;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 1;
        this.selected = 0;
        this.timeToExit = true;
    },
    data: [],
    show: function() {
        var self = this;

        this.requestID = requestAnimationFrame(function() {
            self.loop();
        });
    },
    exit: function() {
        Game.paused = false;
        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.invalidateRect( 0, Game.viewportWidth, Game.viewportHeight, 0 );
        Game.requestID = requestAnimationFrame( Game.loop );
    },
    loop: function() {
        var self = this;

        // Left
        if ( LEFT_KEY in Game.keysDown && Game.keysDown[ LEFT_KEY ] != 'locked' ) {
            this.left();
            Game.keysDown[LEFT_KEY] = 'locked';
        }
        // Up
        if ( UP_KEY in Game.keysDown && Game.keysDown[ UP_KEY ] != 'locked' ) {
            this.up();
            Game.keysDown[UP_KEY] = 'locked';
        }
        // Right
        if ( RIGHT_KEY in Game.keysDown && Game.keysDown[ RIGHT_KEY ] != 'locked' ) {
            this.right();
            Game.keysDown[RIGHT_KEY] = 'locked';
        }
        // Down
        if ( DOWN_KEY in Game.keysDown && Game.keysDown[ DOWN_KEY ] != 'locked' ) {
            this.down();
            Game.keysDown[DOWN_KEY] = 'locked';
        }

        // Enter
        if ( ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' && this.timeToExit ) || ( JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) ) {
            if ( JUMP_KEY in Game.keysDown ) Game.keysDown[ JUMP_KEY ] = 'locked';
            // Choose and exit
            this.exit();
        } else {
            Game.invalidateRect( 0, Game.viewportWidth + Game.viewportOffset, Game.viewportHeight, Game.viewportOffset );
            Game.render();
            this.render();

            this.requestID = requestAnimationFrame(function() {
                self.loop();
            });
        }
    },
    render: function() {
        this.overlay();

        this.container();

        this.contents();
    },
    rowSize: MENU_ROW_SIZE,
    selectionPadding: MENU_SELECTION_PADDING,
    selectionLineWidth: MENU_LINE_WIDTH,
    selectionColor: MENU_SELECTION_COLOR,
    itemWidth: MENU_ITEM_WIDTH,
    itemHeight: MENU_ITEM_HEIGHT,
    contents: function() {
        this.title();

        var item,
            spacing = 4 * TILESIZE,
            x, y,
            j = 0;

        for ( var i = 0; i < this.data.length; i++ ) {
            item = this.data[i];
            x = this.x + this.paddingLeft + ( j % this.rowSize ) * spacing;
            y = this.y + this.paddingTop + spacing * Math.floor( j / this.rowSize );
            if ( this.selected == i ) {
                if ( item.sprite ) {

                    Game.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        this.itemWidth + this.selectionPadding * 2 - 4,
                                        this.itemHeight + this.selectionPadding * 2 - 4,
                                        this.selectionLineWidth,
                                        this.selectionColor );

                }
            }
            if ( item.sprite ) {
                Game.ctx.drawImage( Game.Sprites[ item.sprite ], x, y );
            } else if ( item.text ) {
                Game.ctx.textAlign = 'left';
                Game.ctx.fillText( item.text, x, y );
            }
            j++;
        }
    },
    title: function() {
        Game.ctx.font = 'normal ' + MENU_HEADER_FONT_SIZE + 'px uni05';
        Game.ctx.fillStyle = BLACK;
        Game.ctx.textAlign = 'center';
        Game.ctx.fillText( this.titleCopy || this.titleText, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP );
    },
    overlay: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
    },
    container: function() {
        Game.ctx.fillStyle = BLACK;
        Game.ctx.fillRect( this.x, this.y, this.width, this.height );

        Game.drawRectangle( this.x, this.y, this.width, this.height, this.lineWidth, MENU_LINE_COLOR );
        // Header
        Game.ctx.fillRect( this.x + this.lineWidth, this.y + this.lineWidth, this.width - this.lineWidth, this.headerHeight );
    },
    up: function() {
        if ( this.selected - this.rowSize >= 0 ) {
            this.selected -= this.rowSize;
        }
    },
    down: function() {
        if ( this.selected + this.rowSize < this.data.length ) {
            this.selected += this.rowSize;
        }
    },
    left: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    right: function() {
        if ( this.selected + 1 < this.data.length ) {
            this.selected++;
        }
    }
});

Game.Menu.Pause = Game.Menu.extend({
    titleText: 'PAUSE',
    loop: function() {
        if ( PAUSE_KEY in Game.keysDown && Game.keysDown[ PAUSE_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    }
});

Game.Menu.GameOver = Game.Menu.extend({
    titleText: 'GAME OVER',
    init: function( left, top, width, height, lineWidth ) {
        this._super( left, top, width, height, lineWidth );
        this.paddingLeft = GAME_OVER_MENU_PADDING_LEFT;
        this.paddingTop = GAME_OVER_MENU_PADDING_TOP;
    },
    data: [
        { sprite: 'restart-double' },
        { sprite: 'exit-double' }
    ],
    exit: function() {
        if ( this.selected == 0 ) {
            Game.paused = false;
            Game.Inventory.health = Game.Inventory.maxHealth;
            Game.lastUpdate = null;
            Game.stop();
            Game.init( 'first' );
        }
    }
});

Game.Menu.Transform = Game.Menu.extend({
    titleText: 'MORPH',
    data: [
        {
            className: Game.Entity.Hero.Block,
            questID: 'initial',
            sprite: 'block-double'
        },
        {
            className: Game.Entity.Hero.Man,
            questID: 'man',
            sprite: 'man-right-double'
        },
        {
            className: Game.Entity.Hero.Boat,
            questID: 'boat',
            sprite: 'boat-right-double'
        },
        {
            className: Game.Entity.Hero.Frog,
            questID: 'frog',
            sprite: 'frog-right-double'
        },
        {
            className: Game.Entity.Hero.Plane,
            questID: 'plane',
            sprite: 'plane-right-double'
        },
        {
            className: Game.Entity.Hero.Jellyfish,
            questID: 'jellyfish',
            sprite: 'jellyfish-double'
        },
        {
            className: Game.Entity.Hero.Clock,
            questID: 'clock',
            sprite: 'clock-double'
        },
        {
            className: Game.Entity.Hero.Flame,
            questID: 'flame',
            sprite: 'flame-double'
        }
    ],
    rowSize: TRANSFORM_MENU_ROW_SIZE,
    exit: function() {
        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.startTransformAnimation( this.data[ this.selected ].className );
    }
});

Game.Menu.Sign = Game.Menu.extend({
    init: function( left, top, width, height, lineWidth, content ) {
        this._super( left, top, width, height, lineWidth );
        this.titleCopy = content.title;
        this.body = content.body;
    },
    contents: function() {
        this.title();

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'center';
        Game.ctx.font = 'normal ' + SIGN_FONT_SIZE + 'px uni05';

        Game.wrapText( Game.ctx, this.body, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP + MENU_PADDING * 2, MENU_WIDTH * TILESIZE - 2 * TILESIZE, SIGN_FONT_SIZE + ( SIGN_FONT_SIZE / 2.5 ) );
    }
});

Game.Menu.Dialog = Game.Menu.extend({
    init: function( left, top, width, height, lineWidth, content ) {
        this._super( left, top, width, height, lineWidth );
        this.face = content.face;
        this.titleCopy = content.name;
        this.content = content;
        this.timeToExit = false;
    },
    contents: function() {
        this.title();

        this.drawFace();

        this.currentDialog();
    },
    drawFace: function() {
        var sprite = Game.Sprites[ this.face + '-double' ],
            x = this.x + MENU_WIDTH * TILESIZE - MENU_ITEM_WIDTH - MENU_PADDING,
            y = this.y + MENU_HEADER_HEIGHT + MENU_PADDING;

        Game.ctx.drawImage( sprite, this.x + MENU_WIDTH * TILESIZE - MENU_ITEM_WIDTH - MENU_PADDING, this.y + MENU_HEADER_HEIGHT + MENU_PADDING );

        Game.drawRectangle( x - MENU_SELECTION_PADDING,
                            y - MENU_SELECTION_PADDING,
                            MENU_ITEM_WIDTH + MENU_SELECTION_PADDING * 2 - 2,
                            MENU_ITEM_HEIGHT + MENU_SELECTION_PADDING * 2 - 2,
                            MENU_LINE_WIDTH,
                            MENU_LINE_COLOR );
    },
    getDialog: function() {
        var dialogObj,
            found = false;

        this.activeDialog = this.activeDialog || 0;

        for ( var i in this.content.dialog ) {
            if ( Game.Questlog.inLog( i ) ) {
                dialogObj = this.content.dialog[ i ][ this.activeDialog ];
                found = true;
            }
        }

        if ( !found ) {
            dialogObj = this.content.dialog.default[ this.activeDialog ];
        }

        return dialogObj;
    },
    currentDialog: function() {
        var dialogObj = this.getDialog(),
            text = dialogObj.prompt,
            options = dialogObj.options,
            questlog = dialogObj.questlog,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING * 1.8;

        if ( questlog ) {
            Game.Questlog.push( questlog.questID, questlog.id );
        }

        // Draw prompt
        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + DIALOG_PROMPT_SIZE + 'px uni05';

        Game.wrapText( Game.ctx, text, left, top, MENU_WIDTH * TILESIZE - 4.5 * TILESIZE, DIALOG_PROMPT_SIZE + ( DIALOG_PROMPT_SIZE / 3 ) );

        // Draw options for response
        var fontSize = DIALOG_RESPONSE_SIZE;
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        var optionHeight = 0;
        for ( var i = 0, len = options.length; i < len; i++ ) {
            var top = optionHeight || top + TILESIZE * 3;

            Game.ctx.fillStyle = MENU_TEXT_COLOR;
            dimensions = Game.wrapText( Game.ctx, options[i].text, left, top, MENU_WIDTH * TILESIZE - 2 * TILESIZE, fontSize + (fontSize / 5) );
            optionHeight = dimensions.bottom;

            if ( i == this.selected ) {
                Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                    top - fontSize - 5,
                                    dimensions.width + MENU_SELECTION_PADDING * 2 - 2,
                                    dimensions.height + fontSize * 2 - 2,
                                    2,
                                    MENU_SELECTION_COLOR );
            }
        }
    },
    reply: function( response ) {
        var action = this.getDialog().options[ response ].action;

        if ( action != 'exit' ) {
            this.selected = 0;
        }

        if ( action == 'skip' ) {
            this.activeDialog += 2;
        } else if ( action == 'prev' ) {
            this.activeDialog--;
        } else if ( action == 'exit' ) {
            this.timeToExit = true;
            return true;
        } else {
            this.activeDialog++;
        }
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            var exit = this.reply( this.selected );

            if ( !exit ) {
                Game.keysDown[ ACTION_KEY ] = 'locked';
            }
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.selected + 1 < this.getDialog().options.length ) {
            this.selected++;
        }
    },
    left: function() {},
    right: function() {}
});

Game.Menu.Questlog = Game.Menu.extend({
    titleText: 'QUESTLOG',
    contents: function() {
        this.title();

        this.currentQuest = this.currentQuest || null;

        var quests = Game.Questlog.log,
            quest,
            dimensions,
            fontSize = QUESTLOG_FONT_SIZE,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING + TILESIZE * 0.7;

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        if ( this.currentQuest ) {
            // Quest is selected list journal entries
            quest = quests[ this.currentQuest ].entries;

            for ( var i = quest.length - 1; i >= 0; i-- ) {

                Game.ctx.fillStyle = MENU_TEXT_COLOR;
                dimensions = Game.wrapText( Game.ctx, quest[i].text, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING * 2, fontSize + ( fontSize / 5 ) );

                if ( i == ( quest.length - 1 - this.selected ) ) {
                    Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                        top - fontSize - 5,
                                        MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                        dimensions.height + fontSize * 2 - 2,
                                        2,
                                        MENU_SELECTION_COLOR );
                }

                top = dimensions.bottom;
            }
        } else {
            // List all quests
            var j = 0;
            for ( var i in quests ) {
                quest = quests[i];

                Game.ctx.fillStyle = MENU_TEXT_COLOR;
                dimensions = Game.wrapText( Game.ctx, quest.title, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING, fontSize + ( fontSize / 5 ) );

                if ( j == this.selected ) {
                    Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                        top - fontSize - 5,
                                        MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                        dimensions.height + fontSize * 2 - 2,
                                        2,
                                        MENU_SELECTION_COLOR );
                }

                top = dimensions.bottom;

                j++;
            }
        }
    },
    choose: function( selection ) {
        var quests = Game.Questlog.log;

        if ( this.currentQuest ) {
        } else {
            var j = 0;
            for ( var i in quests ) {
                if ( j == selection ) {
                    this.lastSelected = this.selected;
                    this.selected = 0;
                    this.currentQuest = i;
                    break;
                }
                j++;
            }
        }

    },
    back: function() {
        if ( this.currentQuest ) {
            this.currentQuest = false;
            this.selected = this.lastSelected;
            return false;
        }

        return true;
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.choose( this.selected );
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) {
            var exit = this.back();

            if ( !exit ) Game.keysDown[ JUMP_KEY ] = 'locked';
        }

        if ( QUESTLOG_KEY in Game.keysDown && Game.keysDown[ QUESTLOG_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.currentQuest ) {
            if ( this.selected + 1 < Game.Questlog.log[ this.currentQuest ].entries.length ) {
                this.selected++;
            }
        } else {
            var len = 0;
            for ( var i in Game.Questlog.log ) len++;
            if ( this.selected + 1 < len ) {
                this.selected++;
            }
        }
    },
});

Game.Menu.Map = Game.Menu.extend({
    titleText: 'MAP',
    init: function( left, top, width, height, lineWidth, content ) {
        this.content = content;
        this._super( left, top, width, height, lineWidth );
    },
    contents: function() {
        this.title();

        var places = this.content,
            dimensions,
            fontSize = QUESTLOG_FONT_SIZE,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING + TILESIZE * 0.7;

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        for ( var i = 0, len = places.length; i < len; i++ ) {
            var place = places[i];

            Game.ctx.fillStyle = MENU_TEXT_COLOR;
            dimensions = Game.wrapText( Game.ctx, place, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING, fontSize );

            if ( i == this.selected ) {
                Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                    top - fontSize - 5,
                                    MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                    dimensions.height + fontSize * 2 - 2,
                                    2,
                                    MENU_SELECTION_COLOR );
            }

            top = dimensions.bottom;
        }
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.timeToExit = true;
        }

        if ( MAP_KEY in Game.keysDown && Game.keysDown[ MAP_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.selected + 1 < this.content.length ) {
            this.selected++;
        }
    },
    exit: function() {
        var place = this.content[ this.selected ].toLowerCase().replace( ' ', '-' );

        Game.switchToLevel = place;
        Game.performLevelSwitch();
        Game.paused = false;
    }
});

})( Game, Settings, window, document );


