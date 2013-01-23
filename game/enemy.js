Game.Entity.Enemy = Game.Entity.extend({
    type: 'Enemy',
    move: {
        'right': function() {
            this.x += Game.unit;
        },
        'left': function() {
            this.x -= Game.unit;
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
    sprites: [ Game.Sprite( 'sprites/enemy/monster-open.png' ) ]
});
