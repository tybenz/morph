/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

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
    initialSprite: 'land'
});

Game.Entity.Terrain.Wave = Game.Entity.Terrain.extend({
    type: 'Terrain.Wave',
    drawLayer: 4,
    initialSprite: 'wave-1',
    initialState: 'rolling',
    states: {
        'rolling': {
            animation: {
                delta: 400,
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
                delta: 400,
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
                delta: 400,
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
