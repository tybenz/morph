/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var tr = Settings.transparentColor,
    gn = Settings.heroColor,
    re = Settings.enemyColor,
    bu = Settings.waterColor,
    cy = Settings.friendColor,
    gy = Settings.rockColor,
    pi = Settings.heartColor,
    wh = Settings.cloudColor,
    bk = Settings.blackColor,
    sg = Settings.landColor,
    yl = Settings.coinColor,
    or = Settings.kidColor,
    pu = Settings.machineColor,
    br = Settings.woodColor;

Game.Sprite = function( path ) {
    var image = new Image();
    image.onload = function() {
        if ( !Game.Editing ) {
            Game.imageLoaded();
        }
    };
    image.src = path;
    return image;
}

Game.Sprites = {};

Game.Bitmaps = {
    'transparent': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'turret': [
        [ tr, tr, re, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, tr, re, re, re, tr, tr, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ]
    ],
    'monster-open': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ re, re, bk, bk, bk, bk, bk, re, re ],
        [ tr, re, bk, bk, bk, bk, bk, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-closing': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ re, re, bk, bk, bk, bk, bk, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-gnashed': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, bk, re, bk, re, bk, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'monster-closed': [
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, re, bk, re, re, re, bk, re, tr ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, re, re, re, tr, re, re, re, tr ]
    ],
    'bird-wings-up': [
        [ tr, re, re, tr, tr, tr, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, re, re, re, tr, re ],
        [ tr, tr, tr, re, re, re, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'bird-wings-down': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, re, tr, tr ]
    ],
    'spider-web': [ [ re ] ],
    'spider-walking-left-1': [
        [ re, tr, tr, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-2': [
        [ tr, re, re, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-3': [
        [ re, tr, tr, re, tr, re, re, tr, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-left-4': [
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-1': [
        [ re, tr, tr, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-2': [
        [ tr, re, tr, tr, re, tr, re, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-3': [
        [ tr, tr, re, re, tr, re, tr, tr, re ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-walking-right-4': [
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ tr, re, tr, re, tr, re, tr, re, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'spider-falling': [
        [ tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ re, tr, tr, re, re, re, tr, tr, re ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ tr, tr, re, re, re, re, re, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ],
        [ re, tr, tr, re, re, re, tr, tr, re ],
        [ tr, tr, tr, re, tr, re, tr, tr, tr ]
    ],
    'heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, pi, pi, tr, pi, pi, tr, tr ],
        [ tr, tr, pi, pi, pi, pi, pi, tr, tr ],
        [ tr, tr, pi, pi, pi, pi, pi, tr, tr ],
        [ tr, tr, tr, pi, pi, pi, tr, tr, tr ],
        [ tr, tr, tr, tr, pi, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'half-heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, pi, pi, tr, wh, wh, tr, tr ],
        [ tr, tr, pi, pi, pi, wh, wh, tr, tr ],
        [ tr, tr, pi, pi, pi, wh, wh, tr, tr ],
        [ tr, tr, tr, pi, pi, wh, tr, tr, tr ],
        [ tr, tr, tr, tr, pi, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'empty-heart': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, wh, wh, tr, wh, wh, tr, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ tr, tr, wh, wh, wh, wh, wh, tr, tr ],
        [ tr, tr, tr, wh, wh, wh, tr, tr, tr ],
        [ tr, tr, tr, tr, wh, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ]
    ],
    'man-right': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, gn, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, tr, tr, tr, tr, gn, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, gn, gn  ]
    ],
    'man-left': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, gn ],
        [ tr, gn, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn  ]
    ],
    'man-holding-right': [
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ gn, gn, gn, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, tr, tr, tr, tr, gn, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, gn, gn ]
    ],
    'man-holding-left': [
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, tr, gn, gn, gn, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, gn ],
        [ tr, gn, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn ]
    ],
    'rock': [
        [ tr, tr, tr, gy, gy, gy, tr, tr, tr ],
        [ tr, tr, gy, gy, gy, gy, gy, tr, tr ],
        [ tr, tr, gy, gy, gy, gy, gy, gy, tr ],
        [ tr, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ],
        [ gy, gy, gy, gy, gy, gy, gy, gy, gy ]
    ],
    'coin': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, yl, yl, yl, tr, tr, tr ],
        [ tr, tr, yl, wh, wh, yl, yl, tr, tr ],
        [ tr, tr, yl, yl, yl, wh, yl, tr, tr ],
        [ tr, tr, yl, yl, yl, wh, yl, tr, tr ],
        [ tr, tr, tr, yl, yl, yl, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr  ]
    ],
    'bullet-red': [
        [ re, re ],
        [ re, re ]
    ],
    'bullet-green': [
        [ gn, gn ],
        [ gn, gn ]
    ],
    'egg': [
        [ tr, re, tr ],
        [ re, re, re ],
        [ re, re, re ],
        [ tr, re, tr ]
    ],
    'land': [
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ]
    ],
    'land-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, sg ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, sg ],
        [ tr, sg, sg, sg, sg, sg, sg, sg, sg ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, tr ],
        [ tr, tr, sg, sg, tr, sg, sg, tr, tr ],
        [ tr, tr, sg, sg, tr, sg, sg, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, sg, tr, tr ]
    ],
    'land-dying-2': [
        [ tr, tr, sg, tr, tr, tr, tr, sg, sg ],
        [ sg, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, sg, tr, tr, sg ],
        [ tr, tr, sg, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, tr, tr, sg, tr, tr, tr, tr ],
        [ tr, sg, tr, sg, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, tr, tr, sg, tr, tr, tr ],
        [ sg, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, sg, tr ]
    ],
    'land-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, tr, tr, tr ],
        [ sg, tr, tr, tr, sg, tr, tr, sg, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, sg, tr, sg, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, sg, tr, tr, tr, sg ],
        [ tr, tr, sg, tr, tr, tr, sg, sg, tr ]
    ],
    'land-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, sg, tr, sg, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, tr, sg ],
        [ sg, sg, tr, tr, tr, tr, sg, tr, tr ]
    ],
    'land-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, sg, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, tr, sg, tr, tr, sg, tr, tr, tr ],
        [ tr, sg, tr, tr, tr, tr, tr, sg, tr ],
        [ tr, sg, tr, tr, sg, tr, sg, tr, tr ]
    ],
    'land-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ sg, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, sg, tr, tr, tr, sg, tr, tr ],
        [ tr, tr, sg, tr, sg, tr, tr, tr, sg ],
        [ tr, sg, tr, tr, tr, sg, tr, sg, tr ]
    ],
    'land-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, sg, tr, tr, sg, tr, tr, sg, tr ],
        [ tr, sg, tr, tr, tr, sg, tr, tr, sg ],
        [ sg, tr, sg, tr, sg, tr, sg, tr, tr ]
    ],
    'land-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, sg, tr, tr, tr, sg, tr ],
        [ sg, sg, sg, tr, sg, tr, sg, sg, sg ]
    ],
    'land-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ sg, sg, sg, sg, sg, sg, sg, sg, sg ]
    ],
    'enemy-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, re ],
        [ tr, re, re, re, re, re, re, re, re ],
        [ re, re, re, re, re, re, re, re, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, re, re, tr, re, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, re, tr, tr ]
    ],
    'enemy-dying-2': [
        [ tr, tr, re, tr, tr, tr, tr, re, re ],
        [ re, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, tr, re, tr, tr, tr, tr ],
        [ tr, re, tr, re, tr, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, re, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr ]
    ],
    'enemy-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, re, tr, tr, re, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, tr, re ],
        [ tr, tr, re, tr, tr, tr, re, re, tr ]
    ],
    'enemy-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, tr, re, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, re, tr, re, tr, tr ],
        [ tr, re, tr, tr, tr, tr, re, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, tr, re ],
        [ re, re, tr, tr, tr, tr, re, tr, tr ]
    ],
    'enemy-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, re, tr ],
        [ tr, tr, re, tr, tr, re, tr, tr, tr ],
        [ tr, re, tr, tr, tr, tr, tr, re, tr ],
        [ tr, re, tr, tr, re, tr, re, tr, tr ]
    ],
    'enemy-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, re, tr, tr, tr, re, tr, tr ],
        [ tr, tr, re, tr, re, tr, tr, tr, re ],
        [ tr, re, tr, tr, tr, re, tr, re, tr ]
    ],
    'enemy-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, re, tr, tr, re, tr, tr, re, tr ],
        [ tr, re, tr, tr, tr, re, tr, tr, re ],
        [ re, tr, re, tr, re, tr, re, tr, tr ]
    ],
    'enemy-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, re, tr, tr, tr, re, tr ],
        [ re, re, re, tr, re, tr, re, re, re ]
    ],
    'enemy-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ re, re, re, re, re, re, re, re, re ]
    ],
    'water': [
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ],
        [ bu, bu, bu, bu, bu, bu, bu, bu, bu ]
    ],
    'wave-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, bu ],
        [ bu, tr, tr, tr, tr, tr, bu, bu, bu ]
    ],
    'wave-2': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, tr, tr, tr, tr, tr, tr, tr, bu ],
        [ bu, bu, tr, tr, tr, tr, tr, bu, bu ]
    ],
    'wave-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, tr, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, tr, tr, tr, tr, tr, bu ]
    ],
    'wave-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, bu, tr, tr, tr, tr, tr, tr ],
        [ tr, bu, bu, tr, tr, tr, tr, tr, tr ],
        [ bu, bu, bu, bu, tr, tr, tr, tr, tr ]
    ],
    'wave-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, bu, tr, tr, tr, tr, tr ],
        [ tr, tr, bu, bu, tr, tr, tr, tr, tr ],
        [ tr, bu, bu, bu, bu, tr, tr, tr, tr ]
    ],
    'wave-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, bu, tr, tr, tr, tr ],
        [ tr, tr, tr, bu, bu, tr, tr, tr, tr ],
        [ tr, tr, bu, bu, bu, bu, tr, tr, tr ]
    ],
    'wave-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, bu, tr, tr, tr ],
        [ tr, tr, tr, tr, bu, bu, tr, tr, tr ],
        [ tr, tr, tr, bu, bu, bu, bu, tr, tr ]
    ],
    'wave-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, bu, tr, tr ],
        [ tr, tr, tr, tr, tr, bu, bu, tr, tr ],
        [ tr, tr, tr, tr, bu, bu, bu, bu, tr ]
    ],
    'wave-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, bu, tr ],
        [ tr, tr, tr, tr, tr, tr, bu, bu, tr ],
        [ tr, tr, tr, tr, tr, bu, bu, bu, bu ]
    ],
    'hero-dying-1': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, gn, gn, gn, gn, gn, gn, gn, gn ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, tr ],
        [ tr, tr, gn, gn, tr, gn, gn, tr, tr ],
        [ tr, tr, gn, gn, tr, gn, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, gn, tr, tr ]
    ],
    'hero-dying-2': [
        [ tr, tr, gn, tr, tr, tr, tr, gn, gn ],
        [ gn, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, tr, tr, tr ],
        [ tr, gn, tr, gn, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, tr, tr, gn, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, gn, tr ]
    ],
    'hero-dying-3': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, gn, tr, tr, gn, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, gn, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, gn, tr, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, gn, gn, tr ]
    ],
    'hero-dying-4': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, gn, tr, gn, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, tr, gn ],
        [ gn, gn, tr, tr, tr, tr, gn, tr, tr ]
    ],
    'hero-dying-5': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, gn, tr, tr, gn, tr, tr, tr ],
        [ tr, gn, tr, tr, tr, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, gn, tr, gn, tr, tr ]
    ],
    'hero-dying-6': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, gn, tr, tr, tr, gn, tr, tr ],
        [ tr, tr, gn, tr, gn, tr, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, gn, tr, gn, tr ]
    ],
    'hero-dying-7': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, gn, tr, tr, gn, tr, tr, gn, tr ],
        [ tr, gn, tr, tr, tr, gn, tr, tr, gn ],
        [ gn, tr, gn, tr, gn, tr, gn, tr, tr ]
    ],
    'hero-dying-8': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, gn, tr, tr, tr, gn, tr ],
        [ gn, gn, gn, tr, gn, tr, gn, gn, gn ]
    ],
    'hero-dying-9': [
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, gn, gn ]
    ],
    'restart': [
        [ tr, tr, tr, gn, gn, gn, gn, tr, tr ],
        [ gn, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ gn, gn, gn, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, gn, tr, tr, tr, tr, tr, tr, gn ],
        [ tr, tr, gn, tr, tr, tr, tr, gn, tr ],
        [ tr, tr, tr, gn, gn, gn, gn, tr, tr ]
    ],
    'exit': [
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, gn, gn, gn, tr, tr, gn ],
        [ gn, tr, tr, tr, tr, tr, tr, gn, tr ],
        [ gn, tr, tr, tr, tr, tr, tr, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ gn, tr, tr, tr, tr, tr, gn, tr, tr ],
        [ gn, gn, gn, gn, gn, gn, gn, tr, tr ]
    ],
    'switch': [
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ],
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ],
        [ pi, pi, pi, pi, pi, pi, pi, pi, pi ]
    ],
    'trapdoor': [
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ],
        [ sg, tr, sg, sg, tr, sg, sg, tr, sg ]
    ]
};

})( Game, Settings, window, document );
