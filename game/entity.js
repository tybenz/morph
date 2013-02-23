Game.Entity = Class.extend({
    type: 'Entity',
    bitmaps: [],
    activeSprite: 0,
    visible: true,
    pos: {},
    collisions: [],
    init: function( x, y ) {
	//variables for free falling
	this.falling = true;
	this.timeFallBegan = Date.now();
	this.freeFallStartY = y;
	
	this.dead = false; 

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
    X_VEL : 0,
    Y_VEL : 0,
    GRAV: .001,
    xDirection: 1,
    gravity: function(timeNow) { 
	var t = timeNow - this.timeFallBegan;		       
	this.newY = this.freeFallStartY - this.Y_VEL*t + this.GRAV*t*t;
    },
    CONTACT_BUFFER : 0,
    hasCollision: function(entity) {
	if ( (Math.abs(this.y - entity.y) < Game.unit + this.CONTACT_BUFFER &&
	      Math.abs(this.x - entity.x) < Game.unit + this.CONTACT_BUFFER) || 
	     (entity.falling && //does y trajectory pass through on next time step? 
	      Math.abs(this.x - entity.x) < Game.unit + this.CONTACT_BUFFER &&
	      entity.y < this.y && entity.newY >= this.y) ) {
	    
	    return true;
	}
    },
    collideWith: function(entity, timeNow) {
	//default is to do nothing 
    },
    update: function() {
	if (this.falling) this.y = this.newY; 
	this.falling = true;
	this.x += this.xDirection*this.X_VEL;
    },
});
