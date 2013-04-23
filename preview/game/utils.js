/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

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

window.requestAnimationFrame = (function() {
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
