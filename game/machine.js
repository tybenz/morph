/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Machine = Game.Entity.extend({
    type: 'Machine',
    ignoreGravity: true,
    initialSprite: 'machine-green',
    init: function( x, y ) {
        this.width = Game.unit * 2;
        this.height = Game.unit * 2;
        this._super( x, y );
        this.animationStates = {
            'flashing-light': {
                delta: 1200,
                sequence: [ 'machine-green', 'machine-red' ],
                times: 'infinite'
            }
        };
        this.state = 'flashing-light';
    }
});
