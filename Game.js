(function () {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;
    // frame rate of game
    var frameRate = 26;
    var gameController = new GameController()

    // game objects
    var assetManager;
    var background = null;
    var introCaption = null;
    var gameOverCaption = null;


    // Set the game time
    var gameTime = 0;
    var timerText;

    // Canvas width and height 
    var _width = 600;
    var _height = 600;

    // Mouse position
    var mouseXPosition;
    var mouseYPosition;

    var snakeLiving;

    // Set the position of the target
    var enemyXPos = 100;
    var enemyYPos = 100;

    // Set the speed of the target
    var enemyXSpeed = 1.5;
    var enemyYSpeed = 1.75;

    // Set the score text
    var score = 0;
    var scoreText;

    // ------------------------------------------------------------ event handlers
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onSetup);
        // load the assets
        assetManager.loadAssets(manifest);

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", gameController.onTick);
        createjs.Ticker.addEventListener("tick", gameController.tickEvent); // Call the movement
    }

    function onSetup() {
        console.log(">> setup");
        // kill event listener
        stage.removeEventListener("onAllAssetsLoaded", onSetup);

        // construct game objects
        background = assetManager.getSprite("assets");
        background.gotoAndStop("background");
        stage.addChild(background);

        // Called before the game starts
        introCaption = assetManager.getSprite("assets");
        introCaption.gotoAndStop("introCaption");
        introCaption.x = 50;
        introCaption.y = 50;
        stage.addChild(introCaption);

        // Called when the game is over
        gameOverCaption = assetManager.getSprite("assets");
        gameOverCaption.gotoAndStop("gameOverCaption");
        gameOverCaption.x = 50;
        gameOverCaption.y = 50;

        //Add timer
        timerText = new createjs.Text("Time: " + gameTime.toString(), "26px Arial", "#FFF");
        // get the x and the y position for the time text
        timerText.x = 400;
        timerText.y = 10;

        //Add score
        scoreText = new createjs.Text("Kills: " + score.toString(), "26px Arial", "#FFF");
        scoreText.x = 10;
        scoreText.y = 10;

        gameController.createEnemy();


        background.addEventListener("click", onStartGame);
    }
    
        
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();

        // update the stage!
        stage.update();
    }

    function onStartGame(e) {
        background.removeEventListener("click", onStartGame);
        stage.removeChild(introCaption);
        var gameTimer = setInterval(updateTime, 1000);
        window.onmousedown = gameController.handleMouseDown;
        stage.addChild(timerText);
        stage.addChild(scoreText);

    }

    function updateTime() {
        gameTime += 1;
        if (gameTime > 25) {
            // remove the ghost when the timer is over
            stage.removeChild(snakeLiving);
            // Remove both the timer as well as the score
            stage.removeChild(timerText); // Couldn't figure out Game over function
            stage.removeChild(scoreText); // So used this but will look into game over function to proper end it
            stage.addChild(gameOverCaption); // Calls the game over caption
            console.log("GameOver!");
            clearInterval(gameTime);

        }
        else {
            timerText.text = "Time: " + gameTime
        }
    }
})(); 
