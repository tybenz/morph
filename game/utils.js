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
}
