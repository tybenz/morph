Game.Sprite = function( path, title ) {
    var title = title || '',
        image = new Image();
    image.onload = function() {
        Game.imageLoaded( image );
    }
    image.src = path;
    image.title = title;
    return image;
}
