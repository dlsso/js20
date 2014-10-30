var DungeonCrawl = (function() {
	var PLAYER_NAME = prompt("Please enter your name", "Bilbo Baggins")
	var MIDEVIL_ITEMS = [											// I know it's not spelled like that, it's just fun (and shorter)
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
							description: "a delicious-looking blueberry scone"
						}
						]
	var MIDDLE_EARTH_MONSTERS = [] 
	var inventory = []
	var info = "Welcome to An Unexpected Journey. If you need help once the game starts you can press H at any time. Press any key to begin."
	

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
			$('#location').empty().append("<strong>Location: </strong>"+ currentRoom.name)	// Updates location in player info section
			$('.'+currentRoom.number+'').css("background-image", "url('"+currentRoom.pic+"')")	// Loads the picture for the current room
			$('.'+currentRoom.number+'').css("opacity", "1")	// Changes current room to visible
			$('.container').css('background', currentRoom.color)	// Changes background to the right color
		}

		this.updateRoomInfo = function(currentRoom){
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
						ourHero.updateRoomInfo(currentRoom)
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

	var Itemset = function(itemArray) {
		this.items = itemArray
	}

	var Monsters = function() {

	}

	var room1 = new Room('trail', 'The trail continues east through the woods, but the game ends here.', [], [], '#d5e5f5', [-1,3], 'trail.jpg',1)
	var room5 = new Room('outside the house', 'You are outside the white house. A trail leads north. There is a mailbox here.', [], [], '#e0e0ff', [-1,2], 'outside.jpg',5)
	var room9 = new Room('study', 'You are in a reading room. There are exits to the north and east.', [], [], '#ffefd5', [-1,1], 'study.jpg',9)
	var room10 = new Room('kitchen', 'You are in a cozy kitchen. There are stairs leading down to the south and another room to the west.', [scone], [], '#ffefd5', [0,1], 'kitchen.jpg',10)
	// var room5 = new Room('room5', 'description', [], [], '#fff', [1,2], 'trail.jpg', 5)
	// var room8 = new Room('room8', 'description', [], [], '#fff', [1,1], 'trail.jpg', 8)
	var room14 = new Room('a dusty cellar', 'You are in a dusty cellar. Further along are some stairs leading up. There is a passage leading east.', [rustyKnife], [], '#8c8371', [0,0], 'cellar.jpg',14)
	var room15 = new Room('a twisty passage', 'This is dark, twisty passage. It continues to the east.', [], [], '#555', [1,0], 'passage.jpg',15)
	var room16 = new Room('a small cave', 'It feels like you have entered a small cave. It is very dark. You are likely to be eaten by a grue.', [], [], '#333', [2,0],16)
	var currentRoom = room14
	var SMALL_DUNGEON = [room1, room5, room9, room10, room14, room15, room16] 

	var ourHero = new Player(PLAYER_NAME);
	var smallDungeon = new Map(SMALL_DUNGEON);
	var midevilItems = new Itemset(MIDEVIL_ITEMS);
	var middleEarthMonsters = new Monsters(MIDDLE_EARTH_MONSTERS);


	var init = function() {				// Creates the init method for DungeonCrawl
		var world = new World("Middle Earth", ourHero, smallDungeon, midevilItems, middleEarthMonsters )	// Instantiate world
		$('#info').append(info)		// Welcome line

		// Start the game
		$(document).one('keydown', function(key){
			$('#name').append(PLAYER_NAME)
			$.each(inventory, function( index, value ) {
			  $('#inventory').append(value.name+', ')
			})
			ourHero.setLocation(currentRoom)
			ourHero.updateRoomInfo(currentRoom)
		})

		// When there is not a slide transition happening let the player move with the arrow keys, bring up menus
		$('.in-game').on('transitionend', function(e){
			$(document).on('keydown', function(key){
				if(key.which===73){$('.inventory-menu').slideToggle()}
				if(key.which===72){$('.help-menu').slideToggle()}
				if(key.which===37){ourHero.move('left'); if(moved){$(document).off('keydown')}}
				else if(key.which===38){ourHero.move('up'); if(moved){$(document).off('keydown')}}
				else if(key.which===39){ourHero.move('right'); if(moved){$(document).off('keydown')}}
				else if(key.which===40){ourHero.move('down'); if(moved){$(document).off('keydown')}}
			})
				// Stops fade transitions from interfering
				$('.room').on('transitionend', function(e){
					e.stopPropagation()
				})
		});

		$(document).on('click', '#rustyKnife', function(key){
			$('#rustyKnife').toggleClass('knife-zoom')
			$('.'+currentRoom.number+' .btn-container').empty().append('<button id="knife" data-item=rustyKnife class="take"> Take '+rustyKnife.name+'</button')
			info = "This is "+rustyKnife.description+"."
			$('#info').empty().append(info)
			$('.btn-container').toggleClass('hidden')

		})

		$(document).on('click', '#scone', function(key){
			$('#scone').toggleClass('scone-zoom')
			$('.'+currentRoom.number+' .btn-container').empty().append('<button data-item=scone class="take"> Take '+scone.name+'</button')
			info = "This is "+scone.description+"."
			$('#info').empty().append(info)
			$('.btn-container').toggleClass('hidden')
		})

		// Updates screen, room, inventory when take button is clicked
		$(document).on('click', '.take', function(key){
			var itemName = $(this).data('item')
			$(this).parent().siblings().attr('id', itemName).addClass('hidden')	// Hide item
			$('.btn-container').addClass('hidden') // Hide button

			// Remove item from room
			var index = currentRoom.items.indexOf(eval(itemName))
			if (index > -1) {
				var itemObject = currentRoom.items[index]
			    currentRoom.items.splice(index, 1);
			}

			ourHero.updateRoomInfo(currentRoom)		// Updates room
			ourHero.inventory.push(itemObject)	// Adds item to inventory
			// Update inventory display
			$('#inventory').empty().append("<strong>Inventory: </strong>")
			$.each(inventory, function( index, value ) {
			  $('#inventory').append(value.name+', ')
			})
		})


		$(".btn1").click(function(){
		    $("p").slideUp();
		  });
		  $(".btn2").click(function(){
		    $("p").slideDown();
		});

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

