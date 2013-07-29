/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var MACHINE_WIDTH = Settings.machineWidth,
    MACHINE_HEIGHT = Settings.machineHeight;

Game.Entity.Machine = Game.Entity.extend({
    type: 'Machine',
    width: MACHINE_WIDTH,
    height: MACHINE_HEIGHT,
    initialSprite: 'machine-green',
    initialState: 'flashing-light',
    states: {
        'flashing-light': {
            animation: {
                delta: 1200,
                sequence: [ 'machine-green', 'machine-red' ],
                times: 'infinite'
            }
        }
    },
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

})( Game, Settings, window, document );
