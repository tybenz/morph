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
            Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.x, this.y );
        }
    }
});
