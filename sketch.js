var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudImage;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;

var score = 0;

var cloudGroup, obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, gameOver_Img;
var restart, restart_Img;

var jumpSound, dieSound, checkSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOver_Img = loadImage("gameOver.png");
  restart_Img = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkSound = loadSound("checkpoint.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;

  gameOver = createSprite(300, 100);
  gameOver.addAnimation("over", gameOver_Img);
  gameOver.scale = 0.3;

  restart = createSprite(300, 130);
  restart.addAnimation("restart", restart_Img);
  restart.scale = 0.4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(90,100))
  console.log(rand)

  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  trex.setCollider("rectangle", 0, 0, width - 50, trex.height);
  trex.debug = true;
}

function draw() {
  //set background color
  background("white");
  text("gamestate : " +gameState, 500, 30);
  text("Score : " +score, 500, 50);
  score = score + Math.round(frameCount/60);
  //console.log(trex.y)
  if (score >= 0 && score % 100 == 0){
checkSound.play();
  }

if (gameState == PLAY) {

gameOver.visible = false;
restart.visible = false;

ground.velocityX = -(8 + 3*score/100);

if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -10;
  jumpSound.play();
}

trex.velocityY = trex.velocityY + 0.8

if (ground.x < 0){
  ground.x = ground.width/2;
}

if (obstacleGroup.isTouching(trex)) {
  //gameState = END;
  trex.y = -5;
  dieSound.play();
}

spawnClouds();
spawnObstacles();

} 
else if (gameState == END) {
  ground.velocityX = 0;
//trex.y = 0;
gameOver.visible = true;
restart.visible = true;

cloudGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);

cloudGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
trex.changeAnimation("collided");
}

  //Spawn Clouds
 
  trex.collide(invisibleGround);

  drawSprites();
}

//function to spawn the clouds



function spawnClouds(){
  if (frameCount % 60==0) {
 // write your code here 
 var cloud = createSprite(600, 100, 60, 10);
 cloud.addImage("cloud", cloudImage);
 cloud.y = Math.round(random(60, 100));
 cloud.scale = 0.7;
 cloud.velocityX = -2; 

 cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
console.log("cloud depth : " +cloud.depth);
console.log("trex depth : " +trex.depth);

cloud.lifetime = 280;

cloudGroup.add(cloud);
  }

}
  function spawnObstacles() {
if (frameCount % 50==0){
  obstacles = createSprite(600, 159, 40, 10);
  obstacles.velocityX = -(8 + 3*score/100);
  var rand = Math.round(random (1,6));
  
  switch(rand){
    case 1: obstacles.addImage(obstacle1);
    break;

    case 2: obstacles.addImage(obstacle2);
    break;

    case 3: obstacles.addImage(obstacle3);
    break;

    case 4: obstacles.addImage(obstacle4);
    break;

    case 5: obstacles.addImage(obstacle5);
    break;

    case 6: obstacles.addImage(obstacle6);
    break;
  }
  obstacles.scale = 0.6;
  obstacles.lifetime = 100;

  obstacleGroup.add(obstacles);
}


  }



