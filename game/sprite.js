/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

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
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'turret': [
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'turret-quick-left': [
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'turret-quick-right': [
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'turret-smart-left': [
        [ "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'turret-smart-right': [
        [ "transparent", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'monster-open': [
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'monster-closing': [
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'monster-gnashed': [
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'monster-closed': [
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent" ]
    ],
    'bird-wings-up': [
        [ "transparent", "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'bird-wings-down': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
    ],
    'spider-walking-left-1': [
        [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-left-2': [
        [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "transparent", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-left-3': [
        [ "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-left-4': [
        [ "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "rgba(0,0,0,0)", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "rgba(0,0,0,0)", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-right-1': [
        [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-right-2': [
        [ "rgba(0,0,0,0)", "#ff0000", "transparent", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-right-3': [
        [ "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-walking-right-4': [
        [ "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "rgba(0,0,0,0)" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "rgba(0,0,0,0)" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'spider-falling': [
        [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent" ],
        [ "#ff0000", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "transparent", "transparent", "#ff0000", "#ff0000", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent" ]
    ],
    'heart': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "transparent", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#ff55ff", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'half-heart': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "transparent", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff55ff", "#ff55ff", "#ff55ff", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff55ff", "#ff55ff", "#ffffff", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#ff55ff", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'empty-heart': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffffff", "#ffffff", "transparent", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ffffff", "#ffffff", "#ffffff", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#ffffff", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'man-right': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00"  ]
    ],
    'man-left': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ],
        [ "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00"  ]
    ],
    'man-holding-right': [
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ]
    ],
    'man-holding-left': [
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00" ],
        [ "rgba(0,0,0,0)", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "rgba(0,0,0,0)", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "#00ff00" ]
    ],
    'block': [
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ],
        [ "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00" ]
    ],
    'rock': [
        [ "transparent", "transparent", "transparent", "#777777", "#777777", "#777777", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent", "transparent" ],
        [ "transparent", "transparent", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "transparent" ],
        [ "rgba(0,0,0,0)", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ]
    ],
    'coin': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffff00", "#ffffff", "#ffffff", "#ffff00", "#ffff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "#ffffff", "#ffff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ffff00", "#ffff00", "#ffff00", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent"  ]
    ],
    'bullet': [
        [ "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000" ]
    ],
    'egg': [
        [ "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent" ]
    ],
    'machine-green': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#00ff00", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f" ]
    ],
    'machine-red': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#ff0000", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#000000", "#000000", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f", "#7f007f" ]
    ],
    'land': [
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ],
        [ '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000' ]
    ],
    'enemy-dying-1': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "#ff0000", "transparent", "#ff0000", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
    ],
    'enemy-dying-2': [
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "#ff0000" ],
        [ "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ]
    ],
    'enemy-dying-3': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "#ff0000", "transparent" ]
    ],
    'enemy-dying-4': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "#ff0000", "#ff0000", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ]
    ],
    'enemy-dying-5': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
    ],
    'enemy-dying-6': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "#ff0000", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent" ],
        [ "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "#ff0000", "transparent" ]
    ],
    'enemy-dying-7': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "#ff0000" ],
        [ "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "transparent", "transparent" ]
    ],
    'enemy-dying-8': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#ff0000", "transparent", "transparent", "transparent", "#ff0000", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "transparent", "#ff0000", "transparent", "#ff0000", "#ff0000", "#ff0000" ]
    ],
    'enemy-dying-9': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ]
    ],
    'hero-scramble-1': [
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent" ]
    ],
    'hero-scramble-2': [
        [ "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "#00ff00" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
        [ "transparent", "#00ff00", "#00ff00", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent" ]
    ],
    'hero-scramble-3': [
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "#00ff00", "#00ff00", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
        [ "#00ff00", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ]
    ],
    'hero-scramble-4': [
        [ "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00" ],
        [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent" ],
        [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ]
    ],
    'hero-scramble-5': [
        [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "#00ff00", "transparent" ],
        [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
        [ "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent", "transparent" ],
        [ "transparent", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00" ]
    ]
};
