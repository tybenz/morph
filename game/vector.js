/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, window, document, undefined ) {

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

Game.isOnSegment = function( xi, yi, xj, yj, xk, yk ) {
    return (xi <= xk || xj <= xk) && (xk <= xi || xk <= xj) &&
        (yi <= yk || yj <= yk) && (yk <= yi || yk <= yj);
};

Game.computeDirection = function( xi, yi, xj, yj, xk, yk ) {
    var a = (xk - xi) * (yj - yi),
        b = (xj - xi) * (yk - yi);
    return a < b ? -1 : a > b ? 1 : 0;
};

/** Do line segments (x1, y1)--(x2, y2) and (x3, y3)--(x4, y4) intersect? */
Game.checkIntersection = function( p1, p2, p3, p4 ) {
    var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y,
        x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y,
        d1 = Game.computeDirection(x3, y3, x4, y4, x1, y1),
        d2 = Game.computeDirection(x3, y3, x4, y4, x2, y2),
        d3 = Game.computeDirection(x1, y1, x2, y2, x3, y3),
        d4 = Game.computeDirection(x1, y1, x2, y2, x4, y4);

    return (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) ||
        (d1 == 0 && Game.isOnSegment(x3, y3, x4, y4, x1, y1)) ||
        (d2 == 0 && Game.isOnSegment(x3, y3, x4, y4, x2, y2)) ||
        (d3 == 0 && Game.isOnSegment(x1, y1, x2, y2, x3, y3)) ||
        (d4 == 0 && Game.isOnSegment(x1, y1, x2, y2, x4, y4));
};

})( Game, window, document );
