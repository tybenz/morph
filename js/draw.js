var Draw = {
    erase: false,
    unit: 40,
    actualUnit: 18,
    undoLog: [],
    redoLog: [],
    grid: [
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
        [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ]
    ],
    colors: [ "#00F", "#0FF", "#0F0", "#008000", "#F0F", "#FF7F00", "#7F007F", "#F00", "#FF0", "#FFF", "#777" ]
};

$(function() {
    Draw.init();
});

Draw.init = function() {
    Draw.$canvas = $( '#canvas' );
    Draw.$pal = $( '#pallette' );

    for (var i = 0; i < Draw.colors.length; i += 1) {
        Draw.$pal.append( '<a href="#" class="color" style="background-color: ' + Draw.colors[i] + '"></a>' );
    }
    Draw.$pal.append( '<a href="#" class="color eraser"></a>' );
    var $blue = Draw.$pal.find( '.color:first' )
        $activeColor = $( '#active-color' );

    Draw.$pal.find( '.color' ).bind( 'click', function( evt ) {
        evt.preventDefault();
        var $this = $( this ),
            color = $this.css( 'background-color' );
        Draw.$pal.find( '.color' ).removeClass( 'active' );
        $this.addClass( 'active' );
        $activeColor.css(  'background-color', color ).css( 'background-image', 'none' );
        Draw.erase = false;
        Draw.paintGrid().fillStyle = color;
        if ( $this.hasClass( 'eraser' ) ) {
            $activeColor.css( 'background-image', $this.css( 'background-image' ) );
            Draw.paintGrid().fillStyle = 'rgba(0,0,0,0)';
            Draw.erase = true;
        }
    });
    $blue.click();


    Draw.$canvas.bind( 'click', Draw.canvasClick );

    $( document ).bind( 'keydown', function( evt ) {
        var undo = evt.which == 90 && evt.metaKey,
            redo = evt.which == 89 && evt.metaKey;

        if ( undo ) {
            Draw.undo();
        } else if ( redo ) {
            Draw.redo();
        }
    });

    $( '#undo' ).click( function( evt ) {
        evt.preventDefault();
        Draw.undo();
    });

    $( '#redo' ).click( function( evt ) {
        evt.preventDefault();
        Draw.redo();
    });

    $( '#clear' ).click( function( evt ) {
        evt.preventDefault();
        Draw.resetCanvas( true );
    });

    $( '#download' ).click( function( evt ) {
        evt.preventDefault();
        Draw.download();
    });

    $( '#download-full' ).click( function( evt ) {
        evt.preventDefault();
        Draw.download( true );
    });
};

Draw.canvasClick = function( evt ) {
    evt.preventDefault();

    var x = evt.pageX - Draw.$canvas.offset().left,
        y = evt.pageY - Draw.$canvas.offset().top,
        targetX = Math.floor( x / Draw.unit ),
        targetY = Math.floor( y / Draw.unit );

    Draw.undoLog.push( Draw.grid.clone() );

    if ( Draw.erase ) {
        Draw.grid[ targetY ][ targetX ] = 'rgba(0,0,0,0)';
        Draw.resetCanvas();
    } else {
        Draw.grid[ targetY ][ targetX ] = Draw.paintGrid().fillStyle;
        Draw.paintGrid().fillRect( targetX * Draw.unit, targetY * Draw.unit, Draw.unit, Draw.unit );
    }
}

Draw.paintGrid = function() {
    return Draw.$canvas[0].getContext( '2d' );
}

Draw.redo = function () {
    if ( Draw.redoLog.length ) {
        Draw.undoLog.push( Draw.grid.clone() );
        Draw.$canvas.remove();
        Draw.$canvas = $( '<canvas id="canvas" width="' + Draw.unit * 9 + '" height="' + Draw.unit * 9 + '"></canvas>' );
        Draw.$canvas.click( Draw.canvasClick );
        $( '#game' ).prepend( Draw.$canvas );
        Draw.grid = Draw.redoLog.pop().clone();
        Draw.redraw( Draw.grid, Draw.paintGrid(), Draw.unit );
    }
};

Draw.undo = function() {
    if ( Draw.undoLog.length ) {
        Draw.redoLog.push( Draw.grid.clone() );
        Draw.$canvas.remove();
        Draw.$canvas = $( '<canvas id="canvas" width="' + Draw.unit * 9 + '" height="' + Draw.unit * 9 + '"></canvas>' );
        Draw.$canvas.click( Draw.canvasClick );
        $( '#game' ).prepend( Draw.$canvas );
        Draw.grid = Draw.undoLog.pop().clone();
        Draw.redraw( Draw.grid, Draw.paintGrid(), Draw.unit );
    }
};

Draw.redraw = function( grid, paintGrid, unit ) {
    for ( var i = 0; i < 9; i++ ) {
        for ( var j = 0; j < 9; j++ ) {
            var color = grid[ i ][ j ];
            paintGrid.fillStyle = color;
            paintGrid.fillRect( j * unit, i * unit, unit, unit );
        }
    }
};

Draw.resetCanvas = function( hardClear ) {
    if ( hardClear ) {
        Draw.undoLog.push( Draw.grid.clone() );
        Draw.grid = [
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ],
            [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent' ]
        ];
    }
    Draw.$canvas.remove();
    Draw.$canvas = $( '<canvas id="canvas" width="' + Draw.unit * 9 + '" height="' + Draw.unit * 9 + '"></canvas>' );
    Draw.$canvas.click( Draw.canvasClick );
    $( '#game' ).prepend( Draw.$canvas );
    Draw.redraw( Draw.grid, Draw.paintGrid(), Draw.unit );
}

Draw.download = function( full ) {
    var img;
    if ( full ) {
        img = Draw.$canvas[0].toDataURL( 'image/png' );
    } else {
        //recreate drawing but smaller scale
        var $tempCanvas = $( '<canvas style="display: none" width="' + Draw.actualUnit + '" height="' + Draw.actualUnit + '"></canvas>' );
        $('body').append( $tempCanvas );
        var tempPaintGrid = $tempCanvas[0].getContext('2d');
        Draw.redraw( Draw.grid, tempPaintGrid, 2 );

        //get img and remove temporary canvas
        img = $tempCanvas[0].toDataURL( 'image/png' );
        $tempCanvas.remove();
    }

    var $win = $( window ),
        $dialog = $( '#dialog' ),
        winHeight = $win.height(),
        winWidth = $win.width();

    var json = JSON.stringify( Draw.grid, undefined, 4 );
    json = json.replace( /",\n(\s)*/g, '", ' ).
                replace( /\[\n\s*"/g, '[ "' ).
                replace( /"\n\s*\]/g, '" ]' );
    console.log(json);
    alert( json );
};


Object.prototype.clone = function() {
    var newObj = [];
    for ( i in this ) {
        if (i == 'clone') {
            continue;
        }
        if ( this[ i ] && typeof this[ i ] == "object" ) {
            newObj[ i ] = this[ i ].clone();
        } else {
            newObj[ i ] = this[ i ];
        }
    }
    return newObj;
};
