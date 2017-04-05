class GameController {

	createEnemy() {
		snakeLiving = assetManager.getSprite("assets");
		snakeLiving.regX = 50;
		snakeLiving.regY = 50;
		snakeLiving.x = enemyXPos;
		snakeLiving.y = enemyYPos;
		snakeLiving.gotoAndPlay("snakeAlive");
		stage.addChild(snakeLiving);
		console.log("loading");
	}

	handleMouseDown(event) {
		//Increasing speed of the enemy
		enemyXSpeed *= 1.05;
		enemyYSpeed *= 1.06;

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
			enemyYSpeed *= 1.25;
			enemyXSpeed *= 1.3;

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

	tickEvent() {
		// X AXIS OPERATIONS:

		// Guarantee that the enemy is within the game boundaries
		if (enemyXPos < _width && enemyXPos > 0) {
			// Move the enemy by its speed
			enemyXPos += enemyXSpeed;

		} else {
			// Invert the direction in which the enemy moves
			enemyXSpeed = enemyXSpeed * (-1);
			// Move the enemy by its speed
			enemyXPos += enemyXSpeed;

		}

		// Y AXIS OPERATIONS:

		// Guarantee that the enemy is within the game boundaries
		if (enemyYPos < _height && enemyYPos > 0) {
			// Move the enemy by its speed
			enemyYPos += enemyYSpeed;
		} else {
			// Invert the direction in which the enemy moves
			enemyYSpeed = enemyYSpeed * (-1);
			// Move the enemy by its speed
			enemyYPos += enemyYSpeed;
		}
		// Move the sprite according to the enemy
		snakeLiving.x = enemyXPos;
		snakeLiving.y = enemyYPos;

	}
}