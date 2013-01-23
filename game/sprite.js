Game.Sprite = function( path ) {
    var image = new Image();
    image.src = path;
    image.onload = function() {
        Game.imageLoaded( image );
    }
    return image;
}
