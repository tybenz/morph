/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Machine = Game.Entity.extend({
    type: 'Machine',
    ignoreGravity: true,
    init: function( x, y ) {
        this.width = Game.unit * 2;
        this.height = Game.unit * 2;
        this._super( x, y );
    },
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#00ff00", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f" ]
        ]
    ]
});
