/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    GREEN = Settings.heroColor;

Game.Map = {
    // Compact grid down into significant places only
    // any items without an @ character are unimportant for the visual map
    init: function() {
        // Make a copy of the grid
        var grid = $.extend( {}, this.grid );

        var compact = false;
        while ( !compact ) {
            compact = true;
            for ( var i in grid ) {
                // If we have any non-important places pointing to another non-important place
                // continue to compact the map
                if ( i.charAt(0) != '@' && grid[i] && grid[i].charAt(0) != '@' ) {
                    compact = false;
                }

                if ( grid[i] ) {
                    var places = grid[i].split( ',' );
                    for ( var j = 0, len = places.length; j < len; j++ ) {
                        if ( places[j].charAt(0) != '@' ) {
                            var tmp = grid[ places[j] ];
                            delete grid[places[j]];
                            places[j] = tmp;
                        }
                    }
                    grid[i] = places.join(',');
                }
            }
        }

        this.map = grid;
    },
    grid: {
        '@impressionism!': '@irontown',
        '@irontown': 'the-cliffs-of-magnitude,vines-and-branches',
        'the-cliffs-of-magnitude': 'fade-to-black',
        'fade-to-black': '@the-lab',
        '@the-lab': null,
        'vines-and-branches': 'damascus',
        'damascus': 'induction',
        'induction': '@scala',
        '@scala': 'grams-and-pounds',
        'grams-and-pounds': 'rictor',
        'rictor': 'lima-bravo',
        'lima-bravo': '@fortress-enigma',
        '@fortress-enigma': null
    },
    locationNames: function() {
        var names = [];
        for ( var i in this.map ) {
            names.push(
                i.replace( /@/, '' ).replace( /!/, '' )
                 .replace( /^(.)/, function( _, l ) { return l.toUpperCase(); } )
                 .replace( /-(.)/, function( _, l ) { return ' ' + l.toUpperCase(); } )
            );
        }

        return names;
    },
    draw: function( ctx, startX, startY ) {
    }
};

})( Game, Settings, window, document );
