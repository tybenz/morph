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
        this.gravity = new Game.Vector( 0, 0.001 ); // Changed to test collisions

        this.oldPos = this.pos;

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
    generateNextCoords: function( timeDiff ) {
        //Bool that will tell us if the entity animated
        this.animated = this.animate( timeDiff );
        this.oldPos = new Game.Vector( this.pos.x, this.pos.y );

        //Gravity
        if ( !this.ignoreGravity ) {
            this.applyGravity( timeDiff );
        }

        //Change position based on velocity
        // Maybe x's position change should go here too.
        var positionChange = this.velocity.multiply(timeDiff)
        this.pos = this.pos.add( positionChange );
    },
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
            Game.ctx.drawImage( this.sprites[ this.activeSprite ], this.pos.x - Game.viewportOffset, this.pos.y );
        }
    },
    //Two entities -> collision dictionary or false if no collision
    getCollisions: function( entity ) {
        var src = {
                top: Math.round( this.pos.y ),
                bottom: Math.round( this.pos.y + this.height ),
                left: Math.round( this.pos.x ),
                right: Math.round( this.pos.x + this.width ),
                oldTop: Math.round( this.oldPos.y ),
                oldBototm: Math.round( this.oldPos.y + this.height ),
                oldLeft: Math.round( this.oldPos.x ),
                oldRight: Math.round( this.oldPos.x + this.width )
            },
            target = {
                top: Math.round( entity.pos.y ),
                bottom: Math.round( entity.pos.y + entity.height ),
                left: Math.round( entity.pos.x ),
                right: Math.round( entity.pos.x + entity.width )
            },

            COLLISION_BUFFER = 5,

            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) ||
                ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) ||
                ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAndRightAligned = ( src.left == target.left && src.right == target.right ),
            topAndBottomAligned = ( src.top == target.top && src.bottom == target.bottom ),
            leftOrRightAligned = ( src.left == target.left || src.right == target.right ),

            movingRight = src.oldRight < src.right,
            movingLeft = src.oldLeft > src.left,
            movingUp = src.oldTop > src.top,
            movingDown = src.oldBottom < src.bottom,

            skipRight = ( betweenTopAndBottom || topAndBottomAligned ) && src.right < target.left && 
                ( src.left > target.oldRight || src.right >= target.oldLeft ),
            skipLeft = ( betweenTopAndBottom || topAndBottomAligned ) && src.left > target.right && 
                ( src.right < target.oldLeft || src.left <= target.oldRight ),
            skipDown = ( betweenLeftAndRight || leftAndRightAligned ) && src.bottom < target.top && 
                ( src.top > target.oldBottom || src.bottom >= target.oldTop ),
            skipUp = ( betweenLeftAndRight || leftAndRightAligned ) && src.top > target.bottom && 
                ( src.bottom < target.oldTop || src.top <= target.oldBottom ),

            // The problem with only allowing collisions when this is moving, is that what happens when
            // this is NOT moving and it gets hit? The offending entity must be able to handle 
            // the behavior of this too!
            collisions = {
                /*
                rightEdge: ( ( betweenTopAndBottom || topAndBottomAligned ) &&
                    Math.abs( target.left - src.right ) < COLLISION_BUFFER ) || skipRight,
                leftEdge: ( ( betweenTopAndBottom || topAndBottomAligned ) &&
                    Math.abs( target.right - src.left ) < COLLISION_BUFFER ) || skipLeft,
                topEdge: ( ( betweenLeftAndRight || leftAndRightAligned ) &&
                    Math.abs( target.bottom - src.top ) < COLLISION_BUFFER ) || skipUp,
                bottomEdge: ( ( betweenLeftAndRight || leftAndRightAligned ) &&
                    Math.abs( target.top - src.bottom ) < COLLISION_BUFFER ) || skipDown,
                */
                exact: leftAndRightAligned && topAndBottomAligned,
                overlapping: betweenTopAndBottom && betweenLeftAndRight,
                overlappingVertical: leftAndRightAligned && ( betweenTopAndBottom || skipDown || skipUp ),
                overlappingHorizontal: topAndBottomAligned && ( betweenLeftAndRight || skipRight || skipLeft )
            };

        // If there are any collisions we build an object of only those that are true
        // If none, we return false
        var returnCollisions = {},
            count = 0;
        for ( var i in collisions ) {
            if ( collisions[i] ) {
                returnCollisions.entity = entity;
                returnCollisions[i] = collisions[i];
                count++;
            }
        }
        if ( count ) {
            return returnCollisions;
        }
        return false;
    },
    getAdjacents: function( entity ) {
        var src = {
                top: Math.round( this.oldPos.y ),
                bottom: Math.round( this.oldPos.y + this.height ),
                left: Math.round( this.oldPos.x ),
                right: Math.round( this.oldPos.x + this.width ),
            },
            target = {
                top: Math.round( entity.oldPos.y ),
                bottom: Math.round( entity.oldPos.y + entity.height ),
                left: Math.round( entity.oldPos.x ),
                right: Math.round( entity.oldPos.x + entity.width )
            },
            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) ||
                ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) ||
                ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAndRightAligned = ( src.left == target.left && src.right == target.right ),
            topAndBottomAligned = ( src.top == target.top && src.bottom == target.bottom ),
            directions = {
                exact: leftAndRightAligned && topAndBottomAligned,
                top: ( betweenLeftAndRight || leftAndRightAligned ) && src.top == target.bottom,
                bottom: ( betweenLeftAndRight || leftAndRightAligned ) && src.bottom == target.top,
                left: ( betweenTopAndBottom || topAndBottomAligned ) && src.left == target.right,
                right: ( betweenTopAndBottom || topAndBottomAligned ) && src.right == target.left
            };
        // If there are any entities adjacent, we build an object of only those that are true
        // If none, we return false
        var returnDirections = {},
            count = 0;
        for ( var i in directions ) {
            if ( directions[i] ) {
                returnDirections.entity = entity;
                returnDirections[i] = directions[i];
                count++;
            }
        }
        if ( count ) {
            return returnDirections;
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
    adjacentTo: function( entityType, direction ) {
        var i = 0, directions,
            top, bottom, left, right;
        for ( ; i < Game.currentLevel.entities.length; i++ ) {
            entity = Game.currentLevel.entities[i];
            if ( entity.type == entityType ) {
                directions = this.getAdjacents( entity );
                if ( direction ) {
                    if ( directions && direction in directions ) {
                        return true;
                    }
                } else if ( directions ) {
                    return directions;
                }
            }
        }
        return false;
    },
    adjacentToLevelEdge: function( direction ) {
        switch( direction ) {
            case 'left':
                return this.pos.x <= 0;
            case 'right':
                return ( this.pos.x + this.width ) >= Game.currentLevel.width;
            case 'top':
                return this.pos.y <= 0;
                break;
            case 'bottom':
                return ( this.pos.y + this.height ) >= Game.currentLevel.height;
                break;
            default: return false;
        }
    },
    //Collision handler -> to be extended by derived entities
    //By default entities stop moving when they hit land
    collideWith: function( entity, collisionTypes ) {
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( this.velocity.y > 0 && collisionTypes ) {
                    this.velocity.y = 0;
                    if ( this.oldPos.y % Game.unit == 0 ) {
                        this.pos.y = this.oldPos.y;
                    } else {
                        this.pos.y = entity.pos.y - this.height;
                    }
                }
                if ( this.velocity.y < 0 && collisionTypes ) {
                    this.velocity.y = 0;
                    this.pos.y = entity.pos.y + this.height;
                }
                break;
            default: break;
        }
    },
    applyGravity: function( timeDiff ) {
        if ( !this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            var gravitationalForce = this.gravity.multiply( timeDiff );
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});
