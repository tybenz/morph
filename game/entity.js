/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity = Class.extend({
    type: 'Entity',
    maxVelocityY: 7,
    drawLayer: 0,
    initialState: 'still',
    states: {
        'still': {
            animation: null,
            actions: null
        }
    },
    changeState: function( state ) {
        if ( state != this.state ) {
            this.state = state;
            this.activeMove = 0;
            this.stateChanged = true;
        }
        this.stateChanged = false;
    },
    init: function( x, y ) {
        this.width = this.width || Game.unit;
        this.height = this.height || Game.unit;
        this.ignoreGravity = false;
        this.lastAnimated = Date.now();
        this.activeSprite = this.initialSprite || 'transparent';
        this.visible = true;
        this.sprites = [];
        this.changeState( this.initialState );

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
    //Animate method uses the entities dictionary of states
    //and cycles through sprites in each animation
    animate: function() {
        var animation = this.states[ this.state ].animation,
            oldSprite = this.activeSprite,
            wasVisible = this.visible,
            isVisible;

        if ( typeof animation == 'string' ) {
            this.activeSprite = animation;
        } else if ( animation ) {
            var timeToAnimate = ( Date.now() - this.lastAnimated ) > animation.delta;

            // Get next sprite
            if ( timeToAnimate ) {
                var nextSprite = this.activeSprite;

                this.activeAnimation = this.activeAnimation || 0;
                this.activeAnimation++;
                this.activeAnimation %= animation.sequence.length;
                if ( this.stateChanged ) {
                    this.activeAnimation = 0;
                }
                if ( animation.times == 'infinite' || Math.floor( this.activeAnimation / animation.sequence.length ) < animation.times ) {
                    nextSprite = animation.sequence[ this.activeAnimation % animation.sequence.length ];
                    if ( nextSprite == 'initial' ) {
                        nextSprite = this.activeSprite;
                    } else if ( nextSprite == 'invisible' ) {
                        nextSprite = 'invisible';
                    }
                }

                if ( nextSprite == 'invisible' ) {
                    this.visible = false;
                } else {
                    this.activeSprite = nextSprite;
                    this.visible = true;
                    isVisible = true;
                }

                this.lastAnimated = Date.now();
            }
        }

        //Return a bool to tell invalidRect if the entity animated
        return oldSprite != this.activeSprite || ( !wasVisible && isVisible );
    },
    // Checks dictionary of states for any "actions" and cycles through them if they exist
    // mostly used for enemies - AI
    performAction: function() {
        var actions = this.states[ this.state ].actions,
            actionObj;

        if ( actions ) {
            // Get active action
            this.activeAction = this.activeAction || 0;
            if ( this.stateChanged ) {
                this.activeAction = 0;
            }
            actionObj = actions[ this.activeAction ];

            // Define last action if not defined
            this.lastAction = this.lastAction || Date.now();

            if ( ( Date.now() - this.lastAction ) > actionObj.delta ) {
                if ( actionObj.until && actionObj.until.call( this ) ) {
                    this.activeAction++;
                    this.activeAction %= actions.length;
                }
                actionObj = actions[ this.activeAction ];

                actionObj.action.call( this );
                this.lastAction = Date.now();
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        //Bool that will tell us if the entity animated
        this.animated = this.animate( timeDiff );
        this.attached = false;
        this.detached = false;
        this.oldPos = new Game.Vector( this.pos.x, this.pos.y );

        this.performAction();

        //Gravity
        if ( !this.ignoreGravity ) {
            this.applyGravity( timeDiff );
        }

        //Change position based on velocity
        var positionChange = this.velocity.multiply( timeDiff );
        this.pos = this.pos.add( positionChange );
        if ( this.type == 'Interactable.Bullet' ) {
            /*
                OLD 468 324 entity.js:107
                VELOCITY -0.6 0.13636363636363635 entity.js:108
                POS 458.336400000524 326.19627272715366 
            */
        }
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
    attach: function( arr ) {
        var append = [], entityList;

        // Initialize the entitylist with yourself if necessary
        if ( !this.entityList || !this.entityList.length ) {
            this.entityList = [{
                entity: this,
                relativePos: { x: 0, y: 0 },
                oldDimensions: { width: this.width, height: this.height }
            }];
        }
        // Cache the entityList
        entityList = this.entityList;

        // Convert entity array to have relativePos and append
        for ( var i = 0; i < arr.length; i++ ) {
            entityList.push({
                entity: arr[i],
                relativePos: { x: arr[i].pos.x - this.pos.x, y: arr[i].pos.y - this.pos.y },
                oldDimensions: { width: arr[i].width, height: arr[i].height }
            });
        }


        this.refreshDimensions();
        this.attached = true;
    },
    detach: function( entity ) {
        var entityList = this.entityList ? this.entityList : [],
            relativePos;

        for ( var i = entityList.length - 1; i >= 0; i-- ) {
            relativePos = entityList[i].relativePos;
            if ( entityList[i].entity == entity ) {
                entity.pos = new Game.Vector( this.pos.x + relativePos.x, this.pos.y + relativePos.y );
                entityList.splice( i, 1 );
            }
        }

        this.refreshDimensions();
        this.detached = true;

        if ( this.entityList.length == 1 ) {
            this.entityList = [];
        }
    },
    refreshDimensions: function() {
        // Calculate top bottom left and right
        var entityList = this.entityList,
            entity, relativePos,
            top, bottom, left, right,
            entityTop, entityBottom,
            entityLeft, entityRight,
            oldX, oldY;

        for ( var i = 0; i < entityList.length; i++ ) {
            entity = entityList[i].entity;
            relativePos = entityList[i].relativePos;
            dimensions = entityList[i].oldDimensions;

            entityTop = this.pos.y + relativePos.y;
            entityBottom = this.pos.y + relativePos.y + dimensions.height;
            entityLeft = this.pos.x + relativePos.x;
            entityRight = this.pos.x + relativePos.x + dimensions.width;

            if ( top === undefined || entityTop < top ) {
                top = entityTop;
            }
            if ( bottom === undefined || entityBottom > bottom ) {
                bottom = entityBottom;
            }
            if ( left === undefined || entityLeft < left ) {
                left = entityLeft;
            }
            if ( right === undefined || entityRight > right ) {
                right = entityRight;
            }
        }

        for ( var i = 0; i < entityList.length; i++ ) {
            entity = entityList[i].entity;
            relativePos = entityList[i].relativePos;
            oldX = this.pos.x + relativePos.x;
            oldY = this.pos.y + relativePos.y;
            entityList[i].relativePos = { x: oldX - left, y: oldY - top };
        }

        this.height = bottom - top;
        this.width = right - left;
        this.pos.x = left;
        this.pos.y = top;
    },
    render: function() {
        //Render the activeSprite
        if ( this.visible ) {
            if ( this.entityList && this.entityList.length ) {
                // Iterate over entityList and render them relative to actual position
                for ( var i = 0; i < this.entityList.length; i++ ) {

                    var entity = this.entityList[i].entity,
                        relativePos = this.entityList[i].relativePos;

                    Game.ctx.drawImage( Game.Sprites[ entity.activeSprite ], this.pos.x + relativePos.x - Game.viewportOffset, this.pos.y + relativePos.y );

                }
            } else {
                Game.ctx.drawImage( Game.Sprites[ this.activeSprite ], this.pos.x - Game.viewportOffset, this.pos.y );
            }
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
                oldRight: Math.round( this.oldPos.x + this.width ),
                oldCenter: {
                    x: Math.round ( this.oldPos.x + ( this.width / 2 ) ),
                    y: Math.round ( this.oldPos.y + ( this.height / 2 ) ),
                },
                center: {
                    x: Math.round ( this.pos.x + ( this.width / 2 ) ),
                    y: Math.round ( this.pos.y + ( this.height / 2 ) ),
                }
            },
            target = {
                top: Math.round( entity.pos.y ),
                bottom: Math.round( entity.pos.y + entity.height ),
                left: Math.round( entity.pos.x ),
                right: Math.round( entity.pos.x + entity.width ),
                oldTop: Math.round( entity.oldPos.y ),
                oldBototm: Math.round( entity.oldPos.y + entity.height ),
                oldLeft: Math.round( entity.oldPos.x ),
                oldRight: Math.round( entity.oldPos.x + entity.width ),
                oldCenter: {
                    x: Math.round ( entity.oldPos.x + ( entity.width / 2 ) ),
                    y: Math.round ( entity.oldPos.y + ( entity.height / 2 ) ),
                },
                center: {
                    x: Math.round ( entity.pos.x + ( entity.width / 2 ) ),
                    y: Math.round ( entity.pos.y + ( entity.height / 2 ) ),
                }
            },

            betweenLeftAndRight = ( src.left < target.right && src.left > target.left ) ||
                ( src.right < target.right && src.right > target.left ),
            betweenTopAndBottom = ( src.top < target.bottom && src.top > target.top ) ||
                ( src.bottom < target.bottom && src.bottom > target.top ),
            leftAligned = src.left == target.left,
            rightAligned = src.right == target.right,
            leftAndRightAligned = ( leftAligned && rightAligned ),
            topAligned = src.top == target.top,
            bottomAligned = src.bottom == target.bottom,
            topAndBottomAligned = ( topAligned && bottomAligned ),

            movingRight = src.oldRight < src.right,
            movingLeft = src.oldLeft > src.left,
            movingUp = src.oldTop > src.top,
            movingDown = src.oldBottom < src.bottom,

            intersection = Game.checkIntersection( src.oldCenter, src.center, target.oldCenter, target.center ),

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
                exact: leftAndRightAligned && topAndBottomAligned,
                almostExact: leftAligned && topAndBottomAligned || rightAligned && topAndBottomAligned ||
                    topAligned && leftAndRightAligned || bottomAligned && leftAndRightAligned,
                overlapping: betweenTopAndBottom && betweenLeftAndRight,
                overlappingVertical: leftAndRightAligned && ( betweenTopAndBottom || skipDown || skipUp ),
                overlappingHorizontal: topAndBottomAligned && ( betweenLeftAndRight || skipRight || skipLeft )
            };
        if ( !intersection && this.oldPos.x == this.pos.x && this.oldPos.y == this.pos.y ) {
            if ( target.oldTop <= target.top ) {
                intersection = Game.checkIntersection( { x: this.pos.x, y: this.pos.y },
                        { x: this.pos.x + this.width, y: this.pos.y + this.height },
                        target.oldCenter, target.center );
            } else {
                intersection = Game.checkIntersection( { x: this.pos.x + this.width, y: this.pos.y },
                        { x: this.pos.x, y: this.pos.y + this.height },
                        target.oldCenter, target.center );
            }
            collisions.overlapping = ( betweenTopAndBottom && betweenLeftAndRight ) || intersection
        }

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
            leftAligned = src.left == target.left,
            rightAligned = src.right == target.right,
            leftAndRightAligned = ( leftAligned && rightAligned ),
            topAligned = src.top == target.top,
            bottomAligned = src.bottom == target.bottom,
            topAndBottomAligned = ( topAligned && bottomAligned ),
            directions = {
                exact: leftAndRightAligned && topAndBottomAligned,
                top: ( betweenLeftAndRight || leftAligned || rightAligned ) && src.top == target.bottom,
                bottom: ( betweenLeftAndRight || leftAligned || rightAligned ) && src.bottom == target.top,
                left: ( betweenTopAndBottom || topAligned || bottomAligned ) && src.left == target.right,
                right: ( betweenTopAndBottom || topAligned || bottomAligned ) && src.right == target.left
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
                        return directions;
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
