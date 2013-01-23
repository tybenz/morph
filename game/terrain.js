Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    portal: null // portal to another level?
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    sprites: [ Game.Sprite( 'sprites/terrain/land.png' ) ]
});
