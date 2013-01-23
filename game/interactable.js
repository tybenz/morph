Game.Entity.Interactable = Game.Entity.extend({
    type: 'Interactable',
    collectable: null, // indicates whether it automatically goes into inventory
    collision: function() {
        //executed with hero collides with it
    }
});

Game.Entity.Interactable.Rock = Game.Entity.Interactable.extend({
    type: 'Interactable.Rock',
    sprites: [ Game.Sprite( 'sprites/terrain/rock.png' ) ]
});

Game.Entity.Interactable.Coin = Game.Entity.Interactable.extend({
    type: 'Interactable.Coin',
    sprites: [ Game.Sprite( 'sprites/object/coin.png' ) ]
});
