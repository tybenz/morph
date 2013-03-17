/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    jumpHeight: 54,
    move: {
        'right': function() {
            this.pos.x += Game.unit;
        },
        'left': function() {
            this.pos.x -= Game.unit;
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
        ]
    ]
});
