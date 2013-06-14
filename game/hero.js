/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var MAN_RIGHT = 0,
    MAN_LEFT = 1,
    MAN_HOLDING_RIGHT = 2,
    MAN_HOLDING_LEFT = 3;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    drawLayer: 3,
    states: {
        'blinking': {
            animation: {
                delta: 70,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            }
        },
        'transforming': {
            animation: {
                delta: 80,
                sequence: [ 'hero-scramble-1', 'hero-scramble-2', 'hero-scramble-3', 'hero-scramble-4', 'hero-scramble-5' ],
                times: 'infinite'
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.direction = 'right';
    },
    right: function() {
        this.direction = 'right';
        if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
            this.pos.x += Game.unit;
        }
    },
    left: function() {
        this.direction = 'left';
        if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
            this.pos.x -= Game.unit;
        }
    },
    up: function() {},
    down: function() {},
    transform: function( newType ) {
        var self = this;
        if ( this.__proto__ == newType.prototype ) {
            Game.doneTransforming();
        } else {
            this.changeState( 'transforming' );
            setTimeout( function() {
                var newHero = new newType( self.pos.x, self.pos.y ),
                    machine, wave, type;

                Game.destroyEntity( self );
                Game.currentLevel.entities.push( newHero );
                Game.hero = newHero;

                machine = Game.hero.hasCollisionWith( 'Machine' );
                if ( machine ) {
                    machine = machine.entity;
                    type = Game.hero.type;
                    if ( type == 'Hero.Boat' ) {
                        wave = machine.adjacentTo( 'Terrain.Wave' );
                        if ( wave ) {
                            wave = wave.entity;
                            Game.hero.pos = new Game.Vector( wave.pos.x, wave.pos.y );
                        }
                    } else {
                        wave = Game.hero.adjacentTo( 'Terrain.Water', 'bottom' );
                        if ( wave ) {
                            land = machine.adjacentTo( 'Terrain.Land', 'bottom' ) || machine.adjacentTo( 'Terrain.Land', 'left' );
                            if ( land ) {
                                land = land.entity;
                                Game.hero.pos = new Game.Vector( land.pos.x, land.pos.y - Game.hero.height );
                            }
                        }
                    }
                }

                Game.doneTransforming();
            }, 1000 );
        }
    },
    //Handling user input
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.transforming ) {
            if ( !Game.keysLocked && !this.doNotMove && 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { // LEFT
                this.left();
                Game.keysDown[ 37 ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { // RIGHT
                this.right();
                Game.keysDown[ 39 ] = 'locked';
            }
            if ( !Game.keysLocked && !this.doNotMove && 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) { // UP
                this.up();
                Game.keysDown[ 38 ] = 'locked';
            }
            if ( 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) { // SPACE
                var collisions = this.hasCollisionWith( 'Machine' );
                if ( collisions && this.pos.x == collisions.entity.pos.x ) {
                    Game.openTransformMenu();
                    this.skipAction = true;
                }
            }
        }
        //Lose health and blink when hitting an enemy
        //When in blinking state cannot take more damage
        //TODO - don't use setTimeout
        if ( this.takingDamage && this.takingDamage != 'locked' ) {
            var hero = this;
            var oldState = this.state;
            Game.Inventory.decrementHealth();
            if ( Game.Inventory.health > 0 ) {
                this.changeState( 'blinking' );
                this.takingDamage = 'locked';
            } else {
                this.changeState( 'dying' );
            }
            setTimeout( function() {
                hero.takingDamage = false;
                hero.changeState( oldState );
                hero.visible = true;
            }, 1000 );
        }
    },
    collideWith: function( entity, collisionTypes ) {
        var entityType = entity.type;
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( this.velocity.y > 0 ) {
                    this.disableJump = false;
                }
                break;
            case 'Interactable.Heart':
                Game.destroyEntity( entity );
                Game.Inventory.incrementHealth();
                break;
            case 'Interactable.Coin':
                Game.destroyEntity( entity );
                Game.Inventory.incrementCurrency();
                break;
            default: break;
        }

        var hit = entityType.indexOf( 'Enemy' ) == 0 || entityType == 'Enemy.Bullet' || ( entityType == 'Interactable.Egg' && entity.oldPos.y < this.pos.y );

        if ( hit && entity.state != 'dying' && this.takingDamage != 'locked' ) {
            this.takingDamage = true;
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    initialSprite: 'man-right',
    initialState: 'walking',
    states: {
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        //spacebar
        if ( !this.skipAction && !Game.keysLocked && 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) {
            if ( this.holding ) {
                this.actions.throw.call( this );
                Game.keysDown[ 32 ] = 'locked';
            } else {
                var adjacent = this.adjacentTo( 'Interactable.Rock' ),
                    collision = this.hasCollisionWith( 'Interactable.Rock' );

                if ( adjacent ) {
                    this.actions.pickup.call( this, adjacent.entity );
                    Game.keysDown[ 32 ] = 'locked';
                } else if ( collision ) {
                    this.actions.pickup.call( this, collision.entity );
                    Game.keysDown[ 32 ] = 'locked';
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
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, -0.4 );
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

            this.attach( [ entity ] );
            Game.destroyEntity( entity );
        },
        throw: function() {
            this.detach( this.holding );

            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.holding.drawLayer ].push( this.holding );

            if ( this.direction == 'right' ) {
                this.holding.velocity.x = 0.1;
                this.activeSprite = 'man-right';
            } else {
                this.holding.velocity.x = -0.1;
                this.activeSprite = 'man-left';
            }
            this.holding.velocity.y = -0.4;

            this.holding = false;
        }
    }
});

Game.Entity.Hero.Block = Game.Entity.Hero.extend({
    type: 'Hero.Block',
    initialSprite: 'block',
    initialState: 'walking',
    states: {
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    up: function() {
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, -0.5 );
            this.velocity = this.velocity.add( jumpForce );
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    }
});

Game.Entity.Hero.Boat = Game.Entity.Hero.extend({
    type: 'Hero.Boat',
    initialSprite: 'boat-right',
    initialState: 'sailing',
    bulletSpeed: -0.3,
    bulletInterval: 500,
    lastFired: Date.now(),
    states: {
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'sailing': { animation: null, actions: null }
    },
    right: function() {
        this._super();
        this.activeSprite = 'boat-right';
    },
    left: function() {
        this._super();
        this.activeSprite = 'boat-left';
    },
    collideWith: function( entity, collisionTypes ) {
        this._super( entity, collisionTypes );
        if ( entity.type == 'Terrain.Water' ) {
            this.velocity.y = 0;
            this.pos.y = entity.pos.y - entity.height;
        } else if ( entity.type == 'Machine' ) {
            this.pos = new Game.Vector( entity.pos.x, entity.pos.y + entity.height - this.height );
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) {
            this.shoot();
        }

        if ( this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.doNotMove = true;
        } else {
            this.doNotMove = false;
        }
    },
    shoot: function() {
        var xVelocity = this.bulletSpeed;
        if ( this.direction == 'right' ) {
            xVelocity = 0 - xVelocity;
        }
        if ( ( Date.now() - this.lastFired ) > this.bulletInterval ) {
            this.createBullet( this.pos.x, this.pos.y + ( Game.unit / 9 ) * 5, xVelocity, 0 );
            this.lastFired = Date.now();
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    applyGravity: function( timeDiff ) {
        if ( !this.adjacentTo( 'Terrain.Water', 'bottom' ) && !this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            var gravitationalForce = this.gravity.multiply( timeDiff );
            this.velocity = this.velocity.add( gravitationalForce );
        }
    }
});

Game.Entity.Hero.Frog = Game.Entity.Hero.extend({
    type: 'Hero.Frog',
    initialSprite: 'frog-right',
    initialState: 'still',
    states: {
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'jumping': {},
        'licking': {}
    },
    init: function( x, y ) {
        this._super( x, y );
        this.gravity = new Game.Vector( 0, 0.0008 );
    },
    up: function() {
        if ( !this.disableJump ) {
            this.changeState( 'jumping' );
            var jumpForce = new Game.Vector( 0, -0.6 );
            this.velocity = this.velocity.add( jumpForce );
            if ( this.direction == 'right' ) {
                this.activeSprite = 'frog-right-jump';
            }
            if ( this.direction == 'left' ) {
                this.activeSprite = 'frog-left-jump';
            }
        }
    },
    right: function() {
        this._super();
        switch ( this.state ) {
            case 'jumping':
                this.activeSprite = 'frog-right-jump';
                if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
                    this.pos.x += Game.unit;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x -= Game.unit;
                }
                break;
            case 'licking':
                this.activeSprite = 'frog-right-lick';
                break;
            case 'still':
                this.activeSprite = 'frog-right';
                break;
            default: break;
        }
    },
    left: function() {
        this._super();
        switch ( this.state ) {
            case 'jumping':
                this.activeSprite = 'frog-left-jump';
                if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
                    this.pos.x -= Game.unit;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x += Game.unit;
                }
                break;
            case 'licking':
                this.activeSprite = 'frog-left-lick';
                break;
            case 'still':
                this.activeSprite = 'frog-left';
                break;
            default: break;
        }
    },
    lick: function() {
        var tongue, rectSize = Game.unit / 9,
            x = this.pos.x + this.width - rectSize * 4,
            y = this.pos.y + rectSize * 4,
            velocity = this.direction == 'left' ? -0.12 : 0.12;

        if ( this.state.indexOf( 'licking' ) == -1 ) {
            this.changeState( 'licking' );
            if ( this.direction == 'left' ) {
                x = this.pos.x - rectSize * 4;
            }
            var tongue = new Game.Entity.Interactable.Tongue( x, y, velocity );
            Game.currentLevel.entities.push( tongue );
        }
    },
    doneLicking: function() {
        this.activeSprite = this.direction == 'left' ? 'frog-left' : 'frog-right';
        this.changeState( 'still' );
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }

        if ( this.state == 'jumping' && this.adjacentTo('Terrain.Land','bottom') && this.velocity.y >= 0 ) {
            this.changeState( 'still' );
            this.activeSprite = this.direction == 'left' ? 'frog-left' : 'frog-right';
            this.invalidateRect();
        }

        if ( !this.skipAction && !Game.keysLocked && 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) {
            this.lick();
            Game.keysDown[ 32 ] = 'locked';
        }
    }
});
