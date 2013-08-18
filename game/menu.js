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
        Game.ctx.font = 'normal ' + MENU_HEADER_FONT_SIZE + 'px Helvetica, Arial, sans-serif';
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

})( Game, Settings, window, document );
