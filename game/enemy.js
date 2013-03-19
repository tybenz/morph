/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    drawLayer: 2,
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
    actions: [],
    sequence: [] //sequence of moves/actions
});

Game.Entity.Enemy.Monster = Game.Entity.Enemy.extend({
    type: 'Enemy.Monster',
    bitmaps: [[
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ]]
});
