/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var MAN_RIGHT = 0,
    MAN_LEFT = 1,
    MAN_HOLDING_RIGHT = 2,
    MAN_HOLDING_LEFT = 3;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    drawLayer: 3,
    //Move object required by all derived versions of the hero
    move: {},
    animationStates: {
        blinking: {
            delta: 70,
            sequence: [ 'initial', 'invisible' ],
            times: 'infinite'
        }
    },
    transform: function( newType, timeDiff ) {
        var newHero = new newType( this.pos.x, this.pos.y );
        Game.destroyEntity( this );
        Game.currentLevel.entities.push( newHero );
        Game.hero = newHero;
        Game.transformed = true;
    },
    //Handling user input
    update: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.keysLocked ) {
            if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { // LEFT
                this.move.left.call( this );
                Game.keysDown[ 37 ] = 'locked';
            }
            if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { // RIGHT
                this.move.right.call( this );
                Game.keysDown[ 39 ] = 'locked';
            }
            if ( 38 in Game.keysDown && Game.keysDown[ 38 ] != 'locked' ) { // UP
                this.move.up.call( this, timeDiff );
                Game.keysDown[ 38 ] = 'locked';
            }
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
                hero.takingDamage = false; hero.state = '';
            }, 1000 );
        }
    },
    collideWith: function( entity, collisionType ) {
        var entityType = entity.type;
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( collisionType == 'bottomEdge' ) {
                    this.disableJump = false;
                }
                break;
            case 'Interactable.Coin':
                if ( collisionType == 'exact' && entity.visible ) {
                    entity.visible = false;
                    Game.score.incrementHealth();
                }
                break;
            default: break;
        }
        if ( entityType.indexOf( 'Enemy' ) == 0 && entity.state != 'dying'
            && ( collisionType == 'exact' || collisionType == 'overlapping' || collisionType == 'overlappingVertical' || collisionType == 'overlappingHorizontal' )
            && this.takingDamage != 'locked' ) {

            this.takingDamage = true;
        }
        this._super( entity, collisionType );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    update: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.keysLocked && 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) {
            Game.keysDown[ 32 ] = 'locked';
            if ( this.holding ) {
                this.actions.throw.call( this );
            } else {
                var collisions = this.hasCollisionWith( 'Interactable.Rock' );
                if ( collisions ) {
                    this.actions.pickup.call( this, collisions.entity );
                } else {
                    collisions = this.hasCollisionWith( 'Machine' );
                    if ( collisions ) {
                        this.transform( Game.Entity.Hero.Block, timeDiff );
                    }
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
    move: {
        'right': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.direction = 'right';
            if ( this.holding ) {
                this.activeSprite = MAN_HOLDING_RIGHT;
            } else {
                this.activeSprite = MAN_RIGHT;
            }
            if ( !collisions || !collisions.rightEdge ) {
                this.invalidateRect( this.pos.x + Game.unit, this.pos.y );
                this.pos.x += Game.unit;
            }
        },
        'left': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.direction = 'left';
            if ( this.holding ) {
                this.activeSprite = MAN_HOLDING_LEFT;
            } else {
                this.activeSprite = MAN_LEFT;
            }
            if ( !collisions || !collisions.leftEdge ) {
                this.invalidateRect( this.pos.x - Game.unit, this.pos.y );
                this.pos.x -= Game.unit;
            }
        },
        'up': function() {
            //jump
            if ( !this.disableJump ) {
                var jumpForce = new Game.Vector( 0, Game.unit * -0.022222 );
                this.velocity = this.velocity.add( jumpForce );
            }
        },
        'down': function() {
            //down for plane and jellyfish
        }
    },
    //Interacting with rock
    actions: {
        pickup: function( entity ) {
            this.holding = entity;
            entity.pos.y = this.pos.y - this.height;
            entity.pos.x = this.pos.x;
            this.activeSprite += 2;
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
    collideWith: function( entity, collisionType ) {
        if ( entity.type == 'Interactable.Rock' ) {
            if ( collisionType == 'topEdge' && !this.holding ) {
                this.actions.pickup.call( this, entity );
            }
        }
        this._super( entity, collisionType );
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
    move: {
        'right': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.direction = 'right';
            if ( this.holding ) {
                this.activeSprite = MAN_HOLDING_RIGHT;
            } else {
                this.activeSprite = MAN_RIGHT;
            }
            if ( !collisions || !collisions.rightEdge ) {
                this.invalidateRect( this.pos.x + Game.unit, this.pos.y );
                this.pos.x += Game.unit;
            }
        },
        'left': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.direction = 'left';
            if ( this.holding ) {
                this.activeSprite = MAN_HOLDING_LEFT;
            } else {
                this.activeSprite = MAN_LEFT;
            }
            if ( !collisions || !collisions.leftEdge ) {
                this.invalidateRect( this.pos.x - Game.unit, this.pos.y );
                this.pos.x -= Game.unit;
            }
        },
        'up': function() {
            //jump
            if ( !this.disableJump ) {
                var jumpForce = new Game.Vector( 0, -0.5 );
                this.velocity = this.velocity.add( jumpForce );
            }
        },
        'down': function() {
            //down for plane and jellyfish
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
