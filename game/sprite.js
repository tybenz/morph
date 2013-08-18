/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, window, document, undefined ) {

var A = 'transparent',
    B = '#0ed839',
    C = '#e92f2f',
    D = '#3b48e3',
    E = '#23edda',
    F = '#777777',
    G = '#f996e2',
    H = '#f9f9f9',
    I = '#000000',
    J = '#102015',
    K = '#dddd13',
    L = '#e09448',
    M = '#7a237a',
    N = '#69542d';

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
    'transparent': [ [ A ] ],
    'turret': [
        [ A, A, C, C, C, C, A, A, A ],
        [ A, A, A, C, C, C, A, A, A ],
        [ A, A, A, C, C, C, A, A, A ],
        [ A, A, C, C, C, C, C, A, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, C, C, C, C, C, C, C, A ]
    ],
    'monster-open': [
        [ A, C, A, A, A, A, A, C, A ],
        [ A, C, C, A, A, A, C, C, A ],
        [ A, C, I, C, C, C, I, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ C, C, I, C, I, C, I, C, C ],
        [ C, C, I, I, I, I, I, C, C ],
        [ A, C, I, I, I, I, I, C, A ],
        [ A, A, C, C, C, C, C, A, A ],
        [ A, C, C, C, A, C, C, C, A ]
    ],
    'monster-closing': [
        [ A, C, A, A, A, A, A, C, A ],
        [ A, C, C, A, A, A, C, C, A ],
        [ A, C, I, C, C, C, I, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ C, C, I, C, I, C, I, C, C ],
        [ C, C, I, I, I, I, I, C, C ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, C, C, C, A, C, C, C, A ]
    ],
    'monster-Bashed': [
        [ A, C, A, A, A, A, A, C, A ],
        [ A, C, C, A, A, A, C, C, A ],
        [ A, C, I, C, C, C, I, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ C, C, C, C, C, C, C, C, C ],
        [ C, C, I, C, I, C, I, C, C ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, C, C, C, A, C, C, C, A ]
    ],
    'monster-closed': [
        [ A, C, A, A, A, A, A, C, A ],
        [ A, C, C, A, A, A, C, C, A ],
        [ A, C, I, C, C, C, I, C, A ],
        [ A, C, C, C, C, C, C, C, A ],
        [ C, C, C, C, C, C, C, C, C ],
        [ C, C, C, C, C, C, C, C, C ],
        [ A, C, C, C, C, C, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, C, C, C, A, C, C, C, A ]
    ],
    'bird-wings-up': [
        [ A, C, C, A, A, A, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, A, C, C, C, C, A, C ],
        [ A, A, A, C, C, C, A, A, C ],
        [ A, C, C, C, C, C, C, C, C ],
        [ C, C, C, C, C, C, C, C, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ]
    ],
    'bird-wings-down': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, C ],
        [ A, A, A, A, A, A, A, A, C ],
        [ A, C, C, C, C, C, C, C, C ],
        [ C, C, C, C, C, C, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, A, C, A, A, C, A, A ]
    ],
    'heart': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, G, G, A, G, G, A, A ],
        [ A, A, G, G, G, G, G, A, A ],
        [ A, A, G, G, G, G, G, A, A ],
        [ A, A, A, G, G, G, A, A, A ],
        [ A, A, A, A, G, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ]
    ],
    'half-heart': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, G, G, A, H, H, A, A ],
        [ A, A, G, G, G, H, H, A, A ],
        [ A, A, G, G, G, H, H, A, A ],
        [ A, A, A, G, G, H, A, A, A ],
        [ A, A, A, A, G, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ]
    ],
    'empty-heart': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, H, H, A, H, H, A, A ],
        [ A, A, H, H, H, H, H, A, A ],
        [ A, A, H, H, H, H, H, A, A ],
        [ A, A, A, H, H, H, A, A, A ],
        [ A, A, A, A, H, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ]
    ],
    'man-right': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, B, A, A, A, A ],
        [ A, A, A, A, A, A, A, B, A ],
        [ A, B, B, B, B, B, B, B, A ],
        [ A, B, A, B, B, B, A, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ B, B, B, A, A, A, B, A, A ],
        [ B, B, A, A, A, A, B, B, A ],
        [ B, A, A, A, A, A, B, B, B  ]
    ],
    'man-left': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, B, A, A, A, A ],
        [ A, B, A, A, A, A, A, A, A ],
        [ A, B, B, B, B, B, B, B, A ],
        [ A, A, A, B, B, B, A, B, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, B, A, A, A, B, B, B ],
        [ A, B, B, A, A, A, A, B, B ],
        [ B, B, B, A, A, A, A, A, B  ]
    ],
    'man-holding-right': [
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, B, A, B, A, B, A, A ],
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ B, B, B, A, A, A, B, A, A ],
        [ B, B, A, A, A, A, B, B, A ],
        [ B, A, A, A, A, A, B, B, B ]
    ],
    'man-holding-left': [
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, B, A, B, A, B, A, A ],
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, A, B, B, B, A, A, A ],
        [ A, A, B, A, A, A, B, B, B ],
        [ A, B, B, A, A, A, A, B, B ],
        [ B, B, B, A, A, A, A, A, B ]
    ],
    'rock': [
        [ A, A, A, F, F, F, A, A, A ],
        [ A, A, F, F, F, F, F, A, A ],
        [ A, A, F, F, F, F, F, F, A ],
        [ A, F, F, F, F, F, F, F, F ],
        [ F, F, F, F, F, F, F, F, F ],
        [ F, F, F, F, F, F, F, F, F ],
        [ F, F, F, F, F, F, F, F, F ],
        [ F, F, F, F, F, F, F, F, F ],
        [ F, F, F, F, F, F, F, F, F ]
    ],
    'coin': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, K, K, K, A, A, A ],
        [ A, A, K, H, H, K, K, A, A ],
        [ A, A, K, K, K, H, K, A, A ],
        [ A, A, K, K, K, H, K, A, A ],
        [ A, A, A, K, K, K, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A  ]
    ],
    'bullet-red': [
        [ C, C ],
        [ C, C ]
    ],
    'bullet-green': [
        [ B, B ],
        [ B, B ]
    ],
    'egg': [
        [ A, C, A ],
        [ C, C, C ],
        [ C, C, C ],
        [ A, C, A ]
    ],
    'land': [
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, J ]
    ],
    'land-dying-1': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, J ],
        [ A, A, A, A, A, A, A, A, J ],
        [ A, J, J, J, J, J, J, J, J ],
        [ J, J, J, J, J, J, J, J, A ],
        [ A, A, J, J, A, J, J, A, A ],
        [ A, A, J, J, A, J, J, A, A ],
        [ A, A, A, J, A, A, J, A, A ]
    ],
    'land-dying-2': [
        [ A, A, J, A, A, A, A, J, J ],
        [ J, A, A, J, A, A, A, A, A ],
        [ A, A, A, A, A, J, A, A, J ],
        [ A, A, J, A, A, A, J, A, A ],
        [ A, A, A, A, J, A, A, A, A ],
        [ A, J, A, J, A, A, A, J, A ],
        [ A, A, A, A, A, J, A, A, A ],
        [ J, A, A, A, A, A, A, A, A ],
        [ A, A, A, J, A, A, A, J, A ]
    ],
    'land-dying-3': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, J, A, A, A, A, A, A ],
        [ J, A, A, A, J, A, A, J, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, J, A, J, A, J, A, A ],
        [ A, J, A, A, A, A, A, J, A ],
        [ A, A, A, J, A, A, A, A, A ],
        [ A, J, A, A, J, A, A, A, J ],
        [ A, A, J, A, A, A, J, J, A ]
    ],
    'land-dying-4': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, J, A, A, A, A, J, A ],
        [ A, A, A, J, A, A, A, A, A ],
        [ A, J, A, A, A, A, A, A, A ],
        [ A, A, A, A, J, A, J, A, A ],
        [ A, J, A, A, A, A, J, A, A ],
        [ A, A, A, J, A, A, A, A, J ],
        [ J, J, A, A, A, A, J, A, A ]
    ],
    'land-dying-5': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, J, A, A, J, A, A, A ],
        [ A, A, A, A, A, A, A, J, A ],
        [ A, A, J, A, A, J, A, A, A ],
        [ A, J, A, A, A, A, A, J, A ],
        [ A, J, A, A, J, A, J, A, A ]
    ],
    'land-dying-6': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ J, A, A, A, A, A, A, A, A ],
        [ A, A, J, A, A, A, J, A, A ],
        [ A, A, J, A, J, A, A, A, J ],
        [ A, J, A, A, A, J, A, J, A ]
    ],
    'land-dying-7': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, J, A, A, J, A, A, J, A ],
        [ A, J, A, A, A, J, A, A, J ],
        [ J, A, J, A, J, A, J, A, A ]
    ],
    'land-dying-8': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, J, A, A, A, J, A ],
        [ J, J, J, A, J, A, J, J, J ]
    ],
    'land-dying-9': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ J, J, J, J, J, J, J, J, J ]
    ],
    'enemy-dying-1': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, C ],
        [ A, A, A, A, A, A, A, A, C ],
        [ A, C, C, C, C, C, C, C, C ],
        [ C, C, C, C, C, C, C, C, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, C, C, A, C, C, A, A ],
        [ A, A, A, C, A, A, C, A, A ]
    ],
    'enemy-dying-2': [
        [ A, A, C, A, A, A, A, C, C ],
        [ C, A, A, C, A, A, A, A, A ],
        [ A, A, A, A, A, C, A, A, C ],
        [ A, A, C, A, A, A, C, A, A ],
        [ A, A, A, A, C, A, A, A, A ],
        [ A, C, A, C, A, A, A, C, A ],
        [ A, A, A, A, A, C, A, A, A ],
        [ C, A, A, A, A, A, A, A, A ],
        [ A, A, A, C, A, A, A, C, A ]
    ],
    'enemy-dying-3': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, C, A, A, A, A, A, A ],
        [ C, A, A, A, C, A, A, C, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, C, A, C, A, C, A, A ],
        [ A, C, A, A, A, A, A, C, A ],
        [ A, A, A, C, A, A, A, A, A ],
        [ A, C, A, A, C, A, A, A, C ],
        [ A, A, C, A, A, A, C, C, A ]
    ],
    'enemy-dying-4': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, C, A, A, A, A, C, A ],
        [ A, A, A, C, A, A, A, A, A ],
        [ A, C, A, A, A, A, A, A, A ],
        [ A, A, A, A, C, A, C, A, A ],
        [ A, C, A, A, A, A, C, A, A ],
        [ A, A, A, C, A, A, A, A, C ],
        [ C, C, A, A, A, A, C, A, A ]
    ],
    'enemy-dying-5': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, C, A, A, C, A, A, A ],
        [ A, A, A, A, A, A, A, C, A ],
        [ A, A, C, A, A, C, A, A, A ],
        [ A, C, A, A, A, A, A, C, A ],
        [ A, C, A, A, C, A, C, A, A ]
    ],
    'enemy-dying-6': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ C, A, A, A, A, A, A, A, A ],
        [ A, A, C, A, A, A, C, A, A ],
        [ A, A, C, A, C, A, A, A, C ],
        [ A, C, A, A, A, C, A, C, A ]
    ],
    'enemy-dying-7': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, C, A, A, C, A, A, C, A ],
        [ A, C, A, A, A, C, A, A, C ],
        [ C, A, C, A, C, A, C, A, A ]
    ],
    'enemy-dying-8': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, C, A, A, A, C, A ],
        [ C, C, C, A, C, A, C, C, C ]
    ],
    'enemy-dying-9': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ C, C, C, C, C, C, C, C, C ]
    ],
    'water': [
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ],
        [ D, D, D, D, D, D, D, D, D ]
    ],
    'wave-1': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, D ],
        [ A, A, A, A, A, A, A, D, D ],
        [ D, A, A, A, A, A, D, D, D ]
    ],
    'wave-2': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ D, A, A, A, A, A, A, A, A ],
        [ D, A, A, A, A, A, A, A, D ],
        [ D, D, A, A, A, A, A, D, D ]
    ],
    'wave-3': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, D, A, A, A, A, A, A, A ],
        [ D, D, A, A, A, A, A, A, A ],
        [ D, D, D, A, A, A, A, A, D ]
    ],
    'wave-4': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, D, A, A, A, A, A, A ],
        [ A, D, D, A, A, A, A, A, A ],
        [ D, D, D, D, A, A, A, A, A ]
    ],
    'wave-5': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, D, A, A, A, A, A ],
        [ A, A, D, D, A, A, A, A, A ],
        [ A, D, D, D, D, A, A, A, A ]
    ],
    'wave-6': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, D, A, A, A, A ],
        [ A, A, A, D, D, A, A, A, A ],
        [ A, A, D, D, D, D, A, A, A ]
    ],
    'wave-7': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, D, A, A, A ],
        [ A, A, A, A, D, D, A, A, A ],
        [ A, A, A, D, D, D, D, A, A ]
    ],
    'wave-8': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, D, A, A ],
        [ A, A, A, A, A, D, D, A, A ],
        [ A, A, A, A, D, D, D, D, A ]
    ],
    'wave-9': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, D, A ],
        [ A, A, A, A, A, A, D, D, A ],
        [ A, A, A, A, A, D, D, D, D ]
    ],
    'hero-dying-1': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, B ],
        [ A, A, A, A, A, A, A, A, B ],
        [ A, B, B, B, B, B, B, B, B ],
        [ B, B, B, B, B, B, B, B, A ],
        [ A, A, B, B, A, B, B, A, A ],
        [ A, A, B, B, A, B, B, A, A ],
        [ A, A, A, B, A, A, B, A, A ]
    ],
    'hero-dying-2': [
        [ A, A, B, A, A, A, A, B, B ],
        [ B, A, A, B, A, A, A, A, A ],
        [ A, A, A, A, A, B, A, A, B ],
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, A, A, B, A, A, A, A ],
        [ A, B, A, B, A, A, A, B, A ],
        [ A, A, A, A, A, B, A, A, A ],
        [ B, A, A, A, A, A, A, A, A ],
        [ A, A, A, B, A, A, A, B, A ]
    ],
    'hero-dying-3': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, B, A, A, A, A, A, A ],
        [ B, A, A, A, B, A, A, B, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, B, A, B, A, B, A, A ],
        [ A, B, A, A, A, A, A, B, A ],
        [ A, A, A, B, A, A, A, A, A ],
        [ A, B, A, A, B, A, A, A, B ],
        [ A, A, B, A, A, A, B, B, A ]
    ],
    'hero-dying-4': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, B, A, A, A, A, B, A ],
        [ A, A, A, B, A, A, A, A, A ],
        [ A, B, A, A, A, A, A, A, A ],
        [ A, A, A, A, B, A, B, A, A ],
        [ A, B, A, A, A, A, B, A, A ],
        [ A, A, A, B, A, A, A, A, B ],
        [ B, B, A, A, A, A, B, A, A ]
    ],
    'hero-dying-5': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, B, A, A, B, A, A, A ],
        [ A, A, A, A, A, A, A, B, A ],
        [ A, A, B, A, A, B, A, A, A ],
        [ A, B, A, A, A, A, A, B, A ],
        [ A, B, A, A, B, A, B, A, A ]
    ],
    'hero-dying-6': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ B, A, A, A, A, A, A, A, A ],
        [ A, A, B, A, A, A, B, A, A ],
        [ A, A, B, A, B, A, A, A, B ],
        [ A, B, A, A, A, B, A, B, A ]
    ],
    'hero-dying-7': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, B, A, A, B, A, A, B, A ],
        [ A, B, A, A, A, B, A, A, B ],
        [ B, A, B, A, B, A, B, A, A ]
    ],
    'hero-dying-8': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, B, A, A, A, B, A ],
        [ B, B, B, A, B, A, B, B, B ]
    ],
    'hero-dying-9': [
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ A, A, A, A, A, A, A, A, A ],
        [ B, B, B, B, B, B, B, B, B ]
    ],
    'restart': [
        [ A, A, A, B, B, B, B, A, A ],
        [ B, A, B, A, A, A, A, B, A ],
        [ B, A, A, A, A, A, A, A, B ],
        [ B, B, B, A, A, A, A, A, B ],
        [ A, A, A, A, A, A, A, A, B ],
        [ A, A, A, A, A, A, A, A, B ],
        [ A, B, A, A, A, A, A, A, B ],
        [ A, A, B, A, A, A, A, B, A ],
        [ A, A, A, B, B, B, B, A, A ]
    ],
    'exit': [
        [ B, B, B, B, B, B, B, A, A ],
        [ B, A, A, A, A, A, A, A, A ],
        [ B, A, A, A, A, A, A, B, A ],
        [ B, A, A, B, B, B, A, A, B ],
        [ B, A, A, A, A, A, A, B, A ],
        [ B, A, A, A, A, A, A, A, A ],
        [ B, A, A, A, A, A, B, A, A ],
        [ B, A, A, A, A, A, B, A, A ],
        [ B, B, B, B, B, B, B, A, A ]
    ],
    'switch': [
        [ G, G, G, G, G, G, G, G, G ],
        [ G, G, G, G, G, G, G, G, G ],
        [ G, G, G, G, G, G, G, G, G ]
    ],
    'trapdoor': [
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ],
        [ J, A, J, J, A, J, J, A, J ]
    ]
};

})( Game, window, document );
