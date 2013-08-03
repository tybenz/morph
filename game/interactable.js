/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize;

Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    drawLayer: 2,
    collectable: null // indicates whether it automatically goes into inventory
});

Game.Entity.Interactable.Rock = Game.Entity.Interactable.extend({
    type: 'Interactable.Rock',
    initialSprite: 'rock',
    init: function( x, y ) {
        this.velocity = new Game.Vector( 0, 0 );
        this._super( x, y );
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Hero.Man' ) {
            if ( this.velocity.y > 0 && collisionTypes ) {
                this.velocity.y = 0;
                this.pos.y = entity.pos.y - entity.height;
                if ( !entity.holding ) {
                    entity.actions.pickup.call( entity, this );
                }
            }
        }
        if ( entity.type == 'Terrain.Land' ) {
            if ( this.velocity.x > 0 && this.velocity.y == 0 && collisionTypes ) {
                this.velocity.x = 0;
                this.pos.x = entity.pos.x - this.width;
            } else if ( this.velocity.x < 0 && this.velocity.y == 0 && collisionTypes ) {
                this.velocity.x = 0;
                this.pos.x = entity.pos.x + this.width;
            }
        }
        this._super( entity, collisionTypes );
    },
    generateNextCoords: function( timeDiff ) {
        var frictionalForce;
        if ( this.velocity.x >= 0 ) {
            frictionalForce = ( new Game.Vector( -0.0003, 0 ) ).multiply( timeDiff );
        } else {
            frictionalForce = ( new Game.Vector( 0.0003, 0 ) ).multiply( timeDiff );
        }
        if ( this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            if ( this.velocity.x != 0 ) {
                this.velocity = this.velocity.add( frictionalForce );
            }
            if ( Math.abs( this.velocity.x ) < 0.05 ) {
                this.velocity.x = 0;
            }
        }
        this._super( timeDiff );
    }
});

Game.Entity.Interactable.Coin = Game.Entity.Interactable.extend({
    type: 'Interactable.Coin',
    initialSprite: 'coin',
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Heart = Game.Entity.Interactable.extend({
    type: 'Interactable.Heart',
    initialSprite: 'heart',
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Bullet = Game.Entity.Interactable.extend({
    type: 'Interactable.Bullet',
    initialSprite: 'bullet-green',
    drawLayer: 0,
    width: ( TILESIZE / 9 ) * 2,
    height: ( TILESIZE / 9 ) * 2,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Egg = Game.Entity.Interactable.extend({
    type: 'Interactable.Egg',
    initialSprite: 'egg',
    width: ( TILESIZE / 9 ) * 3,
    height: ( TILESIZE / 9 ) * 4,
    drawLayer: 0,
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Tongue = Game.Entity.Interactable.extend({
    type: 'Interactable.Tongue',
    initialSprite: 'frog-tongue',
    width: ( TILESIZE / 9 ) * 10,
    height: TILESIZE / 9,
    yOffset: ( TILESIZE / 9 ) * 4,
    drawLayer: 2,
    init: function( x, y, frog, velocity ) {
        this._super( x, y );
        this.initialX = x;
        this.velocity.x = velocity || 0;
        this.initialVelocity = this.velocity.x;
        this.ignoreGravity = true;
        this.frog = frog;
    },
    collideWith: function( entity, collisionTypes ) {
        if ( entity.type == 'Terrain.Land' ) {
            Game.destroyEntity( this );
        }
        if ( entity.type ==  'Interactable.Coin' ) {
            Game.destroyEntity( entity );
            Game.Inventory.incrementCurrency();
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.frog.state.indexOf( 'jumping' ) != -1 ) {
            this.pos.y = this.frog.pos.y + this.yOffset - ( TILESIZE / 9 ) * 2;
        } else {
            this.pos.y = this.frog.pos.y + this.yOffset;
        }

        if ( Math.abs( this.pos.x - this.initialX ) >= this.width - ( ( TILESIZE / 9 ) * 6.5 ) ) {
            this.velocity.x = 0 - this.velocity.x;
        }

        if ( this.initialVelocity > 0 && this.velocity.x < 0 && Math.abs( this.pos.x - this.initialX ) <= ( ( TILESIZE / 9 ) * 5 ) ) {
            Game.hero.doneLicking();
            Game.destroyEntity( this );
        }
        if ( this.initialVelocity < 0 && this.velocity.x > 0 && Math.abs( this.pos.x - this.initialX ) <= ( ( TILESIZE / 9 ) * 5 ) ) {
            Game.hero.doneLicking();
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Interactable.Lightning = Game.Entity.Interactable.extend({
    type: 'Interactable.Lightning',
    initialSprite: 'lightning',
    initialState: 'flashing',
    width: TILESIZE * 3,
    height: TILESIZE * 3,
    shockFor: 1000,
    init: function( x, y, jellyfish ) {
        this._super( x, y );
        this.created = Date.now();
        this.ignoreGravity = true;
        this.jellyfish = jellyfish;
    },
    states: {
        'flashing': {
            animation: {
                delta: 120,
                sequence: [ 'initial', 'invisible' ],
                times: 'infinite'
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( Date.now() - ( this.created ) > this.shockFor ) {
            Game.destroyEntity( this );
        }

        this.pos.x = this.jellyfish.pos.x - TILESIZE;
        this.pos.y = this.jellyfish.pos.y - TILESIZE;
    }
});

Game.Entity.Interactable.Heat = Game.Entity.Interactable.extend({
    type: 'Interactable.Heat',
    drawLayer: 5,
    initialSprite: 'heat',
    initialState: 'wave',
    width: TILESIZE * 5,
    height: TILESIZE * 3,
    states: {
        'wave': {
            animation: {
                delta: 50,
                sequence: [ 'heat', 'heat-2' ],
                times: 'infinite'
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        this.pos.x = this.flame.pos.x - 2 * TILESIZE;
        this.pos.y = this.flame.pos.y - 2 * TILESIZE;
    },
    init: function( x, y, flame ) {
        this._super( x, y );
        this.flame = flame;
        this.ignoreGravity = true;
    }
});

Game.Entity.Interactable.Switch = Game.Entity.Interactable.extend({
    type: 'Interactable.Switch',
    initialSprite: 'switch',
    width: TILESIZE,
    height: ( TILESIZE / 9 ) * 3,
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    },
    setDoors: function( doors ) {
        doors = $.isArray( doors ) ? doors : [ doors ];
        this.doors = doors;
    },
    collideWith: function( entity, collisions ) {
        if ( entity.type == 'Interactable.Rock' && entity.pos.y <= this.pos.y ) {
            for ( var i = 0, len = this.doors.length; i < len; i++ ) {
                this.doors[i].changeState( 'dying' );
            }
        }
    }
});

Game.Entity.Interactable.Map = Game.Entity.Interactable.extend({
    type: 'Interactable.Map'
});

})( Game, Settings, window, document );
