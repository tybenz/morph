/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var MAN_RIGHT = 0,
    MAN_LEFT = 1;

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    jumpHeight: 54,
    move: {
        'right': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.activeSprite = MAN_RIGHT;
            if ( !collisions || !collisions.rightEdge ) {
                this.pos.x += Game.unit;
            }
        },
        'left': function() {
            var collisions = this.hasCollisionWith( 'Terrain.Land' );
            this.activeSprite = MAN_LEFT;
            if ( !collisions || !collisions.leftEdge ) {
                this.pos.x -= Game.unit;
            }
        },
        'up': function() {
            //jump
            if ( !this.disableJump ) {
                var jumpForce = new Game.Vector( 0, -0.5 );
                this.velocity = this.velocity.add( jumpForce );
                this.disableJump = true;
            }
        },
        'down': function() {
            //down for plane and jellyfish
        }
    },
    actions: [],
    transform: function() {},
    update: function( timeDiff ) {
        this._super( timeDiff );
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
    },
    collideWith: function( entity, collisionType ) {
        switch ( entity.type ) {
            case 'Terrain.Land':
                if ( collisionType == 'bottomEdge' ) {
                    this.disableJump = false;
                }
                break;
            default: break;
        }
        this._super( entity, collisionType );
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
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
        ]
    ]
});
