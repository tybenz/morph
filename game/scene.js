/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Scene = Class.extend({
    init: function( actors, actions ) {
        var entities = Game.currentLevel.entities;

        this.actions = actions;
        this.playing = false;

        // Find actors in level
        this.actors = [];
        for ( var j = 0, l1 = actors.length; j < l1; j++ ) {
            for ( var i = 0, l2 = entities.length; i < l2; i++ ) {
                if ( entities[i].type.match( actors[j] ) ) {
                    this.actors[j] = entities[i];
                    break;
                }
            }
            if ( !this.actors[j] ) {
                throw new Error( actors[j] + ' not found in level!' );
            }
        }
    },
    play: function() {
        this.playing = true;
        Game.keysLocked = true;
    },
    stop: function() {
        this.playing = false;
        Game.keysLocked = false;
    },
    next: function() {
        var actions = this.actions,
            actionObj;

        // Get active action
        this.activeAction = this.activeAction || 0;
        if ( this.activeAction == actions.length ) {
            this.stop();
            return;
        }
        actionObj = actions[ this.activeAction ];

        // Define last action if not defined
        this.lastAction = this.lastAction || Date.now();

        if ( ( Date.now() - this.lastAction ) > actionObj.delta ) {
            actionObj.action( this.actors );
            this.activeAction++;
            this.lastAction = Date.now();
        }
    }
});

Game.Scenes = {
    'Intro': {
        actors: [ 'Friend.Kid', 'Hero' ],
        actions: [
            {
                delta: 500,
                dialog: 'Hello? Are you awake?',
                action: function( actors ) {
                    var kid = actors[0],
                        hero = actors[1];

                    kid.say( this.dialog );
                }
            },
            {
                delta: 200,
                action: function( actors ) {
                    var kid = actors[0];

                    kid.jump();
                }
            },
            {
                delta: 700,
                action: function( actors ) {
                    var kid = actors[0];

                    kid.jump();
                }
            },
            {
                delta: 3000,
                dialog: 'Huh? Where am I?',
                action: function( actors ) {
                    var hero = actors[1];
                    hero.say( this.dialog );
                }
            }
        ]
    }
};
