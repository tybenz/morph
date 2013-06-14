/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

// Flip bitmap
flipBitmap = function( b ) {
    $.each( b, function( i,bit ) {
        bit.reverse();
    });

    return JSON.stringify(b, undefined, 4).
                replace( /",\n(\s)*/g, '", ' ).
                replace( /\[\n\s*"/g, '[ "' ).
                replace( /"\n\s*\]/g, '" ]' );
};

// Capitalize only the first letters in a string
// passing in a delimiters means each "word" will be capitalized
String.prototype.capitalize = function( delim ) {
    var arr, i;
    if ( !delim ) {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    arr = this.split( delim );
    for ( i in arr ) {
        arr[ i ] = arr[ i ].capitalize();
    }
    return arr.join( delim );
};

// Request/Cancel Animation Frame Polyfill
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
