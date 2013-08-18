/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var WAVE_SPEED = Settings.waveSpeed,
    TILESIZE = Settings.tileSize;

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
    generateNextCoords: function( timeDiff ) {
        this._super( timeDiff );

        if ( this.state == 'dying' ) {
            this.ignoreGravity = false;
        }

        if ( this.state == 'dying' && this.adjacentTo( 'Terrain.Land', 'bottom' ) ) {
            this.visible = false;
            Game.destroyEntity( this );
        }
    }
});

Game.Entity.Terrain.Trapdoor = Game.Entity.Terrain.Land.extend({
    type: 'Terrain.Trapdoor',
    initialSprite: 'trapdoor'
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
    drawLayer: 5,
    initialSprite: 'water'
});

Game.Entity.Terrain.Portal = Game.Entity.Terrain.extend({
    type: 'Terrain.Portal',
    initialState: 'still'
});

Game.Entity.Terrain.Invisible = Game.Entity.Terrain.extend({
    type: 'Terrain.Invisible',
    initialState: 'still'
});

})( Game, Settings, window, document );
