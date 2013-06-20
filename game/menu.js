/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */


Game.Menu = Class.extend({
    titleText: 'MENU',
    init: function( left, top, width, height, lineWidth ) {
        this.x = left;
        this.y = top;
        this.padding = 40;
        this.paddingLeft = this.padding + 50;
        this.headerHeight = 30;
        this.paddingTop = this.headerHeight + this.padding;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 1;
    },
    data: [],
    show: function() {
        var self = this;

        this.requestID = requestAnimationFrame(function() {
            self.loop();
        });
    },
    exit: function() {},
    loop: function() {
        var self = this;

        // Left
        if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) {
            this.left();
            Game.keysDown[37] = 'locked';
        }
        // Up
        if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) {
            this.up();
            Game.keysDown[38] = 'locked';
        }
        // Right
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) {
            this.right();
            Game.keysDown[39] = 'locked';
        }
        // Down
        if ( 40 in Game.keysDown && Game.keysDown[ 40 ] != 'locked' ) {
            this.down();
            Game.keysDown[40] = 'locked';
        }

        // Enter
        if ( 13 in Game.keysDown && Game.keysDown[ 13 ] != 'locked' ) {
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
    selected: 0,
    rowSize: 2,
    selectionPadding: 7,
    selectionLineWidth: 2,
    selectionColor: '#00ff00',
    itemWidth: Game.unit * 3,
    itemHeight: Game.unit * 3,
    contents: function() {
        this.title();

        var item,
            spacing = 6 * Game.unit,
            x, y;

        for ( var i = 0; i < this.data.length; i++ ) {
            item = this.data[i];
            x = this.x + this.paddingLeft + ( i % this.rowSize ) * spacing;
            y = this.y + this.paddingTop + spacing * Math.floor( i / this.rowSize );
            if ( this.selected == i ) {
                if ( item.sprite ) {

                    this.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        this.itemWidth + this.selectionPadding * 2 - 2,
                                        this.itemHeight + this.selectionPadding * 2 - 2,
                                        this.selectionLineWidth,
                                        this.selectionColor );

                } else {

                    this.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        Game.ctx.measureText( item.text ).width,
                                        30,
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
        }
    },
    title: function() {
        Game.ctx.font = 'normal 20px uni05';
        Game.ctx.fillStyle = '#000';
        Game.ctx.textAlign = 'center';
        Game.ctx.fillText( this.titleText, Game.viewportWidth / 2, this.y + 24 );
    },
    overlay: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
    },
    container: function() {
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( this.x, this.y, this.width, this.height );

        this.drawRectangle( this.x, this.y, this.width, this.height, this.lineWidth, '#00ff00' );
        // Header
        Game.ctx.fillRect( this.x + this.lineWidth, this.y + this.lineWidth, this.width - this.lineWidth, this.headerHeight );
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
    titleText: 'PAUSE'
});

Game.Menu.GameOver = Game.Menu.extend({
    titleText: 'GAME OVER',
    init: function( left, top, width, height, lineWidth ) {
        this._super( left, top, width, height, lineWidth );
        this.paddingLeft = 185;
        this.paddingTop = 110;
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
            Game.init( 'intro' );
        }
    }
});

Game.Menu.Transform = Game.Menu.extend({
    titleText: 'MORPH',
    data: [
        {
            className: Game.Entity.Hero.Block,
            sprite: 'block-double'
        },
        {
            className: Game.Entity.Hero.Man,
            sprite: 'man-right-double'
        },
        {
            className: Game.Entity.Hero.Boat,
            sprite: 'boat-right-double'
        },
        {
            className: Game.Entity.Hero.Frog,
            sprite: 'frog-right-double'
        },
        {
            className: Game.Entity.Hero.Plane,
            sprite: 'plane-right-double'
        },
        {
            className: Game.Entity.Hero.Jellyfish,
            sprite: 'jellyfish-double'
        },
        {
            className: Game.Entity.Hero.Clock,
            sprite: 'clock-double'
        }
    ],
    rowSize: 4,
    exit: function() {
        Game.startTransformAnimation( this.data[ this.selected ].className );
    }
});
