/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    drawLayer: 2,
    collectable: null // indicates whether it automatically goes into inventory
});

Game.Entity.Interactable.Rock = Game.Entity.Interactable.extend({
    type: 'Interactable.Rock',
    init: function( x, y ) {
        this.velocity = new Game.Vector( 0, 0 );
        this._super( x, y );
    },
    collideWith: function( entity, collisionType ) {
        if ( entity.type == 'Hero.Man' ) {
            if ( this.velocity.y > 0 && ( collisionType == 'bottomEdge' ) ) {
                this.velocity.y = 0;
                this.pos.y = entity.pos.y - entity.height;
            }
        }
        this._super( entity, collisionType );
    },
    update: function( timeDiff ) {
        var frictionalForce;
        if ( this.velocity.x >= 0 ) {
            frictionalForce = ( new Game.Vector( -0.0004, 0 ) ).multiply( timeDiff );
        } else {
            frictionalForce = ( new Game.Vector( 0.0004, 0 ) ).multiply( timeDiff );
        }
        if ( this.hasCollisionWith( 'Terrain.Land' ).bottomEdge && this.velocity.x != 0 ) {
            this.velocity = this.velocity.add( frictionalForce );
        }
        if ( Math.abs( this.velocity.x ) < 0.05 ) {
            this.velocity.x = 0;
        }
        this._super( timeDiff );
    },
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "#777777", "#777777", "#777777", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent", "transparent" ],
            [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent" ],
            [ "rgba(0,0,0,0)", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
            [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ]
        ]
    ]
});

Game.Entity.Interactable.Coin = Game.Entity.Interactable.extend({
    type: 'Interactable.Coin',
    ignoreGravity: true,
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffffff", "#ffffff", "#ffff00", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"  ]
        ]
    ]
});
