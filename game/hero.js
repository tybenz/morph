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
        this.direction = 'right';
        this.animationStates = {
            blinking: {
                delta: 70,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            },
            transforming: {
                delta: 80,
                sequence: [ 'hero-scramble-1', 'hero-scramble-2', 'hero-scramble-3', 'hero-scramble-4', 'hero-scramble-5' ],
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
        var self = this;
        this.state = 'transforming';
        Game.transform();
        setTimeout( function() {
            var newHero = new newType( self.pos.x, self.pos.y );
            Game.destroyEntity( self );
            Game.currentLevel.entities.push( newHero );
            Game.hero = newHero;
            Game.doneTransforming();
        }, 1000 );
    },
    //Handling user input
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( !Game.transforming ) {
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
            case 'Interactable.Heart':
                if ( 'exact' in collisionTypes && entity.visible ) {
                    entity.visible = false;
                    Game.score.incrementHealth();
                }
                break;
            default: break;
        }

        var hit = entityType.indexOf( 'Enemy' ) == 0 || entityType == 'Interactable.Bullet' || ( entityType == 'Interactable.Egg' && entity.oldPos.y < this.pos.y );

        if ( hit && entity.state != 'dying' && this.takingDamage != 'locked' ) {
            this.takingDamage = true;
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    initialSprite: 'man-right',
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
                if ( collisions && this.pos.x == collisions.entity.pos.x ) {
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

            if ( this.direction == 'right' ) {
                this.activeSprite = 'man-holding-right';
            } else if ( this.direction == 'left' ) {
                this.activeSprite = 'man-holding-left';
            }

            Game.hero = new Game.Entity.Super( this.pos.x, this.pos.y - entity.height, [
                    {
                        entity: this,
                        relativePos: { x: 0, y: this.height }
                    },
                    {
                        entity: entity,
                        relativePos: { x: 0, y: 0 }
                    }
                ]);
            Game.currentLevel.entities.push(Game.hero);

            Game.destroyEntity( this );
            Game.destroyEntity( entity );
        },
        throw: function() {
            Game.currentLevel.entities.push( this );
            Game.currentLevel.entities.push( this.holding );
            Game.drawLayers[ this.drawLayer ].push( this );
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

            Game.hero = this;
            for ( var i in Game.currentLevel.entities ) {
                if ( Game.currentLevel.entities[i].type == 'Super' ) {
                    Game.destroyEntity( Game.currentLevel.entities[i] );
                }
            }
        }
    }
});

Game.Entity.Hero.Block = Game.Entity.Hero.extend({
    type: 'Hero.Block',
    initialSprite: 'block',
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
