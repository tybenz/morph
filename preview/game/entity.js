/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity = Class.extend({
    type: 'Entity',
    ignoreGravity: false,
    maxVelocityY: 7,
    drawLayer: 0,
    init: function( x, y ) {
        this.width = this.width || Game.unit;
        this.height = this.height || Game.unit;
        this.lastAnimated = Date.now();
        this.activeSprite = 0;
        this.visible = true;
        this.sprites = [];

        var i, j, k,
            tempCanvas, tempContext,
            dataURL, currentSprite,
            rectSize = Game.unit / 9;

        //Entities should be initialized with an x and y
        if ( x !== null && y !== null ) {
            this.pos = new Game.Vector( x, y );
        } else {
            this.pos = new Game.Vector( 0, 0 );
        }
        this.velocity = new Game.Vector( 0, 0 );
        this.gravity = new Game.Vector( 0, Game.unit / 18000 );

        //Iterate through an array of bitmaps and cache them as images
        for ( i in this.bitmaps ) {
            currentSprite = this.bitmaps[ i ];
            tempCanvas = document.createElement( 'canvas' );
            tempCanvas.width = this.width;
            tempCanvas.height = this.height;
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
        Game.drawLayers[this.drawLayer].push( this );
    },
    //Animate method uses the entities dictionary of animationStates
    //and cycles through sprites in each animation
    animate: function() {
        var oldSprite = this.activeSprite,
            wasVisible = this.visible,
            isVisible,
            timeToAnimate = this.animationStates
                && this.animationStates[ this.state ]
                && ( Date.now() - this.lastAnimated ) > this.animationStates[ this.state ].delta;
        if ( timeToAnimate ) {
            var nextSprite = this.nextSprite();
            if ( nextSprite != 'invisible' ) {
                this.activeSprite = nextSprite;
                this.visible = true;
                isVisible = true;
            } else {
                this.visible = false;
            }
            this.lastAnimated = Date.now();
        }
        //Return a bool to tell invalidRect if the entity animated
        return oldSprite != this.activeSprite || ( !wasVisible && isVisible );
    },
    //Grabbing the next sprite in each animation
    nextSprite: function() {
        var aState = this.animationStates[ this.state ];
        if ( !aState.current ) {
            aState.current = 0;
            aState.initial = this.activeSprite;
        }
        aState.current++;
        if ( aState.times == 'infinite' || Math.floor( aState.current / aState.sequence.length ) < aState.times ) {
            var nextSprite = aState.sequence[ aState.current % aState.sequence.length ];
            //Initial and invisible are special values within an animation sequence
            if ( nextSprite == 'initial' ) {
                nextSprite = this.activeSprite;
            } else if ( nextSprite == 'invisible' ) {
                nextSprite = 'invisible';
            }
            return nextSprite;
        }
        return this.activeSprite;
    },
    update: function( timeDiff ) {
        //Copy pos into oldPos
        this.oldPos = new Game.Vector( this.pos.x, this.pos.y );

        //Bool that will tell us if the entity animated
        var animated = this.animate( timeDiff );

        //Gravity
        if ( !this.ignoreGravity ) {
            this.applyGravity( timeDiff );
        }

        //Change position based on velocity
        var positionChange = this.velocity.multiply(timeDiff)
        positionChange.y = Math.min( positionChange.y, this.maxVelocityY );
        this.pos = this.pos.add( positionChange );

        //invalidateRect if the entity moved or animated
        if ( this.oldPos.x != this.pos.x || this.oldPos.y != this.pos.y || animated || this.transformed ) {
            this.invalidateRect();
        }
    },
    go: true,
    invalidateRect: function() {
        var newX = this.pos.x,
            newY = this.pos.y,
            oldX = this.oldPos.x,
            oldY = this.oldPos.y,
            width = this.width,
            height = this.height,
            top = oldY <= newY ? oldY : newY,
            left = oldX <= newX ? oldX : newX,
            bottom = ( oldY + height ) >= ( newY + height ) ? oldY + height : newY + height,
            right = ( oldX + width ) >= ( newX + width ) ? oldX + width : newX + width;

        //Pass a rect (position/dimensions) to the global invalidRect
        Game.invalidateRect( top, right, bottom, left );
    },
    render: function() {
        //Render the activeSprite
        if ( this.visible ) {
            Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.pos.x, this.pos.y );
        }
    },
    //Two entities -> collision dictionary or false if no collision
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
            leftOrRightAligned = ( src.left == target.left || src.right == target.right ),
            collisions = {
                rightEdge: ( betweenTopAndBottom || topAndBottomAligned ) && Math.abs( target.left - src.right ) < 5,
                leftEdge: ( betweenTopAndBottom || topAndBottomAligned ) && Math.abs( target.right - src.left ) < 5,
                topEdge: ( betweenLeftAndRight || leftAndRightAligned ) && Math.abs( target.bottom - src.top ) < 5,
                bottomEdge: ( leftOrRightAligned || betweenLeftAndRight || leftAndRightAligned ) && Math.abs( target.top - src.bottom ) < 5,
                exact: ( leftAndRightAligned && topAndBottomAligned ),
                overlapping: betweenTopAndBottom && betweenLeftAndRight,
                overlappingVertical: leftAndRightAligned && betweenTopAndBottom,
                overlappingHorizontal: topAndBottomAligned && betweenLeftAndRight
            };
        // We iterate through all collision types, if we any are set to true
        // we return the entire object. Otherwise we return an empty object.
        for ( var i in collisions ) {
            if ( collisions[i] ) {
                collisions.entity = entity;
                return collisions;
            }
        }
        return false;
    },
    //Checks all entities for collision with a specific type
    hasCollisionWith: function( entityType ) {
        var i = 0, collisions;
        for ( ; i < Game.currentLevel.entities.length; i++ ) {
            entity = Game.currentLevel.entities[i];
            collisions = this.getCollisions( entity );
            if ( collisions && entity.type == entityType ) {
                return collisions;
            }
        }
        return false;
    },
    //Collision handler -> to be extended by derived entities
    //By default entities stop moving when they hit land
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
                if ( this.velocity.x < 0 && collisionType == 'leftEdge' ) {
                    this.velocity.x = 0;
                    this.pos.x = entity.pos.x + entity.width;
                }
                if ( this.velocity.x > 0 && collisionType == 'rightEdge' ) {
                    this.velocity.x = 0;
                    this.pos.x = entity.pos.x - entity.width;
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
