/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    PLANE_TAKEOFF_VELOCITY = Settings.planeTakeoffVelocity,
    TRANSFORM_ANIMATION_DURATION = Settings.transformAnimationDuration,
    LEFT_KEY = Settings.leftKey,
    RIGHT_KEY = Settings.rightKey,
    DOWN_KEY = Settings.downKey,
    UP_KEY = Settings.upKey,
    ACTION_KEY = Settings.actionKey,
    JUMP_KEY = Settings.jumpKey,
    PAUSE_KEY = Settings.pauseKey,
    ENTER_KEY = Settings.enterKey,
    TAKING_DAMAGE_DURATION = Settings.takingDamageDuration,
    MAN_JUMP_VELOCITY = Settings.manJumpVelocity,
    BLOCK_JUMP_VELOCITY = Settings.blockJumpVelocity,
    ROCK_THROW_VELOCITY = Settings.rockThrowVelocity,
    BOAT_BULLET_SPEED = Settings.boatBulletSpeed,
    BOAT_BULLET_RELOAD_RATE = Settings.boatBulletReloadRate,
    PLANE_BULLET_SPEED = Settings.planeBulletSpeed,
    PLANE_BULLET_RELOAD_RATE = Settings.planeBulletReloadRate,
    PLANE_HORIZONTAL_VELOCITY = Settings.planeHorizontalVelocity,
    PLANE_LANDING_VELOCITY = Settings.planeLandingVelocity,
    PLANE_TAKEOFF_VELOCITY = Settings.planeTakeoffVelocity,
    TAKING_DAMAGE_DURATION = Settings.takingDamageDuration,
    FROG_GRAVITY = Settings.frogGravity,
    FROG_JUMP_VELOCITY = Settings.frogJumpVelocity,
    FROG_TONGUE_VELOCITY = Settings.frogTongueVelocity,
    JELLYFISH_GRAVITY = Settings.jellyfishGravity,
    CLOCK_STOP_DURATION = Settings.clockStopDuration,
    CLOCK_STOP_COOLDOWN = Settings.clockStopCooldown,
    CLOCK_JUMP_VELOCITY = Settings.clockJumpVelocity,
    FLAME_JUMP_VELOCITY = Settings.flameJumpVelocity;

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
        'transforming': {
            animation: {
                delta: 80,
                sequence: [ 'hero-scramble-1', 'hero-scramble-2', 'hero-scramble-3', 'hero-scramble-4', 'hero-scramble-5' ],
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
        if ( !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
            this.pos.x += TILESIZE;
        }
    },
    left: function() {
        this.direction = 'left';
        if ( !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
            this.pos.x -= TILESIZE;
        }
    },
    up: function() {},
    down: function() {},
    transform: function( newType ) {
        var self = this;
        if ( this.__proto__ == newType.prototype ) {
            Game.doneTransforming();
            this.skipAction = false;
        } else {
            this.changeState( 'transforming' );
            setTimeout( function() {
                var oldX = self.pos.x,
                    newHero = new newType( self.pos.x, self.pos.y ),
                    machine, wave, type;

                // Destroy old hero
                Game.destroyEntity( self );
                for ( var i = 0; i < Game.drawLayers[ self.drawLayer ]; i++ ) {
                    if ( Game.drawLayers[ self.drawLayer ] == self ) {
                        Game.drawLayers[ self.drawLayer ].splice( i, 1 );
                        break;
                    }
                }

                Game.currentLevel.entities.push( newHero );
                Game.drawLayers[ newHero.drawLayer ].push( newHero );
                Game.hero = newHero;
                newHero.skipAction = false;

                machine = newHero.hasCollisionWith( 'Machine' );
                if ( machine ) {
                    machine = machine.entity;
                    type = newHero.type;
                    if ( type == 'Hero.Boat' || type == 'Hero.Jellyfish' ) {
                        wave = machine.adjacentTo( 'Terrain.Wave' );
                        if ( wave ) {
                            wave = wave.entity;
                            newHero.pos = new Game.Vector( wave.pos.x, wave.pos.y );
                        } else {
                            newHero.pos.x = oldX + machine.width;
                            if ( newHero.hasCollisionWith( 'Terrain.Land' ) ) {
                                newHero.pos.x = oldX;
                            }
                        }
                    } else if ( type == 'Hero.Plane' ) {
                        if ( !newHero.below( 'Terrain.Land' ) ) {
                            Game.keysLocked = true;
                            newHero.velocity.y = PLANE_TAKEOFF_VELOCITY;
                        }
                    } else {
                        wave = newHero.adjacentTo( 'Terrain.Water', 'bottom' );
                        if ( wave ) {
                            land = machine.adjacentTo( 'Terrain.Land', 'bottom' ) || machine.adjacentTo( 'Terrain.Land', 'left' );
                            if ( land ) {
                                land = land.entity;
                                newHero.pos = new Game.Vector( land.pos.x, land.pos.y - newHero.height );
                            }
                        }
                    }
                }

                Game.doneTransforming();
            }, TRANSFORM_ANIMATION_DURATION );
        }
    },
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
                } else {
                    var collisions = this.hasCollisionWith( 'Machine' );
                    if ( collisions && this.pos.x == collisions.entity.pos.x ) {
                        var opened = Game.openTransformMenu();
                        if ( opened ) {
                            this.skipAction = true;
                        }
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
            }, TAKING_DAMAGE_DURATION );
        }

        var adj = this.adjacentTo( 'Terrain.Land' );
        if ( adj.exact ) {
            this.pos.y = adj.entity.pos.y - adj.entity.height;
        }

        if ( ( this.activeSprite == 'hero-dying-9' || this.activeSprite == 'flame-dying-9' ) && !Game.godMode ) {
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
            case 'Terrain.Portal':
                Game.switchLevel( entity.toLevel );
                break;
            case 'Terrain.Water':
                if ( this.type != 'Hero.Jellyfish' && this.type != 'Hero.Boat' ) {
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
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            if ( this.holding ) {
                this.actions.throw.call( this );
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
            this.actions.drop.call( this );
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
                this.invalidateRect( 0, 0 + TILESIZE, 0, 0 );
            } else if ( this.direction == 'left' ) {
                this.activeSprite = 'man-holding-left';
                this.invalidateRect( 0, 0, 0, 0 - TILESIZE );
            }

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

Game.Entity.Hero.Block = Game.Entity.Hero.extend({
    type: 'Hero.Block',
    initialSprite: 'block',
    initialState: 'walking',
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'walking': { animation: null, actions: null }
    },
    up: function() {
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, BLOCK_JUMP_VELOCITY );
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
    bulletSpeed: BOAT_BULLET_SPEED,
    bulletInterval: BOAT_BULLET_RELOAD_RATE,
    lastFired: Date.now(),
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
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

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shoot();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( !this.skipAction && !Game.keysLocked && JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) {
            this.lockTarget();
            Game.keysDown[ JUMP_KEY ] = 'locked';
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
            this.createBullet( this.pos.x, this.pos.y + ( TILESIZE / 9 ) * 5, xVelocity, 0 );
            this.lastFired = Date.now();
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    lockTarget: function() {
        if ( this.direction == 'right' ) {
            this.locked = this.locked || this;
            for ( var i = 0; i < Game.currentLevel.entities.length; i++ ) {
                entity = Game.currentLevel.entities[i];
                if ( entity.type.indexOf( 'Enemy' ) === 0 && entity.type.indexOf( 'Bullet' ) == -1 && entity.pos.x > this.locked.pos.x ) {
                    this.locked = entity;
                    break;
                }
            }
        } else {
        }
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
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'jumping': {},
        'licking': {},
        'licking-jumping': {},
    },
    init: function( x, y ) {
        this._super( x, y );
        this.gravity = new Game.Vector( 0, FROG_GRAVITY );
    },
    up: function() {
        if ( !this.disableJump ) {
            this.changeState( 'jumping' );
            var jumpForce = new Game.Vector( 0, FROG_JUMP_VELOCITY );
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
                    this.pos.x += TILESIZE;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x -= TILESIZE;
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
                    this.pos.x -= TILESIZE;
                }
                // correct position if we jumped inside land
                if ( this.hasCollisionWith( 'Terrain.Land', 'overlappingVertical' ) ) {
                    this.pos.x += TILESIZE;
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
        var tongue, rectSize = TILESIZE / 9,
            x = this.pos.x + this.width - rectSize * 4,
            y = this.pos.y + rectSize * 4,
            velocity = this.direction == 'left' ? 0 - FROG_TONGUE_VELOCITY : FROG_TONGUE_VELOCITY;

        if ( this.state.indexOf( 'licking' ) == -1 ) {
            if ( this.state == 'jumping' ) {
                this.changeState( 'licking-jumping' );
            } else {
                this.changeState( 'licking' );
            }
            if ( this.direction == 'left' ) {
                x = this.pos.x - rectSize * 4;
            }
            var tongue = new Game.Entity.Interactable.Tongue( x, y, this, velocity );
            Game.currentLevel.entities.push( tongue );
        }
    },
    doneLicking: function() {
        if ( this.state == 'licking-jumping' ) {
            this.activeSprite = this.direction == 'left' ? 'frog-left-jump' : 'frog-right-jump';
            this.changeState( 'jumping' );
        } else {
            this.activeSprite = this.direction == 'left' ? 'frog-left' : 'frog-right';
            this.changeState( 'still' );
        }
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

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.lick();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }
    }
});

Game.Entity.Hero.Plane = Game.Entity.Hero.extend({
    type: 'Hero.Plane',
    initialSprite: 'plane-right',
    initialState: 'still',
    bulletSpeed: PLANE_BULLET_SPEED,
    bulletInterval: PLANE_BULLET_RELOAD_RATE,
    lastFired: Date.now(),
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming
    },
    init: function( x, y ) {
        this._super( x, y );
        this.beginLandingSequence = true;
        this.ignoreGravity = true;
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shoot();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( Game.viewportOffset >= Game.viewportShiftBuffer && this.beginLandingSequence ) {
            this.velocity.x = PLANE_HORIZONTAL_VELOCITY;
            this.beginLandingSequence = false;
        }
    },
    up: function() {
        if ( !this.adjacentTo( 'Terrain.Land', 'top' ) && !this.adjacentToLevelEdge( 'top' ) ) {
            this.pos.y -= TILESIZE;
        }
    },
    down: function() {
        if ( !this.adjacentTo( 'Terrain.Land', 'bottom' ) && !this.adjacentToLevelEdge( 'bottom' ) ) {
            this.pos.y += TILESIZE;
        }
    },
    left: function() {
        if ( this.pos.x - TILESIZE >= Game.viewportOffset && !this.adjacentTo( 'Terrain.Land', 'left' ) && !this.adjacentToLevelEdge( 'left' ) ) {
            this.pos.x -= TILESIZE;
        }
    },
    right: function() {
        if ( ( this.pos.x + TILESIZE < Game.viewportOffset + Game.viewportWidth ) && !this.adjacentTo( 'Terrain.Land', 'right' ) && !this.adjacentToLevelEdge( 'right' ) ) {
            this.pos.x += TILESIZE;
        }
    },
    shoot: function() {
        var xVelocity = this.bulletSpeed;
        if ( ( Date.now() - this.lastFired ) > this.bulletInterval ) {
            this.createBullet( this.pos.x + this.width, this.pos.y + ( TILESIZE / 9 ) * 5, xVelocity, 0 );
            this.lastFired = Date.now();
        }
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    collideWith: function( entity, collisions ) {
        this._super( entity, collisions );

        if ( entity.type == 'Terrain.Invisible' ) {
            this.pos.x = entity.pos.x - this.width;
            this.velocity.x = 0;
            this.velocity.y = PLANE_LANDING_VELOCITY;
        }
    }
});

Game.Entity.Hero.Jellyfish = Game.Entity.Hero.extend({
    type: 'Hero.Jellyfish',
    initialSprite: 'jellyfish',
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( Game.currentLevel.type == 'sea' ) {
            this.gravity = new Game.Vector( 0, JELLYFISH_GRAVITY ); // Changed to test collisions
        }

        if ( !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.shock();
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }
    },
    shock: function() {
        var lightning;

        lightning = new Game.Entity.Interactable.Lightning( this.pos.x - TILESIZE, this.pos.y - TILESIZE, this );
        Game.currentLevel.entities.push( lightning );
    },
    up: function() {
        this.pos.y -= this.height;
        this.velocity.y = 0;
    }
});

Game.Entity.Hero.Clock = Game.Entity.Hero.extend({
    type: 'Hero.Clock',
    initialSprite: 'clock-1',
    initialState: 'ticking',
    timeStopDuration: CLOCK_STOP_DURATION,
    coolDown: CLOCK_STOP_COOLDOWN,
    states: {
        'dying': Game.Entity.Hero.prototype.states.dying,
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'ticking': {
            animation: {
                delta: 400,
                sequence: [ 'clock-1', 'clock-2', 'clock-3', 'clock-4', 'clock-5', 'clock-6', 'clock-7', 'clock-8' ],
                times: 'infinite'
            }
        }
    },
    stopTime: function() {
        var self = this,
            oldState = this.state;

        Game.transforming = true;
        this.timeStopped = true;
        this.changeState( 'still' );

        setTimeout(function() {
            Game.transforming = false;
            self.timeStopped = false;
            self.changeState( oldState );
        }, this.timeStopDuration);
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( !this.timeStopped && !this.skipAction && !Game.keysLocked && ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.stopTime();
        }

        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    up: function() {
        //jump
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, CLOCK_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
        }
    }
});

Game.Entity.Hero.Flame = Game.Entity.Hero.extend({
    type: 'Hero.Flame',
    initialSprite: 'flame-small',
    initialState: 'still',
    states: {
        'still': Game.Entity.prototype.states.still,
        'blinking': Game.Entity.Hero.prototype.states.blinking,
        'transforming': Game.Entity.Hero.prototype.states.transforming,
        'melting': {},
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'flame-dying-1', 'flame-dying-2', 'flame-dying-3', 'flame-dying-4', 'flame-dying-5', 'flame-dying-6', 'flame-dying-7', 'flame-dying-8', 'flame-dying-9' ],
                times: 1
            }
        }
    },
    meltStuff: function() {
        if ( this.state != 'melting' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.activeSprite = 'flame-big';
            this.changeState( 'melting' );
            this.animated = true;
            this.heat = new Game.Entity.Interactable.Heat( this.pos.x - 2 * TILESIZE, this.pos.y - 2 * TILESIZE, this );
            Game.currentLevel.entities.push( this.heat );
            this.doNotMove = true;
        }
    },
    stopMelting: function() {
        this.activeSprite = 'flame-small';
        this.changeState( 'still' );
        this.animated = true;
        Game.destroyEntity( this.heat );
        this.heat = null;
        this.doNotMove = false;
    },
    generateNextCoords: function( timeDiff) {
        this._super( timeDiff );

        if ( !this.skipAction && ACTION_KEY in Game.keysDown ) {
            this.meltStuff();
        } else {
            if ( this.state == 'melting' ) {
                this.stopMelting();
            }
        }

        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
    },
    up: function() {
        //jump
        if ( !this.disableJump ) {
            var jumpForce = new Game.Vector( 0, FLAME_JUMP_VELOCITY );
            this.velocity = this.velocity.add( jumpForce );
        }
    }
});

})( Game, Settings, window, document );
