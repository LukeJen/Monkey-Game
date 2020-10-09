
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var ground,invisibleGround
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(1000,600)  
 
  
  monkey = createSprite(50,445,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,450,10000,20);
  ground.depth = monkey.depth -1;
  ground.velocityX = -1;
 
  invisibleGround = createSprite(200,460,400,10);
  invisibleGround.visible = false;
  
  
  
  
  
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}


function draw() {
 background("green")
  
  
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
  
  monkey.collide(invisibleGround);
  
  spawnObstacles();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:" + survivalTime,100,50)
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -14;
       
    
    }
  
  survivalTime = 0;
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if(obstaclesGroup.isTouching(monkey)){
    
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
    
  }
  
  spawnBanana();
  
  drawSprites();
}
function spawnObstacles(){
 
 if (frameCount % 300 === 0){
   var obstacle = createSprite(400,435,10,40);
   
   obstacle.velocityX = -4;           
   obstacle.scale = 0.5;
   obstacle.lifetime = 300;
   obstacle.addImage(obstacleImage)
   obstacle.scale = 0.2;
  
   obstaclesGroup.add(obstacle)
 }
}
function spawnBanana(){
if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth -1;
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
 } 
}




