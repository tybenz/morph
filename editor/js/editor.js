/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var TILESIZE = Settings.tileSize;

Game.Editing = true;

Editor = {
    width: 25,
    height: 14,
    paintSprite: 'terrain.land',
    gridEnabled: true,
    $game: $( '#game' ),
    $sprites: $( '#sprites' ),
    $tools: $( '#tools' ),
    $rectangle: $( '#rectangle-tool' ),
    $addColumn: $( '#add-column' ),
    $removeColumn: $( '#remove-column' ),
    $input: $( '#columns' ),
    totalImages: 0,
    activeTool: 'fill',
    init: function() {
        // We have to initSprites first to render them all
        // Once all images are loaded we fire initEditing which
        // initializes the actual app
        this.initSprites();
        this.initTools();
    },
    initEditing: function() {
        this.initLevelList();
        this.initLevel();
        this.initCanvas();
        this.drawLevel();

        // Bind events
        this.$game.on( 'click', function( evt ) {
            if ( Editor.activeTool != 'rectangle' ) {
                Editor.dropSprite( { startX: evt.pageX, startY: evt.pageY }, 0, 0 );
            }
        });

        this.fillTracker = new DragTracker( this.$game, {
            dragStart: Editor.dropSprite,
            dragUpdate: Editor.dropSprite,
            dragStop: Editor.dropSprite,
        });

        this.rectangleTracker = new DragTracker( this.$game, {
            dragStart: Editor.rectangleStart,
            dragUpdate: Editor.rectangleUpdate,
            dragStop: Editor.rectangleStop
        });
        this.rectangleTracker.disable();

        this.$sprites.on( 'click', '.sprite', Editor.selectSprite );

        this.$tools.on( 'click', '.tool', Editor.selectTool );

        this.$addColumn.on( 'click', Editor.addColumn );

        this.$removeColumn.on( 'click', Editor.removeColumn );

        this.$input.on( 'input', Editor.adjustColumns );

        $( document ).on( 'keydown', function( evt ) {
            if ( evt.keyCode == 83 && ( evt.ctrlKey || evt.metaKey ) ) {
                Editor.save();
            }
        });
    },
    selectSprite: function() {
        Editor.$sprites.find( '.sprite' ).removeClass( 'active' );
        $( this ).addClass( 'active' );
        Editor.paintSprite = $( this ).data( 'type' );
        if ( Editor.activeTool == 'remove' ) {
            Editor.activeTool = 'fill';
            Editor.$tools.find( '.tool' ).removeClass( 'active' );
            $( '.tool[data-type=fill]' ).addClass( 'active' );
        }
    },
    selectTool: function() {
        var tool = $( this ).data( 'type' );
        if ( tool != 'preview' && Editor.activeTool == 'preview' ) {
            Editor.stopPreview();
        }
        if ( tool != 'save' ) {
            Editor.activeTool = tool;
            Editor.$tools.find( '.tool' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
        }

        switch ( tool ) {
            case 'rectangle':
                Editor.rectangleTracker.enable();
                Editor.fillTracker.disable();
                break;
            case 'pencil':
                Editor.fillTracker.disable();
                Editor.rectangleTracker.disable();
                break;
            case 'save':
                Editor.save();
            case 'preview':
                Editor.preview();
            case 'remove':
                Editor.paintSprite = 'blank';
            default:
                // fill or clear
                Editor.fillTracker.enable();
                Editor.rectangleTracker.disable();
                break;
        }
    },
    rectangleStart: function( dt, dx, dy ) {
        Editor.$rectangle.width(0);
        Editor.$rectangle.height(0);
        Editor.$rectangle.css( 'top', dt.startY );
        Editor.$rectangle.css( 'left', dt.startX );
        Editor.$rectangle.show();
    },
    rectangleUpdate: function( dt, dx, dy ) {
        var right = dt.startX + dx - Editor.$game.offset().left,
            bottom = dt.startY + dy - Editor.$game.offset().top,
            maxWidth = Editor.width * TILESIZE,
            maxHeight = Editor.height * TILESIZE;

        if ( right >= 0 && right < maxWidth && bottom >= 0 && bottom < maxHeight ) {
            Editor.$rectangle.width( dx );
            Editor.$rectangle.height( dy );
        }
    },
    rectangleStop: function( dt, dx, dy ) {
        var left = dt.startX - Editor.$game.offset().left + Editor.$game.scrollLeft(),
            top = dt.startY - Editor.$game.offset().top,
            right = left + dx,
            bottom = top + dy,
            i, j;

        left = Math.floor( left / TILESIZE );
        top = Math.floor( top / TILESIZE );
        right = Math.ceil( right / TILESIZE );
        bottom = Math.ceil( bottom / TILESIZE );

        for ( i = top; i < bottom; i++ ) {
            for ( j = left; j < right; j++ ) {
                Editor.level[i][j] = Editor.paintSprite;
            }
        }

        Editor.drawLevel();
        Editor.$rectangle.hide();
    },
    initLevelList: function() {
        Editor.levelList = {};
        Editor.$levelList = $( '#level-list' );

        for ( var i in Game.Levels ) {
            var level = Game.Levels[i];

            Editor.levelList[ level.title ] = level.grid;
            Editor.$levelList.append( '<li class="select-level">' + level.title + '</li>' );
        }

        Editor.$levelList.on( 'click', '.select-level', function() {
            var name = $( this ).text();

            Editor.level = Editor.levelList[ name ];

            Editor.width = Editor.level[0].length;
            Editor.$input.val( Editor.width );
            Editor.canvas.width = Editor.width * TILESIZE;

            Editor.drawLevel();
        });
    },
    initLevel: function() {
        this.level = [];
        for ( var i = 0; i < Editor.height; i++ ) {
            this.level[i] = [];
            for ( var j = 0; j < Editor.width; j++ ) {
                this.level[i][j] = 'blank';
            }
        }
    },
    dropSprite: function( dt, dx, dy ) {
        x = Math.floor( ( dx + dt.startX - Editor.$game.offset().left + Editor.$game.scrollLeft() ) / TILESIZE );
        y = Math.floor( ( dy + dt.startY - Editor.$game.offset().top ) / TILESIZE );

        if ( x >= 0 && x < Editor.width && y >= 0 && y < Editor.height ) {
            currentSprite = Editor.level[y][x];
            if ( currentSprite != Editor.paintSprite ) {
                Editor.level[y][x] = Editor.paintSprite;
                Editor.drawLevel();
            }
        }
    },
    initCanvas: function() {
        this.canvas = document.createElement( 'canvas' );
        this.$canvas = $( this.canvas );
        this.canvas.width = TILESIZE * Editor.width;
        this.canvas.height = TILESIZE * Editor.height;
        document.getElementById( 'game' ).appendChild( this.canvas );
        this.ctx = this.canvas.getContext( '2d' );
    },
    drawLevel: function() {
        var sprite, i, j;

        this.ctx.clearRect( 0, 0, TILESIZE * Editor.width, TILESIZE * Editor.height );

        if ( this.gridEnabled ) {
            this.ctx.fillStyle = "#222";
            for ( i = 0; i < this.width; i++ ) {
                this.ctx.fillRect( i * TILESIZE, 0, 1, this.height * TILESIZE );
            }

            for ( i = 0; i < this.height; i++ ) {
                this.ctx.fillRect( 0, i * TILESIZE, this.width * TILESIZE, 1 );
            }
        }

        for ( i in this.level ) {
            for ( j in this.level[i] ) {
                sprite = this.level[i][j].replace( /\([^\(\)]*\)/g, '' ).replace( /\[[^\[\]]*\]/g, '' ).replace( /\{[^\{\}]*\}/g, '' );
                if ( sprite != 'blank' ) {
                    this.ctx.drawImage( this.sprites[ sprite ], j * TILESIZE, i * TILESIZE );
                }
            }
        }
    },
    addColumn: function() {
        var i;
        for ( i in Editor.level ) {
            Editor.level[i].push( 'blank' );
        }
        Editor.width++;
        Editor.$input.val( Editor.width );

        Editor.canvas.width = Editor.width * TILESIZE;
        Editor.drawLevel();
    },
    removeColumn: function() {
        var i;
        for ( i in Editor.level ) {
            Editor.level[i].pop();
        }
        Editor.width--;
        Editor.$input.val( Editor.width );

        Editor.canvas.width = Editor.width * TILESIZE;
        Editor.drawLevel();
    },
    adjustColumns: function() {
        var i = 0,
            val = parseInt( Editor.$input.val() );

        if ( val && val > 50 ) {

            var diff = val - Editor.width;

            if ( diff > 0 ) {
                for ( ; i < diff; i++ ) {
                    for ( var j in Editor.level ) {
                        Editor.level[j].push( 'blank' );
                    }
                }
            } else {
                for ( ; i < diff; i++ ) {
                    for ( var j in Editor.level ) {
                        editor.level[j].pop();
                    }
                }
            }

            Editor.width = val;

            Editor.canvas.width = Editor.width * TILESIZE;
            Editor.drawLevel();

        }
    },
    initSprites: function () {
        Game.initSprites();

        var gameObjects = [
                Game.Entity.Terrain,
                Game.Entity.Hero,
                Game.Entity.Enemy,
                Game.Entity.Friend,
                Game.Entity.Interactable,
                Game.Entity.Machine
            ],
            i, j, k,
            obj, sprite, type,
            tempCanvas, tempContext,
            currentSprite,
            rectSize = TILESIZE / 9;

        for ( i in gameObjects ) {
            obj = gameObjects[i];
            sprite = obj.prototype ? obj.prototype.initialSprite : null;
            if ( sprite ) {
                type = obj.prototype.type.toLowerCase();
                this.sprites[ type ] = Game.Sprites[ sprite ];
                this.$sprites.append( '<div class="sprite ' + ( type == 'terrain.land' ? 'active' : '' ) + '" data-type="' + type + '"><img src="' + this.sprites[ type ].src + '"></div>' );
            }
            for ( j in obj ) {
                sprite = obj[j].prototype ? obj[j].prototype.initialSprite : null;
                if ( sprite ) {
                    type = obj[j].prototype.type.toLowerCase();
                    this.sprites[ type ] = Game.Sprites[ sprite ];
                    this.$sprites.append( '<div class="sprite ' + ( type == 'terrain.land' ? 'active' : '' ) + '" data-type="' + type + '"><img src="' + this.sprites[ type ].src + '"></div>' );
                }
                for ( k in obj[j] ) {
                    sprite = obj[j][k].prototype ? obj[j][k].prototype.initialSprite : null;
                    if ( sprite ) {
                        type = obj[j][k].prototype.type.toLowerCase();
                        this.sprites[ type ] = Game.Sprites[ sprite ];
                        this.$sprites.append( '<div class="sprite ' + ( type == 'terrain.land' ? 'active' : '' ) + '" data-type="' + type + '"><img src="' + this.sprites[ type ].src + '"></div>' );
                    }
                }
            }
        }
        this.initEditing();
    },
    initTools: function() {
        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentTool,
            rectSize = TILESIZE / 9;

        i = 0;
        for ( var j in this.tools ) { i++; }

        for ( var i in this.tools ) {
            currentTool = this.tools[ i ];
            tempCanvas = document.createElement( 'canvas' );
            tempCanvas.height = currentTool.length * rectSize;
            tempCanvas.width = currentTool[0].length * rectSize;
            tempContext = tempCanvas.getContext( '2d' );
            for ( j in currentTool ) {
                for ( k in currentTool[ j ] ) {
                    tempContext.fillStyle = currentTool[ j ][ k ];
                    tempContext.fillRect( k * rectSize, j * rectSize, rectSize, rectSize );
                }
            }
            dataURL = tempCanvas.toDataURL( 'image/png' );
            this.toolSprites[i] = this.createSprite( dataURL );

            this.$tools.append( '<div class="tool ' + ( i == 'fill' ? 'active' : '' ) + '" data-type="' + i + '"><img src="' + dataURL + '"></div>' );
        }
    },
    toolSprites: {},
    tools: {
        'rectangle': [
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ]
        ],
        'remove': [
            [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
            [ "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent" ],
            [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ]
        ],
        'fill': [
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ]
        ],
        'pencil': [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ],
            [ "transparent", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent" ],
            [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
            [ "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        'save': [
            [ "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent" ],
            [ "#ffffff", "rgba(0,0,0,0)", "#ffffff", "transparent", "transparent", "#ffffff", "transparent", "rgba(0,0,0,0)", "#ffffff" ],
            [ "#ffffff", "transparent", "#ffffff", "transparent", "transparent", "#ffffff", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff" ]
        ],
        'preview': [
            [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
            [ "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "#ffffff", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "#ffffff", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "#ffffff", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "#ffffff" ],
            [ "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent" ],
            [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ]
        ]
    },
    sprites: {},
    createSprite: function( path ) {
        var image = new Image();
        image.src = path;
        return image;
    },
    levelName: function() {
        return $( '#level-name' ).val();
    },
    save: function() {
        var lev = [];
        for ( var i = 0, len = this.level.length; i < len; i++ ) {
            var str = '',
                count = 0,
                currentType;
            for ( var j = 0, len2 = this.level[i].length; j < len2; j++ ) {
                if ( !currentType || currentType != this.level[i][j] ) {
                    if ( count ) {
                        if ( str.length ) {
                            str += '|' + currentType + '*' + count;
                        } else {
                            str = currentType + '*' + count;
                        }
                    }
                    currentType = this.level[i][j];
                    count = 1;
                } else {
                    count++;
                }
            }
            if ( count ) {
                if ( str.length ) {
                    str += '|' + currentType + '*' + count;
                } else {
                    str = currentType + '*' + count;
                }
            }
            lev[i] = str;
        }

        var json = JSON.stringify( lev, undefined, 4 );
        json = json.replace( /\[ "/, '[\n    ' )
                   .replace( /, "/, ',\n    "' );
        window.open( "data:text/plain,'': new Game.Level( \'land\', \'\', null, " + encodeURIComponent( json ) + ")," );
    },
    preview: function() {
        Editor.$canvas.hide();
        Game.Levels.preview = new Game.Level( null, Editor.levelName(), null, this.level );
        Game.skipResize = true;
        Game.Editing = false;
        Game.init( 'preview' );
    },
    stopPreview: function() {
        Game.stop();
        Game.Editing = true;
        delete Game.Levels[ 'preview' ];
        Editor.$game.find( 'canvas:last' ).remove();
        Editor.$canvas.show();
    }
};
