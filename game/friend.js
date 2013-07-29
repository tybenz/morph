/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

KID_JUMP_VELOCITY = Settings.kidJumpVelocity;

Game.Entity.Friend = Game.Entity.extend({
    type: 'Friend'
});

Game.Entity.Friend.Kid = Game.Entity.Friend.extend({
    type: 'Friend.Kid',
    initialSprite: 'kid',
    jump: function() {
        this.velocity.y = KID_JUMP_VELOCITY;
    }
});

})( Game, Settings, window, document );
