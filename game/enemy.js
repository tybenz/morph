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

Game.Entity.Enemy.Bird = Game.Entity.Enemy.extend({
    type: 'Enemy.Bird',
    ignoreGravity: true,
    count: 0,
    sequence: [ 0, 1 ],
    sequenceStep: 0,
    lastMoved: Date.now(),
    init: function( x, y ) {
        this._super( x, y );
        this.velocity.x = -0.09;
        this.activeSprite = 1;
    },
    animate: function( timeDiff ) {
        if ( Date.now() - this.lastMoved > 200 ) {
            this.activeSprite = this.nextSprite();
            this.lastMoved = Date.now();
        }
    },
    nextSprite: function() {
        this.sequenceStep = ( this.sequenceStep + 1 ) % this.sequence.length;
        return this.sequence[ this.sequenceStep ];
    },
    bitmaps: [
        [
            [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
        ],
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
            [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
            [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
        ]
    ]
});
