/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Editor = {
    width: 50,
    height: 25,
    paintSprite: 'terrain.land',
    gridEnabled: true,
    $game: $( '#game' ),
    $sprites: $( '#sprites' ),
    $tools: $( '#tools' ),
    $rectangle: $( '#rectangle-tool' ),
    $addColumn: $( '#add-column' ),
    $removeColumn: $( '#remove-column' ),
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
            maxWidth = Editor.width * Game.unit,
            maxHeight = Editor.height * Game.unit;

        if ( right >= 0 && right < maxWidth && bottom >= 0 && bottom < maxHeight ) {
            Editor.$rectangle.width( dx );
            Editor.$rectangle.height( dy );
        }
    },
    rectangleStop: function( dt, dx, dy ) {
        var left = dt.startX - Editor.$game.offset().left,
            top = dt.startY - Editor.$game.offset().top,
            right = left + dx,
            bottom = top + dy,
            i, j;

        left = Math.floor( left / 18 );
        top = Math.floor( top / 18 );
        right = Math.ceil( right / 18 );
        bottom = Math.ceil( bottom / 18 );

        for ( i = top; i < bottom; i++ ) {
            for ( j = left; j < right; j++ ) {
                Editor.level[i][j] = Editor.paintSprite;
            }
        }

        Editor.drawLevel();
        Editor.$rectangle.hide();
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
        x = Math.floor( ( dx + dt.startX - Editor.$game.offset().left + Editor.$game.scrollLeft() ) / Game.unit );
        y = Math.floor( ( dy + dt.startY - Editor.$game.offset().top ) / Game.unit );

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
        this.canvas.width = Game.unit * Editor.width;
        this.canvas.height = Game.unit * Editor.height;
        document.getElementById( 'game' ).appendChild( this.canvas );
        this.ctx = this.canvas.getContext( '2d' );
    },
    drawLevel: function() {
        var sprite, i, j;

        this.ctx.clearRect( 0, 0, Game.unit * Editor.width, Game.unit * Editor.height );

        if ( this.gridEnabled ) {
            this.ctx.fillStyle = "#222";
            for ( i = 0; i < this.width; i++ ) {
                this.ctx.fillRect( i * Game.unit, 0, 1, this.height * Game.unit );
            }

            for ( i = 0; i < this.height; i++ ) {
                this.ctx.fillRect( 0, i * Game.unit, this.width * Game.unit, 1 );
            }
        }

        for ( i in this.level ) {
            for ( j in this.level[i] ) {
                sprite = this.level[i][j];
                if ( sprite != 'blank' ) {
                    this.ctx.drawImage( this.sprites[ sprite ], j * Game.unit, i * Game.unit );
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

        Editor.canvas.width = Editor.width * Game.unit;
        Editor.drawLevel();
    },
    removeColumn: function() {
        var i;
        for ( i in Editor.level ) {
            Editor.level[i].pop();
        }
        Editor.width--;

        Editor.canvas.width = Editor.width * Game.unit;
        Editor.drawLevel();
    },
    initSprites: function () {
        var gameObjects = [
                Game.Entity.Terrain,
                Game.Entity.Hero.Man,
                Game.Entity.Enemy,
                Game.Entity.Interactable
            ],
            i, j, k,
            obj, bitmap, type,
            tempCanvas, tempContext,
            dataURL, currentSprite,
            rectSize = Game.unit / 9;

        for ( i in gameObjects ) {
            obj = gameObjects[i];
            if ( obj.prototype && obj.prototype.bitmaps ) {
                if ( obj.prototype.bitmaps[0] ) {
                    bitmap = obj.prototype.bitmaps[0];
                    type = obj.prototype.type.toLowerCase();
                    this.bitmaps[ type ] = bitmap;
                }
            }
            for ( j in obj ) {
                if ( obj[j].prototype && obj[j].prototype.bitmaps ) {
                    if ( obj[j].prototype.bitmaps[0] ) {
                        bitmap = obj[j].prototype.bitmaps[0];
                        type = obj[j].prototype.type.toLowerCase();
                        this.bitmaps[ type ] = bitmap;
                    }
                }
            }
        }

        var i = 0;
        for ( var j in this.bitmaps ) { i++; }
        this.totalImages += i;

        for ( i in this.bitmaps ) {
            currentSprite = this.bitmaps[ i ];
            tempCanvas = document.createElement( 'canvas' );
            tempCanvas.height = currentSprite.length * rectSize;
            tempCanvas.width = currentSprite[0].length * rectSize;
            tempContext = tempCanvas.getContext( '2d' );
            for ( j in currentSprite ) {
                for ( k in currentSprite[ j ] ) {
                    tempContext.fillStyle = currentSprite[ j ][ k ];
                    tempContext.fillRect( k * rectSize, j * rectSize, rectSize, rectSize );
                }
            }
            dataURL = tempCanvas.toDataURL( 'image/png' );
            this.sprites[i] = this.createSprite( dataURL );

            this.$sprites.append( '<div class="sprite ' + ( i == 'terrain.land' ? 'active' : '' ) + '" data-type="' + i + '"><img src="' + dataURL + '"></div>' );
        }
    },
    initTools: function() {
        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentTool,
            rectSize = Game.unit / 9;

        i = 0;
        for ( var j in this.tools ) { i++; }
        this.totalImages += i;

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
    bitmaps: {},
    spriteCount: 0,
    imageLoaded: function() {
        if ( this.spriteCount >= this.totalImages - 1 ) {
            this.initEditing();
            return;
        }
        this.spriteCount++;
    },
    createSprite: function( path ) {
        var image = new Image();
        image.onload = function() {
            Editor.imageLoaded();
        };
        image.src = path;
        return image;
    },
    save: function() {
        var json = JSON.stringify( this.level, undefined, 4 );
        json = json.replace( /",\n(\s)*/g, '", ' ).
                    replace( /\[\n\s*"/g, '[ "' ).
                    replace( /"\n\s*\]/g, '" ]' );
        window.open( 'data:text/json,' + encodeURIComponent( json ) );
    },
    preview: function() {
        Editor.$canvas.hide();
        Game.Levels.push( new Game.Level( this.level ) );
        Game.skipResize = true;
        Game.init( Game.Levels.length - 1 );
    },
    stopPreview: function() {
        Game.stop();
        Game.Levels.pop();
        Editor.$game.find( 'canvas:last' ).remove();
        Editor.$canvas.show();
    }
};
