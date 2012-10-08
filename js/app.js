$(function() {
    initApp();
});

var sage = "#004d00",
	green = "#0f0",
	black = "#000",
	purple = "#980398",
	pink = "#ff6ab5",
	yellow = "#ff0",
	orange = "#fd8206",
	red = "#f00",
	teal = "#0ff",
	blue = "#00f",
	white = "#fff",
	gray = "#777",
	trans = "transparent";

var App = {
	unit: 18,
	check: function( entity, filter ) {
		this.collision.call( entity, filter );
	},
	collision: function( filter ) {
		var $el = $( filter ),
			entity;
		if ( $el.length ) {
			entity = $el.get(0).entity;
		}
		var left = parseInt( this.$el.css( 'left' ) ),
			top = parseInt( this.$el.css( 'top' ) ),
			source = {
				left: left,
				top: top,
				right: left + this.$el.width(),
				bottom: top + this.$el.height()
			};
		
		var left = parseInt( $el.css( 'left' ) ),
			top = parseInt( $el.css( 'top' ) ),
			target = {
				left: left,
				top: top,
				right: left + $el.width(),
				bottom: top + $el.height()
			};
		
		//check for crossover
		var matchLeft = target.left > source.left && target.left < source.right,
			matchRight = target.right > source.left && target.right < source.right,
			matchTop = target.top > source.top && target.top < source.bottom,
			matchBottom = target.bottom > source.top && target.bottom < source.bottom,
			topLeft = matchLeft && matchTop,
			topRight = matchRight && matchTop,
			bottomLeft = matchLeft && matchBottom,
			bottomRight = matchRight && matchBottom,
			topRightBottomLeft = target.left == source.left && target.right == source.right &&
				target.top == source.top && target.bottom == source.bottom;
		if ( topLeft || topRight || bottomLeft || bottomRight || topRightBottomLeft ) {
			return true;
		}
		return false;
	}
	/*
	keyTracker: {},
	refreshRate: 200,
	callbacks: [],
	refresh: function() {
		var scope,
			fn;
		for ( var i in this.callbacks ) {
			scope = this.callbacks[ i ].scope;
			fn = this.callbacks[ i ].fn;
			response = fn.call( scope );
			if ( response ) {
				this.callbacks.splice( i, 1 );
			}
		}
	},
	engage: function( fn, scope ) {
		this.callbacks.push( { fn: fn, scope: scope } );
	}
	*/
};

var level = {
	right: 50 * App.unit,
	bottom: 25 * App.unit,
	grid: [
		[ "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "bird", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "bird", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "robot", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "gun", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "land", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "rock", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "morph", "blank", "glib", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "land", "land", "land", "land", "land", "land", "land", "land", "land", "blank", "blank", "blank", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "machine", "blank", "blank" ],
		[ "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "gun", "blank", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "wave", "wave", "wave", "land", "land", "land", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "glib", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank" ],
		[ "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "water", "water", "water", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land", "land" ]
	]
};

App.grid = [];
App.morph = '';

var initApp = function() {
	//read in level
	App.level = level;
	App.grid = $.map( level.grid, function( row, i ) {
		return [ $.map( row, function( block, j ) {
			if ( block != 'blank' ) {
				var current = EntityTypes[ block ]( parseInt( j ), parseInt( i ) ).xy( j, i );
				if ( block == 'morph' ) {
					App.morph = current;
				}
				return current;
			}
			return 'blank';
		}) ];
	});
	//start game
};