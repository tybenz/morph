/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Sprite = function( path, title ) {
    var title = title || '',
        image = new Image();
    image.onload = function() {
        Game.imageLoaded( title );
    };
    image.src = path;
    image.title = title;
    return image;
}
