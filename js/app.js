// -------------------------- ENEMY -------------------------------------

// Enemies our player must avoid
var Enemy = function (x, y, speed){
	// Variables applied to each of our instances go here
	// We've providedd one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers
	this.x += this.speed * dt;

	// When off canvas, reset position of enemy to move across again
	if(this.x > 550){
		this.x = -100;
		this.randomSpeed();
	}

	// Check for collision between player and enemies
	if(player.x < this.x + 60 &&
		player.x + 37 > this.x &&
		player.y < this.y + 25 &&
		player.y + 30 > this.y){
		player.x = 200;
		player.y = 380;
		player.playerLives -= 1;
		player.characterReset();
	}
};

// Speed Multiplier, we increase this value to increase difficulty
var speedMultiplier = 40;

// Random speed generator
Enemy.prototype.randomSpeed = function(){
	"use strict";
	// Speed is a random number from 1-10 times speedMultiplier
	this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
// Draw the scoreboard on the screen
Enemy.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.fillStyle = "white";
	ctx.font = "16px Comic Sans MS";
	ctx.fillText("Score: " + player.playerScore, 40, 70);
	ctx.fillText("Lives: " + player.playerLives, 141, 70);
	ctx.fillText("Difficulty: " + speedMultiplier, 260, 70);
};

// --------------------------- PLAYER --------------------------------

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method
var Player = function(){
	"use strict";
	this.startingX = 200;
	this.startingY = 400;
	this.x = this.startingX;
	this.y = this.startingY;
	this.sprite = 'images/char-boy.png';
	this.playerScore = 0;
	this.playerLives = 3;
};

// Resets the player position to the start position
Player.prototype.characterReset = function(){
	"use strict";
	this.startingX = 200;
	this.startingY = 400;
	this.x = this.startingX;
	this.y = this.startingY;
};

Player.prototype.update = function(){
	// Required method for game
	// Check if playerLives is 0, if so call reset
	"use strict";
	if(this.playerLives === 0){
		reset();
	}

	// Prevent player from moving beyond canvas wall boundaries
	if(this.y > 380){
		this.y = 380;
	}
	if(this.x > 400){
		this.x = 400;
	}
	if(this.x < 0){
		this.x = 0;
	}

	// Check for player reaching top of canvas and winning the game
	if(this.y < 0){
		this.x = 200;
		this.y = 380;
		this.playerScore += 20;
		speedMultiplier += 5;
		this.characterReset();
	}
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys){
	"use strict";
	switch(allowedKeys){
		case 'left':
			// Check for wall otherwise move left
			if(this.x > 0){
				this.x -= 101;
			}
			break;
		case 'right':
			// Check for wall otherwise move right
			if(this.x < 402){
				this.x += 101;
			}
			break;
		case 'up':
			// Check if player reached top of water, if so call success function
			// otherwise move up
			if(this.y < 0){
				this.success();
			}else{
				this.y -= 83;
			}
			break;
		case 'down':
			// Check for bottom otherwise move down
			if(this.y < 400){
				this.y += 83;
			}
			break;
	}
};

// ---------------------------------- RESET -------------------------------

// This is a function to reset all game parameters
var reset = function(){
	player.characterReset();
	speedMultiplier = 40;
	player.playerLives = 3;
	player.playerScore = 0;
}

// -------------------------- INSTANTIATE OBJECTS ----------------------------

// Now instantiate you objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiate player
var player = new Player();

// Empty allEnemies array
var allEnemies = [];

// Instantiate all enemies, set to 3, push to allEnemies array
for(var i = 0; i < 3; i++){
	// startSpeed is a random number from 1-10 times speedMultiplier
	var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
	// Enemys start off canvas (x = -100) at the following Y positios: 60, 145, 230
	allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// --------------------------- EVENT LISTENER ----------------------------------

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});