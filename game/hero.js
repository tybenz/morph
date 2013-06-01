/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var MAN_RIGHT = 0,
    MAN_LEFT = 1,
    MAN_HOLDING_RIGHT = 2,
    MAN_HOLDING_LEFT = 3;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    drawLayer: 3,
    init: function( x, y ) {
        this._super( x, y );
        this.animationStates = {
                blinking: {
                    delta: 70,
                    sequence: [ 'initial', 'invisible' ],
                    times: 'infinite'
                }
            };
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
    transform: function( newType, timeDiff ) {
        var newHero = new newType( this.pos.x, this.pos.y );
        Game.destroyEntity( this );
        Game.currentLevel.entities.push( newHero );
        Game.hero = newHero;
    },
    //Handling user input
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { // LEFT
            this.left();
            Game.keysDown[ 37 ] = 'locked';
        }
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { // RIGHT
            this.right();
            Game.keysDown[ 39 ] = 'locked';
        }
        if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) { // UP
            this.up();
            Game.keysDown[ 38 ] = 'locked';
        }
        //Lose health and blink when hitting an enemy
        //When in blinking state cannot take more damage
        //TODO - don't use setTimeout
        if ( this.takingDamage && this.takingDamage != 'locked' ) {
            var hero = this;
            Game.score.decrementHealth();
            if ( Game.score.health > 0 ) {
                this.state = 'blinking';
                this.takingDamage = 'locked';
            } else {
                this.state = 'dying';
            }
            setTimeout( function() {
                hero.takingDamage = false;
                hero.state = '';
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
            case 'Interactable.Coin':
                if ( 'exact' in collisionTypes && entity.visible ) {
                    entity.visible = false;
                    Game.score.incrementHealth();
                }
                break;
            default: break;
        }
        if ( ( entityType.indexOf( 'Enemy' ) == 0 || entityType == 'Interactable.Bullet' ) && entity.state != 'dying'
            && this.takingDamage != 'locked' ) {

            this.takingDamage = true;
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        //spacebar
        if ( !Game.keysLocked && 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) {
            Game.keysDown[ 32 ] = 'locked';
            if ( this.holding ) {
                this.actions.throw.call( this );
            } else {
                var adjacent = this.adjacentTo( 'Interactable.Rock' ),
                    collision = this.hasCollisionWith( 'Interactable.Rock' );
                if ( adjacent ) {
                    this.actions.pickup.call( this, adjacent.entity );
                } else if ( collision ) {
                    this.actions.pickup.call( this, collision.entity );
                }
                var collisions = this.hasCollisionWith( 'Machine' );
                if ( collisions ) {
                    this.transform( Game.Entity.Hero.Block, timeDiff );
                }
            }
        }
	
        //Only perform one jump at a time
        if ( this.velocity.y < 0 ) {
            this.disableJump = true;
        }
        //Update rock
        if ( this.holding ) {
            this.holding.pos.y = this.pos.y - this.height;
            this.holding.pos.x = this.pos.x;
        }
    },
    right: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = MAN_HOLDING_RIGHT;
        } else {
            this.activeSprite = MAN_RIGHT;
        }
    },
    left: function() {
        this._super();
        if ( this.holding ) {
            this.activeSprite = MAN_HOLDING_LEFT;
        } else {
            this.activeSprite = MAN_LEFT;
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
            entity.pos.y = this.pos.y - this.height;
            entity.pos.x = this.pos.x;
            if ( this.direction == 'right' ) {
                this.activeSprite = MAN_HOLDING_RIGHT;
            } else if ( this.direction == 'left' ) {
                this.activeSprite = MAN_HOLDING_LEFT;
            }
        },
        throw: function() {
            if ( this.direction == 'right' ) {
                this.holding.velocity.x = 0.1;
            } else {
                this.holding.velocity.x = -0.1;
            }
            this.holding.velocity.y = -0.4;
            this.holding = false;
            this.activeSprite -= 2;
        }
    },
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
            [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00"  ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "#00ff00", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ],
            [ "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00"  ]
        ],
        [
            [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
            [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ],
            [ "rgba(0,0,0,0)", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "rgba(0,0,0,0)", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ]
    ]
});

Game.Entity.Hero.Block = Game.Entity.Hero.extend({
    type: 'Hero.Block',
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
    },
    bitmaps: [
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ],
        [
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
            [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
        ]
    ]
});
