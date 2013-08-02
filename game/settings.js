/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( window, document, undefined ) {

window.SECONDS = 1000;
var SCALE = 4,
    TILESIZE = 9 * SCALE;

window.Settings = {
    tileSize: TILESIZE,
    landBackground: '#000',
    seaBackground: '#003',
    // Viewport stuff
    viewportShiftBoundary: 2,
    defaultViewportWidth: 25,
    defaultViewportHeight: 14,
    // Menu
    menuWidth: 20,
    menuHeight: 10,
    menuLineWidth: 3,
    menuPadding: 1.2 * TILESIZE,
    menuHeaderHeight: 1.666667 * TILESIZE,
    menuHeaderFontSize: Math.round( 1.111111 * TILESIZE ),
    menuTitleTop: 1.333333 * TILESIZE,
    menuSelectionColor: '#f9f9f9',
    menuLineColor: '#0ed839',
    menuTextColor: '#0ed839',
    menuPaddingLeft: 2.2 * TILESIZE,
    menuRowSize: 2,
    menuSelectionPadding: 0.388889 * TILESIZE,
    menuLineWidth: 0.111111 * TILESIZE,
    menuItemWidth: 2 * TILESIZE,
    menuItemHeight: 2 * TILESIZE,
    gameOverMenuPaddingLeft: 7.2 * TILESIZE,
    gameOverMenuPaddingTop: 4.5 * TILESIZE,
    transformMenuRowSize: 4,
    signFontSize: Math.round( 0.740741 * TILESIZE ),
    dialogPromptSize: Math.round( 0.666667 * TILESIZE ),
    dialogResponseSize: Math.round( 0.481481 * TILESIZE ),
    questlogFontSize: Math.round( 0.555556 * TILESIZE ),
    levelNameFontSize: Math.round( 0.666667 * TILESIZE ),
    // Colors
    levelNameColor: '#f9f9f9',
    transparentColor: 'transparent',
    blackColor: '#000000',
    heroColor: '#0ed839',
    enemyColor: '#e92f2f',
    waterColor: '#3b48e3',
    friendColor: '#23edda',
    rockColor: '#777777',
    heartColor: '#f996e2',
    tongueColor: '#ff55ff',
    cloudColor: '#f9f9f9',
    landColor: '#102015',
    coinColor: '#dddd13',
    kidColor: '#e09448',
    machineColor: '#7a237a',
    woodColor: '#69542d',
    // Keys
    leftKey: 37, // left arrow
    rightKey: 39, // right arrow
    downKey: 40, // down arrow
    upKey: 38, // up arrow
    actionKey: 88, // X
    jumpKey: 90, // Z
    pauseKey: 80, // P
    questlogKey: 81, // Q
    inventoryKey: 73, // I
    enterKey: 13,
    // Debug flags
    debugInvalidRect: false,
    debugInvalidRectColor: 'red',
    // Terrian stuff
    waveSpeed: 0.4 * SECONDS,
    // Enemy stuff
    turretInterval: 2 * SECONDS,
    quickTurretInterval: 0.8 * SECONDS,
    smartTurretInterval: 0.4 * SECONDS,
    turretSpeed: -0.022222 * TILESIZE,
    quickTurretSpeed: -0.044444 * TILESIZE,
    smartTurretSpeed: -0.033333 * TILESIZE,
    submarineSpeed: -0.022222 * TILESIZE,
    balloonSpeed: -0.022222 * TILESIZE,
    battleshipSpeed: -0.022222 * TILESIZE,
    birdVelocity: -0.005 * TILESIZE,
    spiderVelocity: 0.003333 * TILESIZE,
    spiderClimbingVelocity: -0.004444 * TILESIZE,
    balloonHorizontalVelocity: -0.001111 * TILESIZE,
    balloonVerticalVelocity: 0.000389 * TILESIZE,
    balloonVerticalBoundary: 0.388889 * TILESIZE,
    monsterWalkingInterval: 0.5 * SECONDS,
    // Hero stuff
    transformAnimationDuration: SECONDS,
    manJumpVelocity: -0.022222 * TILESIZE,
    blockJumpVelocity: -0.027778 * TILESIZE,
    gravity: 0.000055555 * TILESIZE,
    rockThrowVelocity: 0.005556 * TILESIZE,
    boatBulletSpeed: -0.016667 * TILESIZE,
    boatBulletReloadRate: 0.5 * SECONDS,
    planeBulletSpeed: 0.016667 * TILESIZE,
    planeBulletReloadRate: 0.3 * SECONDS,
    planeHorizontalVelocity: 0.005556 * TILESIZE,
    planeLandingVelocity: 0.004444 * TILESIZE,
    planeTakeoffVelocity: -0.016667 * TILESIZE,
    takingDamageDuration: SECONDS,
    frogGravity: 0.0000444 * TILESIZE,
    frogJumpVelocity: -0.033333 * TILESIZE,
    frogTongueVelocity: 0.006667 * TILESIZE,
    jellyfishGravity: 0.000005555 * TILESIZE,
    clockStopDuration: 5 * SECONDS,
    clockStopCooldown: 15 * SECONDS,
    clockJumpVelocity: -0.016667 * TILESIZE,
    flameJumpVelocity: -0.016667 * TILESIZE,
    kidJumpVelocity: -0.016667 * TILESIZE,
    machineWidth: TILESIZE * 2,
    machineHeight: TILESIZE * 2,
    // Inventory stuff
    initialMaxHealth: 10,
    initialMaxCurrency: 25
};

})( window, document );
