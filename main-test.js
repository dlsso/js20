var DungeonCrawl = (function() {
	var PLAYER_NAME = prompt("Please enter your name", "Aragorn")

	var MIDEVIL_ITEMS = [
						rustyKnife = {
							name: "rusty knife",
							description: "a rusty knife"
						},
						orangeJuice = {
							name: "orange juice",
							description: "a glass of orange juice"
						},
						scone = {
							name: "scone",
							description: "a warm scone"
						}
						]
	var MIDDLE_EARTH_MONSTERS = [] 
	var inventory = []
	var info = "Welcome to Dungeon Crawl. Press any key to begin."
	var moved = false

	var World = function(name, player, map, itemset, monsters) {
		this.name = name;
	}

	var Player = function(name) {
		this.name = name;
		this.inventory = inventory
		this.location = currentRoom

		// Sets player location
		this.setLocation = function(currentRoom){
			this.location = currentRoom
			$('#location').empty().append("Location: "+ currentRoom.name)	// Updates location in player info section
			$('.'+currentRoom.number+'').css("background-image", "url('"+currentRoom.pic+"')")	// Loads the picture for the current room
			console.log(currentRoom.name)

			$('.'+currentRoom.number+'').css("opacity", "1")

			// This section tells players if a room contains items. Accounts for differences for multiple items
			var itemsInfo = ''
			if(currentRoom.items.length===1){itemsInfo = " There is " + currentRoom.items[0].description + " here." }
			else if(currentRoom.items.length>1){
				itemsInfo = " There is "
				for (var i = 0; i < currentRoom.items.length-1; i++) {
					itemsInfo += currentRoom.items[i].description + " and "
				};
				itemsInfo += currentRoom.items[currentRoom.items.length-1].description + " here."
			}
			info = currentRoom.description + itemsInfo 	// Adds items info to room description
			$('#info').empty().append(info)		// Displays full info

			$('.container').css('background', currentRoom.color)	// Changes background to the right color
		}

		this.move = function(direction){

			var moveToNew = function(newCoord){
				// Finds the the room with the new coordinates and sets player location to that room
				moved = false
				for (var i = 0; i < SMALL_DUNGEON.length; i++) {
					if(String(SMALL_DUNGEON[i].xy) === String(newCoord)){
						$('.'+currentRoom.number+'').css("opacity", "0")
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
				if(moved){$('.in-game').css('left', parseInt($('.in-game').css("left"))+880)}
			}
			else if(direction === 'right'){
				console.log("moved right")
				var newCoord = [currentRoom.xy[0]+1, currentRoom.xy[1]] // Increments x-coord by 1
				moveToNew(newCoord)
				if(moved){$('.in-game').css('left', parseInt($('.in-game').css("left"))-880)}
			}
			else if(direction === 'up'){
				console.log("moved up")
				var newCoord = [currentRoom.xy[0], currentRoom.xy[1]+1] // Increments y-coord by 1
				moveToNew(newCoord)
				if(moved){$('.in-game').css('top', parseInt($('.in-game').css("top"))+500)}
			}
			else if(direction === 'down'){
				console.log("moved down")
				var newCoord = [currentRoom.xy[0], currentRoom.xy[1]-1] // Decrements x-coord by 1
				moveToNew(newCoord)
				if(moved){$('.in-game').css('top', parseInt($('.in-game').css("top"))-500)}
			}
			else{console.log("Move error: bad input")}
		}
	}
	
	var Map = function(roomArray) {

	}

	var Room = function(name, description, items, monsters, color, coordinates, picture, number) {
		this.name = name
		this.description = description
		this.items = items
		this.monsters = monsters
		this.color = color
		this.xy = coordinates
		this.pic = picture
		this.number = number
	}

	var Itemset = function() {

	}

	var Monsters = function() {

	}

	var room1 = new Room('outside the house', 'You are outside the white house. A trail leads east. There is a mailbox here.', [], [], '#e0e0ff', [0,3], 'outside.jpg',1)
	var room2 = new Room('trail', 'The trail continues east through the woods, but the game ends here.', [], [], '#d5e5f5', [1,3], 'trail.jpg',2)
	var room4 = new Room('study', 'You are in a reading room. There are exits to the north and south.', [], [], '#ffefd5', [0,2], 'study.jpg',4)
	var room7 = new Room('kitchen', 'You are in a blurry kitchen. There are stairs leading down to the south and a door to the front.', [orangeJuice, scone], [], '#ffefd5', [0,1], 'kitchen.jpg',7)
	var room5 = new Room('room5', 'description', [], [], '#fff', [1,2], 'trail.jpg', 5)
	var room8 = new Room('room8', 'description', [], [], '#fff', [1,1], 'trail.jpg', 8)
	var room10 = new Room('a dusty cellar', 'You are in a dusty cellar. Further along are some stairs leading up. There is a passage leading east.', [rustyKnife], [], '#8c8371', [0,0], 'cellar.jpg',10)
	var room11 = new Room('a twisty passage', 'This is dark, twisty passage. It continues to the east.', [], [], '#555', [1,0], 'passages.jpg',11)
	var room12 = new Room('a small cave', 'It feels like you have entered a small cave. It is very dark. You are likely to be eaten by a grue.', [], [], '#333', [2,0],12)
	var currentRoom = room10
	var SMALL_DUNGEON = [room1, room2, room4, room5, room8, room7, room10, room11, room12] 

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

			// $(document).on('keydown', function(key){
			// 	if(key.which===37){ourHero.move('left')}
			// 	else if(key.which===38){ourHero.move('up');}
			// 	else if(key.which===39){ourHero.move('right')}
			// 	else if(key.which===40){ourHero.move('down')}
			// 	$(this).off()
			// })
		})

		$(document).on('keydown', function(key){
				if(key.which===37){
					$('.'+currentRoom.number+'').on('transitionend', function(e) {
						ourHero.move('left'); 
					})
					if(moved){$(this).off()}
				}
				else if(key.which===38){
					$('.'+currentRoom.number+'').on('transitionend', function(e) {
						ourHero.move('up'); 
					})
					if(moved){$(this).off()}
				}
				else if(key.which===39){
					$('.'+currentRoom.number+'').on('transitionend', function(e) {
						ourHero.move('right'); 
					})
					if(moved){$(this).off()}
				}
				else if(key.which===40){
					$('.'+currentRoom.number+'').on('transitionend', function(e) {
						ourHero.move('down'); 
					})
					if(moved){$(this).off()}
				}
			
		});

		
		$('.'+4+'').on('transitionend', function(){ console.log("transition detected here though");console.log($(currentRoom.number))})

		$(document).on('click', function(key){
			console.log("clicked")
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

