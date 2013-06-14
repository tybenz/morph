/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Menu = Class.extend({
    titleText: 'MENU',
    init: function( left, top, width, height, lineWidth ) {
        this.top = top;
        this.padding = 40;
        this.headerHeight = 30;
        this.paddingTop = this.headerHeight + this.padding;
        this.left = left;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 1;
    },
    render: function() {
        this.overlay();

        this.container();

        this.contents();
    },
    contents: function() {
        this.title();
    },
    title: function() {
        Game.ctx.font = 'normal 20px uni05';
        Game.ctx.fillStyle = '#000';
        Game.ctx.textAlign = 'center';
        Game.ctx.fillText( this.titleText, Game.viewportWidth / 2, this.top + 24 );
    },
    overlay: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
    },
    container: function() {
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( this.left, this.top, this.width, this.height );

        this.drawRectangle( this.left, this.top, this.width, this.height, this.lineWidth, '#00ff00' );
        // Header
        Game.ctx.fillRect( this.left + this.lineWidth, this.top + this.lineWidth, this.width - this.lineWidth, this.headerHeight );
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
    }
});

Game.Menu.Pause = Game.Menu.extend({
    titleText: 'PAUSE'
});

Game.Menu.Transform = Game.Menu.extend({
    titleText: 'MORPH',
    show: function() {
        var self = this;
        this.hidden = false;

        this.requestID = requestAnimationFrame(function() {
            self.loop();
        });
    },
    heroList: [
        Game.Entity.Hero.Block,
        Game.Entity.Hero.Man,
        Game.Entity.Hero.Boat,
        Game.Entity.Hero.Frog
    ],
    selected: 0,
    rowSize: 4,
    contents: function() {
        this._super();

        var hero,
            spacing = 6 * Game.unit,
            x, y;

        for ( var i = 0; i < this.heroList.length; i++ ) {
            hero = this.heroList[i];
            x = this.left + this.padding + 50 + ( i % this.rowSize ) * spacing;
            y = this.top + this.paddingTop + spacing * Math.floor( i / this.rowSize );
            if ( this.selected == i ) {
                this.drawRectangle( x - 7, y - 7, 3 * Game.unit + 12, 3 * Game.unit + 12, 2, '#00ff00' );
            }
            Game.ctx.drawImage( Game.Sprites[ hero.prototype.initialSprite + '-double' ], x, y );
        }
    },
    loop: function() {
        var self = this;

        //Left
        if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) {
            this.moveCursorLeft();
            Game.keysDown[37] = 'locked';
        }
        //Up
        if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) {
            this.moveCursorUp();
            Game.keysDown[38] = 'locked';
        }
        //Right
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) {
            this.moveCursorRight();
            Game.keysDown[39] = 'locked';
        }
        //Down
        if ( 40 in Game.keysDown && Game.keysDown[ 40 ] != 'locked' ) {
            this.moveCursorDown();
            Game.keysDown[40] = 'locked';
        }
        //Space
        if ( 13 in Game.keysDown && Game.keysDown[ 13 ] != 'locked' ) {
            Game.startTransformAnimation( this.heroList[ this.selected ] );
        } else {
            Game.invalidateRect( 0, Game.viewportWidth + Game.viewportOffset, Game.viewportHeight, Game.viewportOffset );
            Game.render( 0 );
            this.render();

            this.requestID = requestAnimationFrame(function() {
                self.loop();
            });
        }
    },
    moveCursorUp: function() {
        if ( this.selected - this.rowSize >= 0 ) {
            this.selected -= this.rowSize;
        }
    },
    moveCursorDown: function() {
        if ( this.selected + this.rowSize < this.heroList.length ) {
            this.selected += this.rowSize;
        }
    },
    moveCursorLeft: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    moveCursorRight: function() {
        if ( ( this.selected + 1 ) % this.rowSize < this.rowSize && this.selected + 1 < this.heroList.length ) {
            this.selected++;
        }
    },
});
