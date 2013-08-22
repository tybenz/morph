/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, window, document, undefined ) {

var TILESIZE = 36;

Game.Level = Class.extend({
    init: function( type, title, next, grid ) {
        var ents = {},
            i, j, entity;

        this.entities = [];
        this.title = title;
        this.type = type;
        this.next = next;
        this.grid = grid;
        for ( i in this.grid ) {
            // A row can be represented as a string
            // Ex: 'blank*20|hero.man*1|interactable.rock*1|blank*10|enemy.monster*1|blank*100'
            // Here, we turn those strings into a normal array
            if ( typeof this.grid[i] == 'string' ) {
                var types = this.grid[i].split('|');
                this.grid[i] = [];
                for ( var k = 0, len3 = types.length; k < len3; k++ ) {
                    var type = types[k].split( '*' )[0],
                        num = parseInt( types[k].split( '*' )[1] );
                    for ( var h = 0; h < num; h++ ) {
                        this.grid[i].push( type );
                    }
                }
            }
            for ( j in this.grid[ i ] ) {
                entity = this.grid[ i ][ j ];
                if ( !( entity in ents ) ) {
                    ents[ entity ] = entity;
                    this.entityCount++;
                }
            }
        }
        this.width = TILESIZE * grid[0].length;
        this.height = TILESIZE * grid.length;
    },
    loadNextLevel: function() {
        if ( this.next ) {
            Game.stop();
            Game.init( this.next );
        }
    }
});

Game.Levels = {
    '01': new Game.Level( 'land', '01', null, [
        "blank*7|terrain.land*1|blank*100|terrain.land*2",
        "blank*7|terrain.land*1|blank*100|terrain.land*2",
        "blank*7|terrain.land*1|blank*19|enemy.monster*1|blank*2|interactable.rock*1|blank*41|enemy.bird*1|blank*35|terrain.land*2",
        "blank*7|terrain.land*1|blank*14|terrain.land*11|blank*58|terrain.land*1|interactable.heart*1|enemy.monster*1|blank*1|enemy.monster*1|blank*1|enemy.monster*1|interactable.heart*1|terrain.land*1|blank*8|terrain.land*2",
        "blank*4|interactable.rock*1|blank*2|terrain.land*1|blank*25|terrain.land*2|blank*53|enemy.bird*1|blank*2|terrain.land*3|terrain.trapdoor(2)*3|terrain.land*3|blank*8|terrain.land*2",
        "blank*3|terrain.land*5|blank*26|terrain.land*2|blank*24|terrain.land*7|blank*41|terrain.land*2",
        "blank*7|terrain.land*1|blank*11|enemy.monster*1|blank*16|terrain.land*2|blank*31|enemy.bird*1|blank*13|terrain.land*6|blank*19|terrain.land*2",
        "blank*7|terrain.land*1|blank*5|terrain.land*9|blank*15|terrain.land*3|blank*2|enemy.monster*1|terrain.land*1|blank*12|enemy.bird*1|blank*25|enemy.bird*1|blank*25|terrain.land*2",
        "blank*7|terrain.land*1|blank*21|interactable.heart*1|blank*10|terrain.land*4|blank*14|enemy.turret*1|blank*31|interactable.rock*1|blank*1|interactable.switch[6](2)*1|blank*15|terrain.land*2",
        "terrain.land*4|blank*3|terrain.land*1|blank*17|terrain.land*5|blank*23|terrain.land*7|blank*29|terrain.land*4|blank*15|terrain.land*2",
        "blank*7|terrain.land*1|blank*40|interactable.rock*1|blank*59|terrain.land*2",
        "blank*7|terrain.trapdoor(1)*1|blank*37|terrain.land*6|blank*57|terrain.trapdoor(3)*1|blank*1",
        "hero.man*1|blank*3|interactable.switch[6](1)*1|blank*2|terrain.trapdoor(1)*1|blank*6|enemy.monster*1|blank*64|enemy.monster*1|blank*1|enemy.monster*1|blank*1|enemy.monster*1|blank*19|interactable.rock*1|blank*1|interactable.switch[6](3)*1|blank*2|terrain.trapdoor(3)*1|blank*1",
        "terrain.land*25|blank*44|terrain.land*19|blank*14|terrain.land*8"
    ])
};

})( Game, window, document );
