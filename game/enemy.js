/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    TURRET_INTERVAL = Settings.turretInterval,
    QUICK_TURRET_INTERVAL = Settings.quickTurretInterval,
    SMART_TURRET_INTERVAL = Settings.smartTurretInterval,
    TURRET_SPEED = Settings.turretSpeed,
    QUICK_TURRET_SPEED = Settings.quickTurretSpeed,
    SMART_TURRET_SPEED = Settings.smartTurretSpeed,
    SUBMARINE_SPEED = Settings.submarineSpeed,
    BALLOON_SPEED = Settings.balloonSpeed,
    BATTLESHIP_SPEED = Settings.battleshipSpeed,
    BIRD_VELOCITY = Settings.birdVelocity,
    SPIDER_VELOCITY = Settings.spiderVelocity,
    SPIDER_CLIMBING_VELOCITY = Settings.spiderClimbingVelocity,
    BALLOON_HORIZONTAL_VELOCITY = Settings.balloonHorizontalVelocity,
    BALLOON_VERTICAL_VELOCITY = Settings.balloonVerticalVelocity,
    BALLOON_VERTICAL_BOUNDARY = Settings.balloonVerticalBoundary,
    MONSTER_WALKING_INTERVAL = Settings.monsterWalkingInterval;

Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    drawLayer: 3,
    states: {
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'enemy-dying-1', 'enemy-dying-2', 'enemy-dying-3', 'enemy-dying-4', 'enemy-dying-5', 'enemy-dying-6', 'enemy-dying-7', 'enemy-dying-8', 'enemy-dying-9' ],
                times: 1
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
    },
    collideWith: function( entity, collisionTypes ) {
        if ( ( entity.type == 'Interactable.Rock' && ( entity.velocity.x > 0 || entity.velocity.y > 0 ) && collisionTypes )
            || ( entity.type == 'Hero.Block' && entity.velocity.y > 0 && entity.oldPos.y < this.pos.y )
            || ( entity.type == 'Hero.Clock' && entity.velocity.y > 0 && entity.oldPos.y < this.pos.y )
            || entity.type == 'Interactable.Bullet' || entity.type == 'Interactable.Tongue' || entity.type == 'Interactable.Lightning' || entity.type == 'Interactable.Heat' ) {

            this.changeState( 'dying' );
        }
        this._super( entity, collisionTypes );
    }
});

Game.Entity.Enemy.Turret = Game.Entity.Enemy.extend({
    type: 'Enemy.Turret',
    bulletSpeed: TURRET_SPEED,
    initialSprite: 'turret',
    rightSprite: 'turret',
    leftSprite: 'turret',
    initialState: 'shooting',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'shooting': {
            animation: null,
            actions: [{
                delta: TURRET_INTERVAL,
                action: function() { this.shoot(); }
            }]
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.lastShot = Date.now();
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.activeSprite == 'enemy-dying-9' ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    },
    lockTarget: function() {
        var heroX = Game.hero.pos.x,
            myX = this.pos.x;

        if ( heroX > myX ) {
            this.activeSprite = this.rightSprite;
            this.direction = 'right';
        } else if ( heroX < myX ) {
            this.activeSprite = this.leftSprite;
            this.direction = 'left';
        }
        this.animated = true;
    },
    shoot: function() {
        this.createBullet( this.pos.x, this.pos.y, this.bulletSpeed, 0 );
    },
    createBullet: function( x, y, xVelocity, yVelocity ) {
        var bullet = new Game.Entity.Enemy.Bullet( x, y );
        Game.currentLevel.entities.push( bullet );
        bullet.velocity = new Game.Vector( xVelocity, yVelocity );
    }
});

Game.Entity.Enemy.Monster = Game.Entity.Enemy.extend({
    type: 'Enemy.Monster',
    initialSprite: 'monster-open',
    initialState: 'walking',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'walking': {
            animation: {
                delta: 150,
                sequence: [ 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-open', 'monster-closing', 'monster-closed', 'monster-closed', ],
                times: 'infinite'
            },
            actions: [
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x -= TILESIZE; },
                    until: function() {
                        return this.adjacentTo( 'Terrain.Land', 'left' ) || this.adjacentToLevelEdge( 'left' );
                    }
                },
                {
                    delta: MONSTER_WALKING_INTERVAL,
                    action: function() { this.pos.x += TILESIZE; },
                    until: function() {
                        return this.adjacentTo( 'Terrain.Land', 'right' ) || this.adjacentToLevelEdge( 'right' );
                    }
                }
            ]
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );
        if ( this.activeSprite == 'enemy-dying-9' ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Enemy.Bird = Game.Entity.Enemy.extend({
    type: 'Enemy.Bird',
    count: 0,
    initialSprite: 'bird-wings-up',
    initialState: 'flying',
    states: {
        'dying': Game.Entity.Enemy.prototype.states.dying,
        'flying': {
            animation: {
                delta: 200,
                sequence: [ 'bird-wings-up', 'bird-wings-down' ],
                times: 'infinite'
            },
            actions: [{
                delta: 500,
                action: function() {
                    this.dropEgg();
                },
                until: function() { return false }
            }]
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
        this.velocity.x = BIRD_VELOCITY;
    },
    dropEgg: function() {
        if ( Math.abs( Game.hero.pos.x - this.pos.x ) < TILESIZE * 4 ) {
            var eggWidth = Game.Entity.Interactable.Egg.prototype.width,
                x = this.pos.x + ( TILESIZE - eggWidth ) / 2,
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
        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
        this._super( timeDiff );
    },
    collideWith: function( entity, collisionTypes ) {
        this._super( entity, collisionTypes );
        if ( entity.type == 'Terrain.Land' && this.state != 'dying' ) {
            this.pos.x = entity.pos.x + entity.width;
            this.velocity.x = 0;
            this.changeState( 'dying' );
        }
    }
});

Game.Entity.Enemy.Bullet = Game.Entity.Enemy.extend({
    type: 'Enemy.Bullet',
    initialSprite: 'bullet-red',
    drawLayer: 0,
    width: 4,
    height: 4,
    states: Game.Entity.prototype.states,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' || entity.type == 'Interactable.Lightning' ) {
            Game.destroyEntity( this );
        }
    }
});

})( Game, Settings, window, document );
