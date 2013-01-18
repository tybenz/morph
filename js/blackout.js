/*
*
* Copyright Tyler Benziger
* 11:10PM July 12, 2012 
*
*
* http://github.com/blacktunnel/morph
*
*/

//lookup table for string to Entity conversion
var EntityTypes = {
	'morph': function() {
		return new Morph();
	},
	'land': function() {
		return new Land();
	},
	'glib': function() {
		return new Glib();
	},
	'gun': function() {
		return new Gun();
	},
	'rock': function() {
		return new Rock();
	},
	'bird': function() {
		return new Bird();
	},
	'machine': function() {
		return new Machine();
	},
	'robot': function() {
		return new Robot();
	},
	'wave': function() {
		return new Wave();
	},
	'water': function() {
		return new Water();
	},
	'blank': function() {
		return new Entity();
	}
}

//Base class for all objects in the viewport
var Entity = Class.extend({
	width: 18,
	height: 18,
	posX: 0,
	posY: 0,
	
	className: 'block',
	type: 'entity',
	
	bitmap: [],

	init: function() {
		this.$el = $( '<div class="' + this.className + ' ' + this.type + '"></div>' );
		$inner = $( '<div class="block-inner"><div class="block-mask"></div></div>' );
		this.$el.append( $inner );
		
		for ( var i in this.bitmap ) {
			for ( var j in this.bitmap[i] ) {
				$inner.append( '<div class="block-piece" style="background-color: ' + this.bitmap[i][j] + '"></div>' );
			}
		}
		
		$inner.append( '<div class="clear"></div>' );
		
		$( "#playground" ).append( this.$el );
		this.$el[0].entity = this;
		
		return this;
	},
	
	redraw: function( bitmap ) {
		this.bitmap = bitmap;
		var $inner = this.$el.find( '.block-inner' );
		
		$inner.find( '.block-piece, br' ).remove();
		for ( var i in this.bitmap ) {
			for ( var j in this.bitmap[i] ) {
				$inner.append( '<div class="block-piece" style="background-color: ' + this.bitmap[i][j] + '"></div>' );
			}
		}
		$inner.append( '<div class="clear"></div>' );
	},
	
	xy: function( x, y ) {
		var newX = x * App.unit,
			newY = y * App.unit;
		if ( newX < App.level.right && newX >= 0 ) {
			this.$el.css( 'left', newX + 'px' );
			this.posX = x;
		}
		if ( newY < App.level.bottom && newY >= 0 ) {
			this.$el.css( 'top', newY + 'px' );
			this.posY = y;
		}
		return this;
	}
});

//Morph Entity
var Morph = Entity.extend({
	type: 'morph',
	bitmap: App.sprites.morph.man.carry,
	init: function(){
		this._super();
		this.bindings();
		return this;
	},
	bindings: function() {
		var self = this;
		
		$(document).on('keydown', function( evt ) {
			switch ( evt.which ) {
				case 37: self.moveLeft(); break;
				case 38: self.moveUp(); break;
				case 39: self.moveRight(); break;
				case 40: self.moveDown(); break;
				default: break;
			}
		});
	},
	moveRight: function() {
		this.redraw( App.sprites.morph.frog.rightDown );
		this.xy( this.posX + 1, this.posY );
		App.check( this, '.glib' );
		return this;
	},
	moveLeft: function() {
		this.redraw( App.sprites.morph.frog.leftDown );
		this.xy( this.posX - 1, this.posY );
		return this;
	}
});


//Terrain
var Terrain = Entity.extend({
	type: 'terrain'
});

var Land = Terrain.extend({
	type: 'land',
	bitmap: App.sprites.terrain.land.land
});

var Rock = Terrain.extend({
	type: 'rock',
	bitmap: App.sprites.terrain.rock.rock
});

var Wave = Terrain.extend({
	type: 'wave',
	bitmap: App.sprites.terrain.wave.wave
});

var Water = Terrain.extend({
	type: 'water',
	bitmap: App.sprites.terrain.water.water
});


//Enemy
var Enemy = Entity.extend({
	type: 'enemy'
});

var Glib = Enemy.extend({
	type: 'glib',
	bitmap: App.sprites.enemy.glib.open
});

var Gun = Enemy.extend({
	type: 'gun',
	bitmap: App.sprites.enemy.gun.left
});

var Bird = Enemy.extend({
	type: 'bird',
	bitmap: App.sprites.enemy.bird.up
});

var Robot = Enemy.extend({
	type: 'robot',
	bitmap: App.sprites.enemy.robot.down
})


//Machine

var Machine = Entity.extend({
	className: 'big-block',
	type: 'machine',
	bitmap: App.sprites.item.machine.green
})
