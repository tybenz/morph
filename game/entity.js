Game.Entity = Class.extend({
    type: 'Entity',
    bitmaps: [],
    activeSprite: 0,
    visible: true,
    pos: {},
    collisions: [],
    init: function( x, y ) {
        this.sprites = [];
        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentSprite,
            rectSize = Game.unit / 9;
        if ( x !== null && y !== null ) {
            this.x = x;
            this.y = y;
        }
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
            this.sprites.push( Game.Sprite( dataURL, this.type ) );
        }
    },
    x: null,
    y: null,
    render: function() {
        if ( this.visible ) {
            Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.x, this.y );
        }
    },
    collideWith: function(entity) { 
	// by default, do nothing 
    },
    update: function() {
	//by default, do nothing
    },
});
