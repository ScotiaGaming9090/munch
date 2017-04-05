function GameController() { 
	console.log(this);
  // Set the position of the target
  this.enemyXPos = 100;
  this.enemyYPos = 100;

  // Set the speed of the target
  this.enemyXSpeed = 1.5;
  this.enemyYSpeed = 1.75;

  // This should be set either as constants in Game and passed, or refactored
  // so all the code can be here.
  this.canvasWidth  = 600;
  this.canvasHeight = 600;
};

GameController.prototype.createEnemy = function() {
	var snakeLiving = assetManager.getSprite("assets");
	console.log(snakeLiving);
	snakeLiving.regX = 50;
	snakeLiving.regY = 50;
	snakeLiving.x = this.enemyXPos;
	snakeLiving.y = this.enemyYPos;
	snakeLiving.gotoAndPlay("snakeAlive");
	stage.addChild(snakeLiving);
	console.log("loading");
}

GameController.prototype.handleMouseDown = function(event) {
	//Increasing speed of the enemy
	// These should be constants or config vars somewhere else.
	// Hard-coding here is a bad idea for your sanity. :D
	this.this.enemyXSpeed *= 1.05;
	this.enemyYSpeed *= 1.06;

	//Obtain shot position
	var shotX = Math.round(event.clientX);
	var shotY = Math.round(event.clientY);
	var spriteX = Math.round(snakeLiving.x);
	var spriteY = Math.round(snakeLiving.y);

	//Compute X and Y distance using the absolute value
	var distX = Math.abs(shotX - spriteX);
	var distY = Math.abs(shotY - spriteY);

	//If you hit the body or head then its a hit but the wings is a miss.
	if (distX < 30 && distY < 55) {
		//If the snake is hit, remove the sprite 
		stage.removeChild(snakeLiving);
		// Add 50 Points for the kill
		score += 50;
		console.log("Hit!");
		// Update the score text
		scoreText.text = "Kills: " + score.toString();

		// Increase speed
		this.enemyYSpeed *= 1.25;
		this.enemyXSpeed *= 1.3;

		// Create a new enemy
		var timeToCreate = Math.floor((Math.random() * 3500) + 1);
		setTimeout(createEnemy, timeToCreate);

	} else {
		// Miss

		// Decrease the score by 10
		score -= 10;
		console.log("You Missed!");
		// Update score text
		scoreText.text = "Kills: " + score.toString();
	}
}

GameController.prototype.tickEvent = function() {
	// X AXIS OPERATIONS:

	// Guarantee that the enemy is within the game boundaries
	if (this.enemyXPos < this.canvasWidth && this.enemyXPos > 0) {
		// Move the enemy by its speed
		this.enemyXPos += this.enemyXSpeed;

	} else {
		// Invert the direction in which the enemy moves
		this.enemyXSpeed = this.enemyXSpeed * (-1);
		// Move the enemy by its speed
		this.enemyXPos += this.enemyXSpeed;

	}

	// Y AXIS OPERATIONS:

	// Guarantee that the enemy is within the game boundaries
	if (this.enemyYPos < this.canvasHeight && this.enemyYPos > 0) {
		// Move the enemy by its speed
		this.enemyYPos += this.enemyYSpeed;
	} else {
		// Invert the direction in which the enemy moves
		this.enemyYSpeed = this.enemyYSpeed * (-1);
		// Move the enemy by its speed
		this.enemyYPos += this.enemyYSpeed;
	}
	// Move the sprite according to the enemy
	snakeLiving.x = this.enemyXPos;
	snakeLiving.y = this.enemyYPos;

}

GameController.prototype.onTick = function(stage, e) {
    // TESTING FPS
    document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

    // update the stage!
    stage.update();
}