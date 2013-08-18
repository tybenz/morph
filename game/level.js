/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, window, document, undefined ) {

var TILESIZE = 36;

var A = 'blank',
    B = 'terrain.land',
    C = 'terrain.water',
    D = 'terrain.wave',
    E = 'hero.man',
    F = 'hero.boat',
    G = 'hero.plane',
    H = 'enemy.monster',
    I = 'enemy.spider',
    J = 'enemy.bird',
    K = 'enemy.battleship',
    L = 'enemy.balloon',
    M = 'enemy.turret',
    N = 'interactable.coin',
    O = 'interactable.heart',
    P = 'interactable.rock',
    Q = function( id ) {
        return 'terrain.trapdoor(' + id + ')';
    },
    R = function( id ) {
        return 'interactable.switch[6](' + id + ')';
    };

Game.Level = Class.extend({
    init: function( type, title, next, grid ) {
        var ents = {},
            i, j, entity;

        this.entities = [];
        this.title = title;
        this.type = type;
        this.width = TILESIZE * grid[0].length;
        this.height = TILESIZE * grid.length;
        this.next = next;
        this.grid = grid;
        for ( i in this.grid ) {
            for ( j in this.grid[ i ] ) {
                entity = this.grid[ i ][ j ];
                if ( !( entity in ents ) ) {
                    ents[ entity ] = entity;
                    this.entityCount++;
                }
            }
        }
    },
    loadNextLevel: function() {
        if ( this.next ) {
            Game.stop();
            Game.init( this.next );
        }
    }
});

Game.Levels = {
    'impressionism': new Game.Level( 'land', 'Impressionism', 'irontown', [
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, M, B ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, H, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, A, A, A, A, A, B, B ],
        [ A, A, A, A, A, A, O, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, M, B, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, B, B, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, B, B, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, H, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, B, B, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, B, B, A, A, A, A, B, A, A, A, H, B, A, A, A, A, A, A, A, H, A, A, A, H, A, A, A, M, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, H, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, P, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, M, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, M, B, B, B, B, B, B, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, H, A, A, H, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ E, A, A, N, A, A, A, A, A, B, A, A, A, A, A, A, H, A, B, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, D, D, D, D, A, A, P, A, B, A, A, A, A, A, A, A, A, M, A, A, A, A, H, A, H, A, H, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, M, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, M, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, C, C, C, C, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B ]
    ]),
    'the-cliffs-of-magnitude': new Game.Level( 'land', 'The Cliffs of Magnitude', 'fade-to-black', [
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, B, B, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, B, B, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, J, A, A, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, B, A, A, A, A, A, A, B, A, A, A, A, A, A, A, B, B ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, B, O, A, A, A, A, B, B, A, A ],
        [ A, A, A, A, A, A, A, B, B, B, B, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, B, B, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, O, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, B, B, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A ],
        [ E, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A ]
    ]),
    'fade-to-black': new Game.Level( 'land', 'Fade to Black', null, [
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, H, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, H, B, B, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, B, Q(1), B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, B, B, B, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, P, A, A, R(2), A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, B, B, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, Q(2), Q(2) ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, B, B, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, B, A, A, A, A, B, A, A, A, A, B, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, J, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, B, B, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, B, B, A, A, A, B, A, A, A, A, A, A, A, A, A, A, A, A, H, A, A, H, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, B, B, Q(3), Q(3), Q(3), B, B, A, A, A, A, A, A, A, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, B, A, A, A, A, A, B, B, B, A, A, A, A, A, A, A, B, B, B, A, A, A, B, B, B, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, B, B, B, B, B, B, B, B, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, B, A, B, A, B, A, B, A, B, A, B, A, A, B, B, B, B, B, B, B, B, B, B, A, A, A, A ],
        [ E, A, P, R(3), A, A, A, B, O, A, A, A, A, H, A, B, B, B, A, A, A, A, B, B, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, H, A, H, A, A, A, B, B, B, B, B, B, B, B, B, B, B, B, A, A, R(1), A, D, D, D, D, D, A, A, M, A, B, A, B, A, B, A, B, A, B, A, B, A, A, B, B, B, B, B, B, B, B, B, B, B, A, A, A ],
        [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, C, C, C, C, C, B, B, B, B, B, A, B, A, B, A, B, A, B, A, B, A, A, B, B, B, B, B, B, B, B, B, B, B, B, B, B ]
    ])
};

})( Game, window, document );
