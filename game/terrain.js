/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var WAVE_SPEED = Settings.waveSpeed;

Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    drawLayer: 1,
    portal: null, // portal to another level?
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    initialSprite: 'land',
    heatThreshold: 400,
    states: {
        'still': Game.Entity.prototype.states.still,
        'dying': {
            animation: {
                delta: 40,
                sequence: [ 'land-dying-1', 'land-dying-2', 'land-dying-3', 'land-dying-4', 'land-dying-5', 'land-dying-6', 'land-dying-7', 'land-dying-8', 'land-dying-9' ],
                times: 1
            }
        }
    },
    collideWith: function( entity, collisions, parent ) {
        this._super( entity, collisions );

        var entityList = this.entityList,
            length = entityList ? entityList.length : 0;

        if ( entity.type == 'Interactable.Heat' ) {

            var actualCollisions = this.getCollisions( entity, this.getActualDimensions() );
            if ( actualCollisions ) {
                this.heatTouched = this.heatTouched || Date.now();
            }

            if ( length ) {
                for ( var i = 1; i < this.entityList.length; i++ ) {
                    var subEnt = entityList[i].entity,
                        subCollisions = subEnt.getCollisions( entity );
                    if ( subCollisions ) {
                        subEnt.collideWith( entity, subCollisions, this );
                    }
                }
            }
        }

        if ( ( Date.now() - this.heatTouched ) > this.heatThreshold ) {
            if ( length ) {

                var newList = this.detach( this );
                length = this.entityList.length;

                if ( newList[0] ) {
                    var first = newList[0].entity;
                    newList = newList.splice( 1, newList.length );

                    // Create new composite entity
                    first.attach( newList );
                    // Add new composite entity to list of entities to track
                    Game.drawLayers[ first.drawLayer ].push( first );
                    Game.currentLevel.entities.push( first );

                    this.changeState( 'dying' );

                    if ( length ) {
                        for ( var i = 1; i < length; i++ ) {
                            var subEnt = entityList[i].entity,
                                subCollisions = subEnt.getCollisions( entity );
                            if ( subCollisions ) {
                                subEnt.collideWith( entity, subCollisions, this );
                            }
                        }
                    }
                }
            } else if ( parent ) {
                var newList = parent.detach( this );

                if ( newList[0] ) {
                    var first = newList[0].entity;
                    newList = newList.splice( 1, newList.length );

                    // Create new composite entity
                    first.attach( newList );
                    // Add new composite entity to list of entities to track
                    Game.drawLayers[ first.drawLayer ].push( first );
                    Game.currentLevel.entities.push( first );
                }

                // Just detached add as a singular entity to entity list
                Game.drawLayers[ this.drawLayer ].push( this );
                Game.currentLevel.entities.push( this );
                this.changeState( 'dying' );
            } else {
                this.changeState( 'dying' );
            }
        }
    },
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.heatTouched && !this.hasCollisionWith( 'Interactable.Heat' ) ) {
            this.heatTouched = null;
        }

        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }

        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Terrain.Wave = Game.Entity.Terrain.extend({
    type: 'Terrain.Wave',
    drawLayer: 4,
    initialSprite: 'wave-1',
    initialState: 'rolling',
    states: {
        'rolling': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5', 'wave-6', 'wave-7', 'wave-8', 'wave-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Water = Game.Entity.Terrain.extend({
    type: 'Terrain.Water',
    drawLayer: 4,
    initialSprite: 'water'
});

Game.Entity.Terrain.Waterfall = Game.Entity.Terrain.extend({
    type: 'Terrain.Waterfall',
    drawLayer: 4,
    initialSprite: 'waterfall-1',
    initialState: 'falling',
    states: {
        'falling': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'waterfall-1', 'waterfall-2', 'waterfall-3', 'waterfall-4', 'waterfall-5', 'waterfall-6', 'waterfall-7', 'waterfall-8', 'waterfall-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Waterclimb = Game.Entity.Terrain.extend({
    type: 'Terrain.Waterclimb',
    drawLayer: 4,
    initialSprite: 'waterclimb-1',
    initialState: 'climbing',
    states: {
        'climbing': {
            animation: {
                delta: WAVE_SPEED,
                sequence: [ 'waterclimb-1', 'waterclimb-2', 'waterclimb-3', 'waterclimb-4', 'waterclimb-5', 'waterclimb-6', 'waterclimb-7', 'waterclimb-8', 'waterclimb-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Portal = Game.Entity.Terrain.extend({
    type: 'Terrain.Portal',
    initialState: 'still'
});

Game.Entity.Terrain.Invisible = Game.Entity.Terrain.extend({
    type: 'Terrain.Invisible',
    initialState: 'still'
});

Game.Entity.Terrain.Cloud = Game.Entity.Terrain.extend({
    type: 'Terrain.Cloud',
    initialState: 'still',
    initialSprite: 'cloud-1',
    init: function( x, y ) {
        this._super( x, y );
        var rand = Math.random();
        if ( rand > 0.66 ) {
            this.activeSprite = 'cloud-1';
        } else if ( rand > 0.33 ) {
            this.activeSprite = 'cloud-2';
        } else {
            this.activeSprite = 'cloud-3';
        }
    }
});

Game.Entity.Terrain.Bubble = Game.Entity.Terrain.extend({
    type: 'Terrain.Bubble',
    initialState: 'still',
    initialSprite: 'bubble'
});

})( Game, Settings, window, document );
