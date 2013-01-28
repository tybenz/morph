Game.Entity = Class.extend({
    type: 'Entity',
    sprites: [],
    activeSprite: 0,
    visible: true,
    pos: {},
    collisions: [],
    init: function( x, y ) {
        if ( x !== null && y !== null ) {
            this.x = x;
            this.y = y;
        }
    },
    x: null,
    y: null,
    render: function() {
        if ( this.visible ) {
            var activeSprite = this.sprites[ this.activeSprite ],
                rectSize = Game.unit / 9;
            for ( var i in activeSprite ) {
                for ( var j in activeSprite[ i ] ) {
                    Game.ctx.fillStyle = activeSprite[ i ][ j ];
                    Game.ctx.fillRect( this.x + j * rectSize, this.y + i * rectSize, rectSize, rectSize );
                }
            }
            // Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.x, this.y );
        }
    }
});
