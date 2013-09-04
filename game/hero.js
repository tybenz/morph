/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, window, document, undefined ) {

var TILESIZE = 36,
    SECONDS = 1000,
    PLANE_TAKEOFF_VELOCITY = -0.016667 * TILESIZE,
    LEFT_KEY = 37,
    RIGHT_KEY = 39,
    DOWN_KEY = 40,
    UP_KEY = 38,
    ACTION_KEY = 88,
    JUMP_KEY = 90,
    PAUSE_KEY = 80,
    ENTER_KEY = 13,
    TAKING_DAMAGE_DURATION = SECONDS,
    MAN_JUMP_VELOCITY = -0.022222 * TILESIZE,
    BLOCK_JUMP_VELOCITY = -0.027778 * TILESIZE,
    ROCK_THROW_VELOCITY = 0.005556 * TILESIZE,
    BOAT_BULLET_SPEED = -0.016667 * TILESIZE,
    BOAT_BULLET_RELOAD_RATE = 0.5 * SECONDS,
    PLANE_BULLET_SPEED = 0.016667 * TILESIZE,
    PLANE_BULLET_RELOAD_RATE = 0.3 * SECONDS,
    PLANE_HORIZONTAL_VELOCITY = 0.005556 * TILESIZE,
    PLANE_LANDING_VELOCITY = 0.004444 * TILESIZE,
    PLANE_TAKEOFF_VELOCITY = -0.016667 * TILESIZE,
    TAKING_DAMAGE_DURATION = SECONDS;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    drawLayer: 4,
    states: {
        'blinking': {
            animation: {
                delta: 70,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            }
        },
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'hero-dying-1', 'hero-dying-2', 'hero-dying-3', 'hero-dying-4', 'hero-dying-5', 'hero-dying-6', 'hero-dying-7', 'hero-dying-8', 'hero-dying-9' ],
                times: 1
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.direction = 'right';
    },
    right: function() {
        this.direction = 'right';
        if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) && !this.adjacentTo( 'Terrain.Trapdoor', 'right' ) ) {
            this.pos.x += TILESIZE;
        }
    },
    left: function() {
        this.direction = 'left';
        if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) && !this.adjacentTo( 'Terrain.Trapdoor', 'left' ) ) {
            this.pos.x -= TILESIZE;
        }
    },
    up: function() {},
    down: function() {},
    //Handling user input
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.keysLocked ) {
            if ( !Game.keysLocked && !this.doNotMove && LEFT_KEY in Game.keysDown && Game.keysDown[ LEFT_KEY ] != 'locked' ) { // LEFT
                this.left();
                Game.keysDown[ LEFT_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && RIGHT_KEY in Game.keysDown && Game.keysDown[ RIGHT_KEY ] != 'locked' ) { // RIGHT
                this.right();
                Game.keysDown[ RIGHT_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && UP_KEY in Game.keysDown && Game.keysDown[ UP_KEY ] != 'locked' ) { // UP
                this.up();
                Game.keysDown[ UP_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) { // UP
                this.up();
                Game.keysDown[ JUMP_KEY ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && DOWN_KEY in Game.keysDown && Game.keysDown[ DOWN_KEY ] != 'locked' ) { // UP
                this.down();
                Game.keysDown[ DOWN_KEY ] = 'locked';
            }
            if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) { // SPACE
                var adjacent = this.adjacentTo( 'Terrain.Sign' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openSign( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Kid' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Man' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                }
                adjacent = this.adjacentTo( 'Friend.Monster' );
                if ( adjacent ) {
                    if ( adjacent.entity.content ) {
                        Game.openDialog( adjacent.entity.content );
                    }
                }
            }
        }
        //Lose health and blink when hitting an enemy
        //When in blinking state cannot take more damage
        //TODO - don't use setTimeout
        if ( this.takingDamage && this.takingDamage != 'locked' ) {
            var hero = this;
            var oldState = this.state;
            Game.decrementHealth();
            if ( Game.health > 0 ) {
                this.changeState( 'blinking' );
                this.takingDamage = 'locked';
            } else {
                this.changeState( 'dying' );
            }
            setTimeout( function() {
                hero.takingDamage = false;
                hero.changeState( oldState );
                hero.visible = true;
            }, TAKING_DAMAGE_DURATION );
        }

        var adj = this.adjacentTo( 'Terrain.Land' );
        if ( adj.exact ) {
            this.pos.y = adj.entity.pos.y - adj.entity.height;
        }

        if ( ( this.activeSprite == 'hero-dying-9' || this.activeSprite == 'flame-dying-9' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
            Game.gameOver();
        }

        if ( this.pos.y > Game.viewportHeight ) {
            this.visible = false;
            Game.destroyEntity( this );
            Game.gameOver();
        }
    },
    collideWith: function( entity, collisionTypes ) {
        var entityType = entity.type;
        switch ( entity.type ) {
            case 'Terrain.Trapdoor':
            case 'Terrain.Land':
                if ( this.velocity.y > 0 ) {
                    this.disableJump = false;
                }
                break;
            case 'Interactable.Heart':
                Game.destroyEntity( entity );
                Game.incrementHealth();
                break;
            case 'Interactable.Coin':
                Game.destroyEntity( entity );
                Game.incrementCurrency();
                break;
            case 'Terrain.Portal':
                Game.switchLevel( entity.toLevel );
                break;
            case 'Terrain.Water':
                if ( this.type != 'Hero.Boat' ) {
                    Game.destroyEntity( this );
                    Game.gameOver();
                }
                break;
            default: break;
        }

        var hit = ( entityType.indexOf( 'Enemy' ) == 0 && !( this.type == 'Hero.Block' && this.oldPos.y < entity.pos.y ) ) || ( entityType == 'Interactable.Egg' && entity.oldPos.y < this.pos.y );

        // If the here is hit, not dying, not already taking and not "holding" anything
        // e.g. a rock should protect him
        if ( hit && entity.state != 'dying' && this.takingDamage != 'locked' && !this.holding ) {
            this.takingDamage = true;
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    initialSprite: 'man-right',
    initialState: 'walking',
    init: function( x, y ) {
        this.jumpVelocity = MAN_JUMP_VELOCITY;
        this._super( x, y );
    },
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'walking': { animation: null, actions: null }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            if ( this.holding ) {
                this.actions.drop.call( this );
                Game.keysDown[ ACTION_KEY ] = 'locked';
            } else {
                var adjacent = this.adjacentTo( 'Interactable.Rock' ),
                    collision = this.hasCollisionWith( 'Interactable.Rock' );

                if ( adjacent ) {
                    this.actions.pickup.call( this, adjacent.entity );
                    Game.keysDown[ ACTION_KEY ] = 'locked';
                } else if ( collision ) {
                    this.actions.pickup.call( this, collision.entity );
                    Game.keysDown[ ACTION_KEY ] = 'locked';
                }
            }
        }
	
        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    right: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = 'man-holding-right';
        } else {
            this.activeSprite = 'man-right';
        }
    },
    left: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = 'man-holding-left';
        } else {
            this.activeSprite = 'man-left';
        }
    },
    up: function() {
        //jump
        if ( this.activeSprite.match( 'holding' ) ) {
            this.actions.throw.call( this );
        } else if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, this.jumpVelocity );
            this.velocity = this.velocity.add( jumpForce );
        }
    },
    //Interacting with rock
    actions: {
        pickup: function( entity ) {
            this.holding = entity;
            entity.pos.y = this.pos.y - entity.height;
            entity.pos.x = this.pos.x;
            if ( this.direction == 'right' ) {
                this.activeSprite = 'man-holding-right';
            } else if ( this.direction == 'left' ) {
                this.activeSprite = 'man-holding-left';
            }
            this.invalidateRect( 0 - TILESIZE, TILESIZE, TILESIZE, 0 - TILESIZE );

            this.attach( [ entity ] );
            Game.destroyEntity( entity );
        },
        throw: function() {
            this.detach( this.holding );

            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.holding.drawLayer ].push( this.holding );

            if ( this.direction == 'right' ) {
                this.holding.velocity.x = ROCK_THROW_VELOCITY;
                this.activeSprite = 'man-right';
            } else {
                this.holding.velocity.x = 0 - ROCK_THROW_VELOCITY;
                this.activeSprite = 'man-left';
            }
            this.holding.velocity.y = this.jumpVelocity;

            this.holding = false;
        },
        drop: function() {
            var rightLand = this.adjacentTo( 'Terrain.Land', 'right' ),
                leftLand = this.adjacentTo( 'Terrain.Land', 'left' );

            this.detach( this.holding );
            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.holding.drawLayer ].push( this.holding );

            if ( this.direction == 'right' ) {
                if ( !rightLand ) {
                    this.holding.pos.x = this.pos.x + this.width;
                    this.invalidateRect( 0, 0 + TILESIZE, 0, 0 );
                } else {
                    this.holding.pos.x = this.pos.x;
                }
                this.holding.pos.y = this.pos.y;
                this.activeSprite = 'man-right';
                this.holding = false;
            } else {
                if ( !leftLand ) {
                    this.holding.pos.x = this.pos.x - this.holding.width;
                    this.invalidateRect( 0, 0, 0, 0 - TILESIZE );
                } else {
                    this.holding.pos.x = this.pos.x;
                }
                this.holding.pos.y = this.pos.y;
                this.activeSprite = 'man-left';
                this.holding = false;
            }
        }
    }
});

})( Game, window, document );
