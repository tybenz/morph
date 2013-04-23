App.sprites = {
	'morph': {
		'block': {
			'block': [
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, green, green ]
			]
		},
		'man': {
			'right': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, green ],
				[ green, green, green, green, green, green, green, green, green ],
				[ green, trans, trans, green, green, green, trans, trans, trans ],
				[ trans, trans, trans, green, green, green, trans, trans, trans ],
				[ green, green, green, trans, trans, trans, green, trans, trans ],
				[ green, green, trans, trans, trans, trans, green, green, trans ],
				[ green, trans, trans, trans, trans, trans, green, green, green ]
			],
			'left': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ green, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ green, green, green, green, green, green, green, green, green ],
				[ trans, trans, trans, green, green, green, trans, trans, green ],
				[ trans, trans, trans, green, green, green, trans, trans, trans ],
				[ trans, trans, green, trans, trans, trans, green, green, green ],
				[ trans, green, green, trans, trans, trans, trans, green, green ],
				[ green, green, green, trans, trans, trans, trans, trans, green ]
			],
			'carry': [
				[ trans, green, trans, trans, trans, trans, trans, green, trans ],
				[ trans, green, trans, trans, green, trans, trans, green, trans ],
				[ trans, green, trans, trans, trans, trans, trans, green, trans ],
				[ trans, green, green, green, green, green, green, green, trans ],
				[ trans, trans, trans, green, green, green, trans, trans, trans ],
				[ trans, trans, trans, green, green, green, trans, trans, trans ],
				[ green, green, green, trans, trans, trans, green, trans, trans ],
				[ green, green, trans, trans, trans, trans, green, green, trans ],
				[ green, trans, trans, trans, trans, trans, green, green, green ]
			]
		},
		'boat': {
			'right': [
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, green, green, trans, trans, trans ],
				[ trans, trans, trans, trans, green, green, green, trans, trans ],
				[ trans, trans, trans, trans, green, green, green, green, trans ],
				[ trans, trans, trans, trans, green, green, green, green, green ],
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ green, green, green, green, green, green, green, green, green ],
				[ trans, green, green, green, green, green, green, green, trans ],
				[ trans, trans, green, green, green, green, green, trans, trans ]
			],
			'left': [
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ trans, trans, trans, green, green, trans, trans, trans, trans ],
				[ trans, trans, green, green, green, trans, trans, trans, trans ],
				[ trans, green, green, green, green, trans, trans, trans, trans ],
				[ green, green, green, green, green, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, green, trans, trans, trans, trans ],
				[ green, green, green, green, green, green, green, green, green ],
				[ trans, green, green, green, green, green, green, green, trans ],
				[ trans, trans, green, green, green, green, green, trans, trans ]
			]
		},
		'frog': {
			'rightDown': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, green, green, green, trans, green, trans ],
				[ trans, trans, green, green, green, green, green, green, green ],
				[ trans, green, green, green, green, green, green, green, green ],
				[ trans, green, green, green, green, green, green, green, green ],
				[ green, green, green, green, green, green, green, trans, trans ],
				[ trans, green, green, green, trans, trans, green, trans, trans ],
				[ trans, trans, green, green, green, trans, green, trans, trans ],
				[ trans, trans, green, green, green, trans, green, green, trans ]
			],
			'rightLick': [],
			'rightTongue': [],
			'rightUp': [],
			'rightUpLick': [],
			'rightUpTongue': [],
			'leftDown': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, green, trans, green, green, green, trans, trans, trans ],
				[ green, green, green, green, green, green, green, trans, trans ],
				[ green, green, green, green, green, green, green, green, trans ],
				[ green, green, green, green, green, green, green, green, trans ],
				[ trans, trans, green, green, green, green, green, green, green ],
				[ trans, trans, green, trans, trans, green, green, green, trans ],
				[ trans, trans, green, trans, green, green, green, trans, trans ],
				[ trans, green, green, trans, green, green, green, trans, trans ]
			],
			'leftLick': [],
			'leftTongue': [],
			'leftUp': [],
			'leftUpLick': [],
			'leftUpTongue': []
		},
		'jelly': {
			'jelly': []
		},
		'plane': {
			'plane': []
		},
		'clock': {
			'clock': []
		},
		'flame': {
			'flame': []
		}
	},
	'friend': {
		'flib': {
			'smile': [],
			'closed': [],
			'surprised': [],
			'scared': [],
			'line': []
		},
		'gobot': {
			'down': [],
			'up': []
		}
	},
	'enemy': {
		'glib': {
			'open': [
				[ trans, red, trans, trans, trans, trans, trans, red, trans ],
				[ trans, red, red, trans, trans, trans, red, red, trans ],
				[ trans, red, black, red, red, red, black, red, trans ],
				[ trans, red, red, red, red, red, red, red, trans ],
				[ red, red, black, red, black, red, black, red, red ],
				[ red, red, black, black, black, black, black, red, red ],
				[ trans, red, red, red, red, red, red, red, trans ],
				[ trans, trans, red, red, trans, red, red, trans, trans ],
				[ trans, red, red, red, trans, red, red, red, trans ]
			],
			'closed': []
		},
		'robot': {
			'up': [],
			'down': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, red, red, red, trans, trans, trans ],
				[ red, red, trans, red, black, red, trans, red, red ],
				[ trans, red, red, red, red, red, red, red, trans ],
				[ red, red, trans, red, red, red, trans, red, red ],
				[ trans, trans, trans, red, red, red, trans, trans, trans ],
				[ trans, red, red, red, red, red, red, red, trans ],
				[ trans, red, red, trans, trans, trans, red, red, trans ],
				[ red, red, red, trans, trans, trans, red, red, red ]
			]
		},
		'bird': {
			'up': [
				[ trans, red, red, trans, trans, trans, red, red, trans ],
				[ trans, trans, red, red, trans, red, red, trans, trans ],
				[ trans, trans, red, red, trans, red, red, trans, trans ],
				[ trans, trans, trans, red, red, red, red, trans, red ],
				[ trans, trans, trans, red, red, red, trans, trans, red ],
				[ trans, red, red, red, red, red, red, red, red ],
				[ red, red, red, red, red, red, red, red, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ]
			],
			'down': [
				[ trans, red, red, trans, trans, trans, red, red, trans ],
				[ trans, trans, red, red, trans, red, red, trans, trans ],
				[ trans, trans, red, red, trans, red, red, trans, trans ],
				[ trans, trans, trans, red, red, red, red, trans, red ],
				[ trans, trans, trans, red, red, red, trans, trans, red ],
				[ trans, red, red, red, red, red, red, red, red ],
				[ red, red, red, red, red, red, red, red, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ]
			]
		},
		'gun': {
			'left': [
				[ trans, trans, red, red, red, red, trans, trans, trans ],
				[ trans, trans, trans, red, red, red, trans, trans, trans ],
				[ trans, trans, trans, red, red, red, trans, trans, trans ],
				[ trans, trans, red, red, red, red, red, trans, trans ],
				[ trans, red, red, red, red, red, red, red, trans ],
				[ trans, red, black, red, red, red, black, red, trans ],
				[ trans, red, black, black, red, black, black, red, trans ],
				[ trans, red, black, red, red, red, black, red, trans ],
				[ trans, red, red, red, red, red, red, red, trans ]
			]
		},
		'sub': {
			'sub': []
		}
	},
	'boss': {
		'base': {
			'up': []
		}
 	},
	'item': {
		'machine': {
			'green': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, trans, trans, trans, trans, trans, trans, trans, trans, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, trans, trans, trans, trans, trans, trans, trans, trans, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, green, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, black, black, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, black, black, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, purple, purple ]
			],
			'red': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, purple, purple, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, trans, trans, trans, trans, trans, trans, trans, trans, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, purple, trans, trans, trans, trans, trans, trans, trans, trans, purple, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, red, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, black, black, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, black, black, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans, purple, purple, purple, purple, purple, purple, purple, purple, purple ]
			]
		},
		'heart': {
			'heart': []
		}
	},
	'terrain': {
		'land': {
			'land': [
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ],
				[ sage, sage, sage, sage, sage, sage, sage, sage, sage ]
			]
		},
		'rock': {
			'rock': [
				[ trans, trans, trans, trans, gray, gray, trans, trans, trans ],
				[ trans, trans, gray, gray, gray, gray, gray, trans, trans ],
				[ trans, trans, gray, gray, gray, gray, gray, gray, trans ],
				[ trans, gray, gray, gray, gray, gray, gray, gray, trans ],
				[ gray, gray, gray, gray, gray, gray, gray, gray, trans ],
				[ gray, gray, gray, gray, gray, gray, gray, gray, gray ],
				[ gray, gray, gray, gray, gray, gray, gray, gray, gray ],
				[ gray, gray, gray, gray, gray, gray, gray, gray, gray ],
				[ gray, gray, gray, gray, gray, gray, gray, gray, gray ]
			]
		},
		'cloud': {
			'cloud': [
				[ trans, trans, trans, trans, white, white, trans, trans, trans ],
				[ trans, trans, trans, white, white, white, white, white, trans ],
				[ trans, white, white, white, white, white, white, white, white ],
				[ trans, white, white, white, white, white, white, white, white ],
				[ trans, trans, white, white, white, white, white, white, trans ],
				[ trans, white, white, white, white, white, white, trans, trans ],
				[ trans, white, white, white, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ]
			]
		},
		'water': {
			'water': [
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ],
				[ blue, blue, blue, blue, blue, blue, blue, blue, blue ]
			]
		},
		'wave': {
			'wave': [
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, trans ],
				[ trans, trans, trans, trans, trans, trans, trans, trans, blue ],
				[ blue, trans, trans, trans, trans, trans, trans, trans, blue ],
				[ blue, blue, blue, trans, trans, trans, trans, blue, blue ]
			]
		},
		'bubble': {
			'bubble': [
				[ trans, trans, white, white, white, white, white, trans, trans ],
				[ trans, white, trans, trans, trans, trans, trans, white, trans ],
				[ white, trans, trans, trans, white, white, trans, trans, white ],
				[ white, trans, trans, trans, trans, trans, white, trans, white ],
				[ white, trans, trans, trans, trans, trans, white, trans, white ],
				[ white, trans, trans, trans, trans, trans, trans, trans, white ],
				[ white, trans, trans, trans, trans, trans, trans, trans, white ],
				[ trans, white, trans, trans, trans, trans, trans, white, trans ],
				[ trans, trans, white, white, white, white, white, trans, trans ]
			]
		}
	}
};