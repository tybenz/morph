Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
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
    transform: function() {
        //transform method
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
            [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00"  ]
        ]
    ]
});
