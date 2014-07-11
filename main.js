var DungeonCrawl = (function() {
	var PLAYER_NAME = prompt("Please enter your name", "Aragorn")

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
	var info = "Welcome to Dungeon Crawl. Press any key to begin."
	

	var World = function(name, player, map, itemset, monsters) {
		this.name = name;
	}

	var Player = function(name) {
		this.name = name;
		this.inventory = inventory
		this.location = currentRoom
		this.setLocation = function(currentRoom){
			this.location = currentRoom
			$('#location').empty().append("Location: "+ currentRoom.name)
			info = currentRoom.description
			$('#info').empty().append(info)
			$('.container').css('background', currentRoom.color)
		}
		this.move = function(direction){

			var moveToNew = function(newCoord){
				// Finds the the room with the new coordinates and sets player location to that room
				moved = false
				for (var i = 0; i < SMALL_DUNGEON.length; i++) {
					if(String(SMALL_DUNGEON[i].xy) === String(newCoord)){
						currentRoom = SMALL_DUNGEON[i];
						ourHero.setLocation(currentRoom)
						moved = true
					}
				}
				if(!moved){info = "You can't go that way."; $('#info').empty().append(info)}
			}

			if(direction === 'left'){
				console.log("moved left")		
				var newCoord = [currentRoom.xy[0]-1, currentRoom.xy[1]] // Decrements x-coord by 1
				moveToNew(newCoord)
			}
			else if(direction === 'right'){
				console.log("moved right")
				var newCoord = [currentRoom.xy[0]+1, currentRoom.xy[1]] // Increments x-coord by 1
				moveToNew(newCoord)
			}
			else if(direction === 'up'){
				console.log("moved up")
				var newCoord = [currentRoom.xy[0], currentRoom.xy[1]+1] // Increments y-coord by 1
				moveToNew(newCoord)
			}
			else if(direction === 'down'){
				console.log("moved down")
				var newCoord = [currentRoom.xy[0], currentRoom.xy[1]-1] // Decrements x-coord by 1
				moveToNew(newCoord)
			}
			else{console.log("Move error: bad input")}
		}
	}
	
	var Map = function(roomArray) {

	}

	var Room = function(name, description, items, monsters, color, coordinates) {
		this.name = name
		this.description = description
		this.items = items
		this.monsters = monsters
		this.color = color
		this.xy = coordinates
	}

	var Itemset = function() {

	}

	var Monsters = function() {

	}

	var room1 = new Room('living room', 'This is the living room.', [], [], '#ffefd5', [0,2])
	var room2 = new Room('outside the house', 'You are outside the white house. There is a mailbox here.', [], [], '#e0e0ff', [1,2])
	var room3 = new Room('a pleasant meadow', 'The trail continues east through the meadow, but the game ends here.', [], [], '#d5e5f5', [2,2])
	var room4 = new Room('kitchen', 'You are in a cozy kitchen. It looks like someone was here recently.', [], [], '#ffefd5', [0,1])
	// var room5 = new Room('room1', 'description', [], [], '#fff', [1,1])
	// var room6 = new Room('room1', 'description', [], [], '#fff', [2,1])
	var room7 = new Room('a dusty cellar', 'You are in a dim, dusty cellar.', [], [], '#8c8371', [0,0])
	var room8 = new Room('a twisty passage', 'This is dark, twisty passage.', [], [], '#555', [1,0])
	var room9 = new Room('a small cave', 'It feels like you have entered a small cave. It is very dark. You are likely to be eaten by a grue.', [], [], '#333', [2,0])
	var currentRoom = room7
	var SMALL_DUNGEON = [room1, room2, room3, room4, room7, room8, room9] 

	var ourHero = new Player(PLAYER_NAME);
	var smallDungeon = new Map(SMALL_DUNGEON);
	var midevilItems = new Itemset(MIDEVIL_ITEMS);
	var middleEarthMonsters = new Monsters(MIDDLE_EARTH_MONSTERS);

	var init = function() {				// Creates the init method for DungeonCrawl
		var world = new World("Middle Earth", ourHero, smallDungeon, midevilItems, middleEarthMonsters )

		$('#info').append(info)

		$(document).one('keydown', function(key){
			$('#name').append(PLAYER_NAME)
			$.each(inventory, function( index, value ) {
			  $('#inventory').append(value.name+', ')
			})
			ourHero.setLocation(currentRoom)

			$(document).on('keydown', function(key){
				if(key.which===37){ourHero.move('left')}
				else if(key.which===38){ourHero.move('up')}
				else if(key.which===39){ourHero.move('right')}
				else if(key.which===40){ourHero.move('down')}
			})

		})
		




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