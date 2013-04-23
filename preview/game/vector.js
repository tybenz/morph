/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Vector = Class.extend({
    init: function( x, y ) {
        this.x = x;
        this.y = y;
    },
    add: function(vector) {
        var vector = new Game.Vector(
            this.x + vector.x,
            this.y + vector.y
        );
        return vector
    },
    subtract: function(vector) {
        var vector = new Game.Vector(
            this.x - vector.x,
            this.y - vector.y
        );
        return vector
    },
    multiply: function(scalar) {
        var vector = new Game.Vector(
            this.x*scalar,
            this.y*scalar
        );
        return vector
    },
    length: function() {
        var squareSum = Math.pow(this.x, 2) + Math.pow(this.y, 2)
        return Math.sqrt(squareSum)
    },
    duplicate: function() {
        var duplicate = new Game.Vector(this.x, this.y)
        return duplicate
    }
});
