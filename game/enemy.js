/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

TURRET_INTERVAL = 1000;
TURRET_SPEED = -1;
QUICK_TURRET_INTERVAL = 800;
QUICK_TURRET_SPEED = -0.8;
SMART_TURRET_INTERVAL = 400;
SMART_TURRET_SPEED = -0.6;


MONSTER_OPEN = 0;
MONSTER_CLOSING = 1;
MONSTER_GNASHED = 2;
MONSTER_CLOSED = 3;
WINGS_UP = 0;
WINGS_DOWN = 1;
TURRET_LEFT = 0;
TURRET_RIGHT = 1;

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
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.moves ) {
            this.performNextMove();
        }
    },
    performNextMove: function() {
        this.activeMove = this.activeMove || 0;
        this.lastMove = this.lastMove || Date.now();

        var move = this.moves[ this.activeMove ];

        if ( this.state != 'dying' && ( Date.now() - this.lastMove ) > move.delta ) {
            this.moved = false;
            if ( move.until.call( this ) ) {
                this.activeMove++;
                this.activeMove %= this.moves.length;
            }

            move = this.moves[ this.activeMove ];

            move.move.call( this );
            this.lastMove = Date.now();
        }
    },
    collideWith: function( entity, collisionTypes ) {
        if ( ( entity.type == 'Interactable.Rock' && ( entity.velocity.x > 0 || entity.velocity.y > 0 ) && collisionTypes )
            || ( entity.type == 'Hero.Block' && entity.velocity.y > 0 && entity.pos.y < this.pos.y ) ) {

            this.state = 'dying';
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Enemy.Turret = Game.Entity.Enemy.extend({
    type: 'Enemy.Turret',
    shotInterval: TURRET_INTERVAL,
    bulletSpeed: TURRET_SPEED,
    init: function( x, y ) {
        this._super( x, y );
        this.lastShot = Date.now();
        this.animationStates = {
            dying: {
                delta: 40,
                sequence: [ 2, 3, 4, 5, 6, 7, 8, 9 ],
                times: 1
            }
        };
        this.moves = [
            {
                delta: this.shotInterval,
                move: this.__proto__.shoot,
                until: function() { return true; }
            }
        ];
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.activeSprite == 9 ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    },
    lockTarget: function() {
        var heroX = Game.hero.pos.x,
            myX = this.pos.x;

        if ( heroX > myX ) {
            this.activeSprite = TURRET_RIGHT;
            this.direction = 'right';
        } else if ( heroX < myX ) {
            this.activeSprite = TURRET_LEFT;
            this.direction = 'left';
        }
        this.animated = true;
    },
    shoot: function() {
        this.createBullet( this.pos.x, this.pos.y, this.bulletSpeed, 0 );
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Interactable.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    },
    bitmaps: [
        [
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
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

Game.Entity.Enemy.Turret.Quick = Game.Entity.Enemy.Turret.extend({
    shotInterval: QUICK_TURRET_INTERVAL,
    bulletSpeed: QUICK_TURRET_SPEED,
    shoot: function() {
        this.lockTarget();
        if ( this.direction == 'left' ) {
            this.createBullet( this.pos.x, this.pos.y, this.bulletSpeed, 0 );
        } else {
            this.createBullet( this.pos.x, this.pos.y, 0 - this.bulletSpeed, 0 );
        }
    },
    bitmaps: [
        [
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
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

Game.Entity.Enemy.Turret.Smart = Game.Entity.Enemy.Turret.extend({
    shotInterval: SMART_TURRET_INTERVAL,
    bulletSpeed: SMART_TURRET_SPEED,
    shoot: function() {
        this.lockTarget();

        var heroX = Game.hero.pos.x,
            heroY = Game.hero.pos.y,
            myX = this.pos.x,
            myY = this.pos.y,
            xDiff = heroX - myX,
            yDiff = heroY - myY,
            ratio = yDiff / xDiff,
            xVelocity = this.direction == 'left' ? this.bulletSpeed : 0 - this.bulletSpeed,
            yVelocity = ratio * xVelocity;

        if ( Math.abs( yVelocity ) <= Math.abs( xVelocity ) ) {
            this.createBullet( this.pos.x, this.pos.y, xVelocity, yVelocity );
        }
    },
    bitmaps: [
        [
            [ "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
        ],
        [
            [ "transparent", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
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
        this.moves = [
            {
                delta: 500,
                move: function() { this.pos.x -= Game.unit; this.moved = true; },
                until: function() {
                    return this.adjacentTo( 'Terrain.Land', 'left' ) || this.adjacentToLevelEdge( 'left' );
                }
            },
            {
                delta: 500,
                move: function() { this.pos.x += Game.unit; this.moved = true; },
                until: function() {
                    return this.adjacentTo( 'Terrain.Land', 'right' ) || this.adjacentToLevelEdge( 'right' );
                }
            }
        ];
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.activeSprite == 11 ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
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
        this.velocity.x = -0.09;
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
        this.moves = [
            {
                delta: 500,
                move: this.__proto__.dropEgg,
                until: function() { return false }
            }
        ];
    },
    dropEgg: function() {
        // TODO - calculate when to lay the egg based on vertical distance form hero
        if ( Math.abs( Game.hero.pos.x - this.pos.x ) < Game.unit * 4 ) {
            var eggWidth = Game.Entity.Interactable.Egg.prototype.width,
                x = this.pos.x + ( Game.unit - eggWidth ) / 2,
                y = this.pos.y + this.height,
                xVelocity = this.velocity.x,
                yVelocity = 0,
                egg = new Game.Entity.Interactable.Egg( x, y );

            Game.currentLevel.entities.push( egg );
            egg.velocity = new Game.Vector( xVelocity, yVelocity );
        }
    },
    generateNextCoords: function( timeDiff ) {
        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }
        // TODO - check for on top of ground to destroy entity
        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
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

var SPIDER_FALLING = 8,
    SPIDER_WALKING_1 = 0,
    SPIDER_WALKING_2 = 1,
    SPIDER_WALKING_3 = 2,
    SPIDER_WALKING_4 = 3,
    SPIDER_WALKING_5 = 4,
    SPIDER_WALKING_6 = 5,
    SPIDER_WALKING_7 = 6,
    SPIDER_WALKING_8 = 7;

Game.Entity.Enemy.Spider = Game.Entity.Enemy.extend({
    ignoreGravity: true,
    init: function( x, y ) {
        this._super( x, y );
        this.animationStates = {
            'walking_left': {
                delta: 180,
                sequence: [ SPIDER_WALKING_1, SPIDER_WALKING_2, SPIDER_WALKING_3, SPIDER_WALKING_4 ],
                times: 'infinite'
            },
            'walking_right': {
                delta: 180,
                sequence: [ SPIDER_WALKING_5, SPIDER_WALKING_6, SPIDER_WALKING_7, SPIDER_WALKING_8 ],
                times: 'infinite'
            },
            'falling': {
                delta: 1000,
                sequence: [ SPIDER_FALLING ],
                times: 'infinite'
            }
        }
        this.moves = [
            {
                delta: 0,
                move: function() {
                    this.state = 'walking_left';
                    this.velocity.x = -0.06;
                },
                until: function() {
                    var land = this.adjacentTo( 'Terrain.Land', 'top' ).entity,
                        edgePiece;
                    if ( land ) {
                        edgePiece = !land.adjacentTo( 'Terrain.Land', 'left' ) && !land.adjacentToLevelEdge( 'left' );
                        if ( edgePiece && this.pos.x <= land.pos.x ) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
            },
            {
                delta: 0,
                move: function() {
                    this.state = 'walking_right';
                    this.velocity.x = 0.06;
                },
                until: function() {
                    var land = this.adjacentTo( 'Terrain.Land', 'top' ).entity,
                        edgePiece;
                    if ( land ) {
                        edgePiece = !land.adjacentTo( 'Terrain.Land', 'right' ) && !land.adjacentToLevelEdge( 'right' );
                        if ( edgePiece && this.pos.x >= land.pos.x ) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
            }
        ];
    },
    generateNextCoords: function( timeDiff ) {
        if ( Math.abs( Game.hero.pos.x - this.pos.x ) < 2 * Game.unit ) {
            this.state = 'falling';
            this.ignoreGravity = false;
        }
        this._super( timeDiff );
    },
    bitmaps: [
        [
            [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "transparent", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "rgba(0,0,0,0)", "#ff0000", "transparent", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent" ],
            [ "#ff0000", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent" ]
        ]
    ]
});
