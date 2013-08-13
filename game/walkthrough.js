/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize,
    FONT_SIZE = Settings.levelNameFontSize,
    GREEN = Settings.heroColor,
    BLACK = Settings.blackColor,
    WHITE = Settings.cloudColor,
    ALIGN = Settings.walkthroughAlign,
    MAX_WIDTH = Settings.walkthroughMaxWidth,
    LINE_HEIGHT = Settings.walkthroughLineHeight,
    MENU_LINE_WIDTH = Settings.menuLineWidth;

// A Walkthrough message is one that's shown as
// a monologue or a hint/cue on how to play the game
// a walkthrough contains text for display and a callback
// to be executed on every iteration of the games loop
// the callback should return false when it's time to hide the walkthrough
Game.Walkthrough = Class.extend({
    init: function( text, callback ) {
        this.text = text;
        this.callback = callback;
    },
    render: function( clear ) {
        var dimensions,
            top = 20,
            left;

        Game.ctx.textAlign = ALIGN;
        Game.ctx.font = 'normal ' + FONT_SIZE + 'px uni05';

        dimensions = Game.wrapText( Game.ctx, this.text, 0, 0, MAX_WIDTH, LINE_HEIGHT, true );

        left = Game.viewportWidth - dimensions.width - 20;
        height = dimensions.height + LINE_HEIGHT + MENU_LINE_WIDTH * 2;
        width = dimensions.width;

        Game.ctx.fillStyle = BLACK;
        Game.ctx.fillRect( left, top, width, height );
        Game.ctx.fillStyle = GREEN;
        Game.drawRectangle( left, top, width, height, MENU_LINE_WIDTH, GREEN );

        Game.ctx.fillStyle = WHITE;
        Game.ctx.textAlign = ALIGN;
        Game.ctx.font = 'normal ' + FONT_SIZE + 'px uni05';

        top += FONT_SIZE * 1.1;
        left += TILESIZE * 0.3;
        Game.wrapText( Game.ctx, this.text, left, top, MAX_WIDTH, LINE_HEIGHT );
    }
});

Game.Walkthroughs = {
    'intro': [
        new Game.Walkthrough( 'Huh? Where am I? I can\'t remember anything...', function() {
            Game.walkthroughTimestamp = Game.walkthroughTimestamp || Date.now();

            if ( Date.now() - Game.walkthroughTimestamp > 4 * SECONDS ) {
                Game.walkthroughTimestamp = null;
                Game.nextWalkthrough();
                return false;
            }
            return true;
        }),
        new Game.Walkthrough( 'My head hurts... Oh man! I\'ve gotta get out of here.', function() {
            Game.walkthroughTimestamp = Game.walkthroughTimestamp || Date.now();

            if ( Date.now() - Game.walkthroughTimestamp > 4 * SECONDS ) {
                Game.walkthroughTimestamp = null;
                Game.activeWalkthrough = null;
                Game.nextWalkthrough();
                return false;
            }
            return true;
        }),
        new Game.Walkthrough( 'Use the arrow keys to move around...', function() {
            Game.walkthroughTimestamp = Game.walkthroughTimestamp || Date.now();

            if ( Date.now() - Game.walkthroughTimestamp > 4 * SECONDS ) {
                Game.walkthroughTimestamp = null;
                Game.activeWalkthrough = null;
                Game.nextWalkthrough();
                return false;
            }
            return true;
        }),
        new Game.Walkthrough( 'Use Z to jump. Try jumping on those red guys.', function() {
            Game.walkthroughTimestamp = Game.walkthroughTimestamp || Date.now();

            if ( Date.now() - Game.walkthroughTimestamp > 4 * SECONDS ) {
                Game.walkthroughTimestamp = null;
                Game.activeWalkthrough = null;
                Game.nextWalkthrough();
                return false;
            }
            return true;
        })
    ],
    'interacting': [
        new Game.Walkthrough( 'The X button is the INTERACT button. Use it to read signs, talk to friends, and a lot more.', function() {
            Game.walkthroughTimestamp = Game.walkthroughTimestamp || Date.now();

            if ( Date.now() - Game.walkthroughTimestamp > 4 * SECONDS ) {
                Game.walkthroughTimestamp = null;
                Game.activeWalkthrough = null;
                Game.nextWalkthrough();
                return false;
            }
            return true;
        })
    ]
};

})( Game, Settings, window, document );
