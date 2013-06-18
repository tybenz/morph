/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Machine = Game.Entity.extend({
    type: 'Machine',
    width: Game.unit * 2,
    height: Game.unit * 2,
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
        this.width = Game.unit * 2;
        this.height = Game.unit * 2;
        this.ignoreGravity = true;
    }
});
