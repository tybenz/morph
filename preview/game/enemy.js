/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

var MONSTER_OPEN = 0,
    MONSTER_CLOSING = 1,
    MONSTER_GNASHED = 2,
    MONSTER_CLOSED = 3,
    WINGS_UP = 0,
    WINGS_DOWN = 1;

Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    drawLayer: 1,
    move: {
        'right': function() {
            this.pos.x += Game.unit;
        },
        'left': function() {
            this.pos.x -= Game.unit;
        },
        'up': function() {
            //jump
        },
        'down': function() {
            //down for plane and jellyfish
        }
    },
    actions: [],
    sequence: [], //sequence of moves/actions
    collideWith: function( entity, collisionType ) {
        if ( ( entity.type == 'Interactable.Rock' && collisionType.indexOf( 'Edge' ) == -1 )
            || ( entity.type == 'Hero.Block' && entity.velocity.y > 0 && entity.pos.y < this.pos.y ) ) {

            this.state = 'dying';
        }
        this._super( entity, collisionType );
    }
});

Game.Entity.Enemy.Monster = Game.Entity.Enemy.extend({
    type: 'Enemy.Monster',
    init: function( x, y ) {
        this._super( x, y );
        this.lastMoved = Date.now();
        this.state = 'chomping';
        this.animationStates = {
            dying: {
                delta: 40,
                sequence: [ 4, 5, 6, 7, 8, 9, 10, 11 ],
                times: 1
            },
            chomping: {
                delta: 150,
                sequence: [ MONSTER_OPEN, MONSTER_OPEN, MONSTER_OPEN, MONSTER_OPEN, MONSTER_OPEN, MONSTER_CLOSING, MONSTER_CLOSED, MONSTER_CLOSED, ],
                times: 'infinite'
            }
        };
    },
    update: function( timeDiff ) {
        if ( this.activeSprite == 11 ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
        this._super( timeDiff );
    },
    bitmaps: [
        [
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
            [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ]
        ]
    ]
});

Game.Entity.Enemy.Bird = Game.Entity.Enemy.extend({
    type: 'Enemy.Bird',
    ignoreGravity: true,
    count: 0,
    lastMoved: Date.now(),
    init: function( x, y ) {
        this._super( x, y );
        this.state = 'flying';
        this.animationStates = {
            flying: {
                delta: 200,
                sequence: [ WINGS_UP, WINGS_DOWN ],
                times: 'infinite'
            },
            dying: {
                delta: 40,
                sequence: [ 2, 3, 4, 5, 6, 7, 8, 9 ],
                times: 1
            }
        };
    },
    update: function( timeDiff ) {
        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }
        if ( this.state == 'dying' && this.hasCollisionWith( 'Terrain.Land' ).bottomEdge ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
        this._super( timeDiff );
    },
    bitmaps: [
        [
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
            [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ]
        ]
    ]
});
