/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity = Class.extend({
    type: 'Entity',
    ignoreGravity: false,
    width: 18,
    height: 18,
    maxVelocityY: 7,
    drawLayer: 0,
    init: function( x, y ) {
        this.activeSprite = 0;
        this.visible = true;
        this.sprites = [];
        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentSprite,
            rectSize = Game.unit / 9;
        if ( x !== null && y !== null ) {
            this.pos = new Game.Vector( x, y );
        } else {
            this.pos = new Game.Vector( 0, 0 );
        }
        this.velocity = new Game.Vector( 0, 0 );
        this.gravity = new Game.Vector( 0, 0.001 );
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
        // this.invalidateRect( this.pos.y, this.pos.x + this.width, this.pos.y + this.height, this.pos.x );
        // Game.redrawEntities[this.drawLayer].push( this );
    },
    update: function( timeDiff ) {
        if ( !this.ignoreGravity ) {
            this.applyGravity( timeDiff );
        }
        var positionChange = this.velocity.multiply(timeDiff)
        positionChange.y = Math.min( positionChange.y, this.maxVelocityY );
        var newPos = this.pos.add(positionChange);
        if ( positionChange.y || positionChange.x ) {
            this.invalidateRect( newPos.x, newPos.y );
        }
        this.pos = newPos;
    },
    invalidateRect: function( x, y ) {
        var oldX = this.pos.x,
            oldY = this.pos.y,
            width = this.width,
            height = this.height,
            top = oldY <= y ? oldY : y,
            left = oldX <= x ? oldX : x,
            bottom = ( oldY+height ) >= ( y+height ) ? oldY + height : y + height,
            right = ( oldX+width ) >= ( x+width ) ? oldX + width : x + width;

        Game.invalidateRect( top, right, bottom, left );
        Game.redrawEntities[this.drawLayer].push( this );
    },
    render: function() {
        if ( this.visible ) {
            Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.pos.x, this.pos.y );
        }
    },
    getCollisions: function( entity ) {
        var src = {
                top: Math.round( this.pos.y ),
                bottom: Math.round( this.pos.y + this.height ),
                left: Math.round( this.pos.x ),
                right: Math.round( this.pos.x + this.width )
            },
            target = {
                top: Math.round( entity.pos.y ),
                bottom: Math.round( entity.pos.y + entity.height ),
                left: Math.round( entity.pos.x ),
                right: Math.round( entity.pos.x + entity.width )
            },
            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) || ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) || ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAndRightAligned = ( src.left == target.left && src.right == target.right ),
            topAndBottomAligned = ( src.top == target.top && src.bottom == target.bottom ),
            collisions = {
                rightEdge: ( betweenTopAndBottom || topAndBottomAligned ) && Math.abs( target.left - src.right ) < 5,
                leftEdge: ( betweenTopAndBottom || topAndBottomAligned ) && Math.abs( target.right - src.left ) < 5,
                topEdge: ( betweenLeftAndRight || leftAndRightAligned ) && Math.abs( target.bottom - src.top ) < 5,
                bottomEdge: ( betweenLeftAndRight || leftAndRightAligned ) && Math.abs( target.top - src.bottom ) < 5,
                exact: ( leftAndRightAligned && topAndBottomAligned )
            };
        // We iterate through all collision types, if we any are set to true
        // we return the entire object. Otherwise we return an empty object.
        for ( var i in collisions ) {
            if ( collisions[i] ) {
                return collisions;
            }
        }
        return false;
    },
    hasCollisionWith: function( entityType ) {
        var i = 0, collisions;
        for ( ; i < Game.currentLevel.entities.length; i++ ) {
            entity = Game.currentLevel.entities[i];
            collisions = this.getCollisions( entity );
            if ( collisions && entity.type == entityType ) {
                return collisions;
            }
        }
        return {};
    },
    collideWith: function( entity, collisionType ) {
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( this.velocity.y > 0 && collisionType == 'bottomEdge' ) {
                    this.velocity.y = 0;
                    this.pos.y = entity.pos.y - entity.height;
                }
                if ( this.velocity.y < 0 && collisionType == 'topEdge' ) {
                    this.velocity.y = 0;
                    this.pos.y = entity.pos.y + entity.height;
                }
                break;
            default: break;
        }
    },
    applyGravity: function( timeDiff ) {
        var gravitationalForce = this.gravity.multiply( timeDiff );
        if ( !this.hasCollisionWith( 'Terrain.Land' ).bottomEdge ) {
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});
