var earth, earthImg;
var spaceImg, gameOverImg;

var asteroid1, asteroid1Img;
var asteroid2, asteroid2Img;
var asteroid3, asteroid3Img;
var asteroid4, asteroid4Img;
var asteroids1Grp, asteroids2Grp;

var fighterPlane, fighterPlaneImg;

var bgMusic;
var score = 0;

var PLAY      = 1;
var END       = 0;
var gameState = 1;

function preload () { 

  spaceImg        = loadImage("Space.png");
  earthImg        = loadImage("Earth.png");
  gameOverImg     = loadImage("Game Over.png");

  asteroid1Img    = loadImage("Asteroid 1.png");
  asteroid2Img    = loadImage("Asteroid 2.png");
  asteroid3Img    = loadImage("Asteroid 3.png");
  asteroid4Img    = loadImage("Asteroid 4.png");

  fighterPlaneImg = loadImage("Fighter Plane.png");

  bgMusic         = loadSound("Bg Music.mp3");

}

function setup () {

  createCanvas(windowWidth, windowHeight);

  earth = createSprite(1200,200,20,200);
  earth.addImage(earthImg);
  earth.scale = 0.7;

  fighterPlane = createSprite(900,500,20,200);
  fighterPlane.addImage(fighterPlaneImg);
  fighterPlane.scale = 0.9;

  asteroids1Grp = createGroup();
  asteroids2Grp = createGroup(); 

}

function draw () {

  background(spaceImg); 

  //bgMusic.loop();

  if(gameState === PLAY){

  asteroids1();
  asteroids2();

  if (keyDown("RIGHT_ARROW")) {
      fighterPlane.x = fighterPlane.x + 8;
  }

  if (keyDown("LEFT_ARROW")) {
      fighterPlane.x = fighterPlane.x - 8;
  }

  if (keyDown("UP_ARROW")) {
      fighterPlane.y = fighterPlane.y - 8;
  }

  if (keyDown("DOWN_ARROW")) {
      fighterPlane.y = fighterPlane.y + 8;
  }

  if (asteroids1Grp.isTouching(fighterPlane)) {
      asteroids1Grp.destroyEach();
      score = score + 1
  }

  if (asteroids2Grp.isTouching(fighterPlane)) {
      asteroids2Grp.destroyEach();
      score = score + 1
  }



  if(earth.isTouching(asteroids1Grp) || earth.isTouching(asteroids2Grp)) {
     gameState = END;
  }

}

  if(gameState === END){

    earth.destroy();
    fighterPlane.destroy();

    asteroids1Grp.destroyEach(); 
    asteroids2Grp.destroyEach();
  
    asteroids1Grp.setVelocityXEach(0);  
    asteroids2Grp.setVelocityXEach(0);

    background(gameOverImg);

  }

  drawSprites();

  textSize(35);
  stroke("red");
  fill("white");
  text("USE UP AND DOWN KEYS TO MOVE YOUR FIGHTER PLANE", 50, 50);
  
  textSize(40);
  stroke("red");
  strokeWeight("red");
  fill("yellow");
  text("YOUR SCORE : " + score, 50, 620);

}

function asteroids1 () {
  if(World.frameCount % 130 === 0) {
     asteroid = createSprite(05,200,20,200);
     asteroid.scale = 0.4;
     //asteroid.debug = true;
     r = Math.round(random(1,2));
     if (r == 1) {
     asteroid.addImage(asteroid1Img);  
     } else if (r == 2) {
     asteroid.addImage(asteroid2Img);  
     }
     asteroid.y = Math.round(random(10,600));  
     asteroid.velocityX = 11;
     asteroid.Lifetime  = 50;  
     asteroids1Grp.add(asteroid);    
  }
}

function asteroids2 () {
  if(World.frameCount % 130 === 0) {
     asteroids = createSprite(50,500,20,200);
     asteroids.scale = 0.17;
     //asteroids.debug = true;
     r = Math.round(random(1,6));
     if (r == 3) {
     asteroids.addImage(asteroid3Img);  
     } else if (r == 4) {
     asteroids.addImage(asteroid4Img);  
     }
     asteroids.y = Math.round(random(30,450));  
     asteroids.velocityX = 13;
     asteroids.Lifetime  = 50;  
     asteroids2Grp.add(asteroids);    
  }
}