/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    ignoreGravity: true,
    drawLayer: 1,
    portal: null // portal to another level?
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    initialSprite: 'land'
});
