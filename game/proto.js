document.onreadystatechange = function() {
    if ( document.readyState == 'complete' ) {

        //Create canvas
        var canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext( '2d' );
        canvas.width = 900;
        canvas.height = 450;
        canvas.id = 'canvas';
        document.getElementById( 'game' ).appendChild( canvas );
        var morph = {
            speed: 256,
            x: 18,
            y: 414,
            score: 0,
            health: 10,
            holding: false,
            image: new Image(),
            imageReady: false,
            holdingImage: new Image(),
            pickup: function() {
                if ( rock.x - morph.x == 18 ) {
                    rock.x -= 18;
                    rock.y -= 18;
                    morph.holding = true;
                }
            },
            throw: function() {
                if ( morph.holding ) {
                    if ( monster.x - morph.x == 18 ) {
                        monster.dead = true;
                    }
                    rock.x += 18;
                    rock.y += 18;
                    morph.holding = false;
                }
            }
        };
        morph.image.src = 'sprites/morph/man-right.png';
        morph.image.onload = function() {
            morph.imageReady = true;
        };
        morph.holdingImage.src = 'sprites/morph/man-holding.png';
        morph.holdingImage.onload = function() {
            morph.holdingImageReady = true;
        };

        var monster = {
            x: 360,
            y: 414,
            dead: false,
            image: new Image(),
            imageReady: false
        }; // gets x & y later
        monster.image.src = 'sprites/enemy/monster-open.png';
        monster.image.onload = function() {
            monster.imageReady = true;
        };

        var rock = {
            x: 180,
            y: 414,
            image: new Image(),
            imageReady: false
        };
        rock.image.src = 'sprites/terrain/rock.png';
        rock.image.onload = function() {
            rock.imageReady = true;
        };

        var coin = {
            x: 720,
            y: 414,
            image: new Image(),
            imageReady: false
        };
        coin.image.src = 'sprites/object/coin.png';
        coin.image.onload = function() {
            coin.imageReady = true;
        };

        var land = {
            image: new Image(),
            imageReady: false
        };
        land.image.src = 'sprites/terrain/land.png';
        land.image.onload = function() {
            land.imageReady = true;
        };

        //Handle keyboard controls
        var keysDown = {};

        addEventListener( 'keydown', function( evt ) {
            evt.preventDefault();
            if ( keysDown[ evt.keyCode ] != 'locked' ) {
                keysDown[ evt.keyCode ] = true;
            }
        }, false );

        addEventListener( 'keyup', function( evt ) {
            delete keysDown[ evt.keyCode ];
        }, false );

        var update = function( modifier ) {
            if ( 38 in keysDown && keysDown[ 38 ] != 'locked' ) { //player holding up
                morph.y -= 18;
                if ( morph.holding ) {
                    rock.y -= 18;
                }
                keysDown[ 38 ] = 'locked';
            }
            if ( 40 in keysDown && keysDown[ 40 ] != 'locked' ) { //player holding down
                morph.y += 18;
                if ( morph.holding ) {
                    rock.y += 18;
                }
                keysDown[ 40 ] = 'locked';
            }
            if ( 37 in keysDown && keysDown[ 37 ] != 'locked' ) { //player holding left
                morph.x -= 18;
                if ( morph.holding ) {
                    rock.x -= 18;
                }
                keysDown[ 37 ] = 'locked';
            }
            if ( 39 in keysDown && keysDown[ 39 ] != 'locked' ) { //player holding right
                morph.x += 18;
                if ( morph.holding ) {
                    rock.x += 18;
                }
                keysDown[ 39 ] = 'locked';
            }
            if ( 32 in keysDown && keysDown[ 32 ] != 'locked' ) { //player holding spacebar
                if ( morph.holding ) {
                    morph.throw();
                } else {
                    morph.pickup();
                }
                keysDown[ 32 ] = 'locked';
            }
            if ( !monster.dead && morph.x == monster.x && morph.y == monster.y ) {
                morph.dead = true;
                gameOver = true;
            }
            if ( !coin.dead && morph.x == coin.x && morph.y == coin.y ) {
                coin.dead = true;
                morph.score++;
            }
            if ( !morph.dead && morph.x == 882 && morph.y == 414 ) {
                gameWon = true;
            }
        };

        var gameOver = false,
            gameWon = false;

        var render = function() {
            //Background
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.fillRect( 0, 0, 900, 450 );
            if ( !gameOver ) {
                //draw terrain
                for ( var i = 0; i < 50; i++ ) {
                    ctx.drawImage( land.image, i * 18, 432 );
                }
                //draw monster
                if ( monster.imageReady && !monster.dead ) {
                    ctx.drawImage( monster.image, monster.x, monster.y );
                }
                //draw objects
                if ( coin.imageReady && !coin.dead ) {
                    ctx.drawImage( coin.image, coin.x, coin.y );
                }
                ctx.drawImage( rock.image, rock.x, rock.y );
                //draw morph
                if ( morph.holding ) {
                    ctx.drawImage( morph.holdingImage, morph.x, morph.y );
                } else {
                    ctx.drawImage( morph.image, morph.x, morph.y );
                }
                //draw score
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.font = '14px uni05';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText( 'SCORE: ' + morph.score, 18, 18);
                if ( gameWon ) {
                    ctx.fillStyle = 'rgb(0,255,0)';
                    ctx.font = '72px uni05';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText( 'YOU WIN', 450, 180);
                    reset();
                }
            } else {
                ctx.fillStyle = 'rgb(0,255,0)';
                ctx.font = '72px uni05';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText( 'GAME OVER', 450, 180);
            }
        };

        var reset = function() {
            gameOver = false;
            gameWon = false;
            morph.x = Math.floor( Math.random() * 10 + 1 ) * 18;
            morphy = 414;

            monster.x = Math.floor( Math.random() * 10 + 25 ) * 18;

            rock.x = Math.floor( ( monster.x - morph.x ) / 36 ) * 18 + 36
            rock.y = 414;

            coin.dead = false;
            morph.dead = false;
            monster.dead = false;
            morph.holding = false;
        };

        var main = function() {
            var now = Date.now(),
            delta = now - then;

            update( delta / 1000 );
            render();

            then = now;
        };

        var then = Date.now();
        reset();
        setInterval( main, 1 );

    }
};
