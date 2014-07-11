var DungeonCrawl = (function() {
	var PLAYER_NAME = prompt("Please enter your name", "Aragorn")
	var SMALL_DUNGEON = [[room1, room2, room3],[room4, room5, room6],[room7, room8, room9]] 
	var MIDEVIL_ITEMS = [
						rustyKnife = {
							name: "rusty knife"
						},
						orangePotion = {
							name: "orange potion"
						}
						]
	var MIDDLE_EARTH_MONSTERS = [] 
	var inventory = [rustyKnife, orangePotion]
	var info = "Welcome to Dungeon Crawl."
	


	var World = function(name, player, map, itemset, monsters) {
		this.name = name;
	}

	var Player = function(name) {
		this.name = name;
		this.inventory = inventory
		this.location = currentRoom
		this.move = function(direction){
			
		}
	}
	
	var Map = function(roomArray) {

	}

	var Room = function(name, description, items, monsters) {
		this.name = name
		this.items = items
		this.monsters = monsters
	}

	var Itemset = function() {

	}

	var Monsters = function() {

	}

	var room1 = new Room('room1')
	var room2 = new Room('room1')
	var room3 = new Room('room1')
	var room4 = new Room('room1')
	var room5 = new Room('room1')
	var room6 = new Room('room1')
	var room7 = new Room('A dusty cellar')
	var room8 = new Room('room1')
	var room9 = new Room('room1')
	var currentRoom = room7

	var ourHero = new Player(PLAYER_NAME);
	var smallDungeon = new Map(SMALL_DUNGEON);
	var midevilItems = new Itemset(MIDEVIL_ITEMS);
	var middleEarthMonsters = new Monsters(MIDDLE_EARTH_MONSTERS);

	var init = function() {				// Creates the init method for DungeonCrawl
		var world = new World("Middle Earth", ourHero, smallDungeon, midevilItems, middleEarthMonsters )
		$('#name').append(PLAYER_NAME)
		$.each(inventory, function( index, value ) {
		  $('#inventory').append(value.name+', ')
		})
		$('#location').append(currentRoom.name)
		$('#info').append(info)

		console.log(world.name+' created!')
		console.log('Playing as: '+PLAYER_NAME)
	}

	// Allows init to be called from the outside
	return {
		init: init
	}
})();


$(document).on('ready', function() {
	DungeonCrawl.init();
});
/*
// create a MoonGame namespace to contain all the game variables
// use the revealing module pattern with IIFE
// IIFE: function expression, surrounded by (), then immediately invoked: ()
var MoonGame = (function() {
	// constants
	var NUM_BIRDS = 20;
	var BIRD_MAX_TOP = 70;
	var BIRD_MAX_LEFT = 92;

	// Bird constructor
	var Bird = function() {
	}
	Bird.prototype.create = function() {
		this.el = $('<i class="bird icon-twitter-bird">');
		this.el.css({
			top: Math.random()*BIRD_MAX_TOP + '%',
			left: Math.random()*BIRD_MAX_LEFT + '%'
		})
		return this.el;
	};

	// Penguin constructor
	var Penguin = function() {
	}
	Penguin.prototype.create = function() {
		this.el = $('<i class="penguin icon-plancast">');
		return this.el;
	};

	// Flock constructor
	var Flock = function(penguin) {
		this.penguin = penguin;
		this.birds = [];
	}
	Flock.prototype.create = function() {
		var newEL = $('<div class="flock">');
		newEL.append(this.penguin.create())
		newEL.css('bottom', this.birds.length*50)

		// Add new birds to the flock
		for (var i = 0; i < this.birds.length; i++) {
			newEL.append(this.birds[i].el)
		};

		if(this.el) {
			this.el.replaceWith(newEL)
		}
		this.el = newEL;
		return newEL;
	};
	Flock.prototype.addBirdClickHandler = function(bird) {
		var self = this;
		bird.el.on('click', function() {
			self.birds.push(bird)
			self.create()
		})
	};

	// declare array of free-flying birds
	var birds = [];
	var flock = null;

	var init = function() {

		// create the flock
		var penguin = new Penguin();
		flock = new Flock(penguin);
		$('.sky').append(flock.create());

		// create birds in the sky
		for (var i = 0; i <NUM_BIRDS; i++) {
			var bird = new Bird();
			var birdEl = bird.create();
			$('.sky').append(birdEl)
			birds.push(bird)
			flock.addBirdClickHandler(bird);
		}


	}


	// return an object literal with the properties and methods that we want to reveal to the rest of the program
	// everything else remains private
	return {
		init: init
	}
})();




$(document).on('ready', function() {
	MoonGame.init();
});
*/