
/* Declare all of your variable */
let enterButton;
let screen2Button;
let screen3Button;
let player;
let walls;
let screen = 0;
let paddle, ball;
let score = 0;

/* PRELOAD LOADS FILES */
function preload() {
//backgroundImg = loadImage("assets/background-image.png");
  catcherImg = loadImage("assets/catcher-image.png");
  fallingObjectImg = loadImage("assets/falling-object.png");
  princess = loadImage("assets/princess.png");
  villain = loadImage("assets/villain.png")
  bg = loadImage("assets/background-Image.png")
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  textSize(12);
  noStroke();
  catcherImg.resize(150, 150);
  fallingObjectImg.resize(40, 0);
  princess.resize(110,130)
  villain.resize(100,100)
  bg.resize(40,0)
  // Set up the home screen 
  background("#89CFF0");
  text("You have been transported into the body\n of the Shark Queen.\nThe only way to return is by\n saving the Shark Kingdom and returning hope. You will have to be brave\n and win.", width / 8, height / 
  2 - 100, (width/8)*6, 100);

  // Create buttons for all screens
  enterButton = new Sprite (width/2, height/2 + 100);
  enterButton.w = 100;
  enterButton.h = 50;
  enterButton.collider = "k";
  enterButton.color = "#f4c2c2";
  enterButton.text = "Enter";

  //I place this button off the canvas
  screen2Button = new Sprite (-100, -100);
  screen2Button.w = 100;
  screen2Button.h = 50;
  screen2Button.collider = "k";
  screen2Button.color = "gold";
  screen2Button.text = "Next";

  //I place this button off the canvas
  screen3Button = new Sprite (-100, -100);
  screen3Button.w = 100;
  screen3Button.h = 50;
  screen3Button.collider = "k";
  screen3Button.color = "gold";
  screen3Button.text = "Next";

  //I am creating all my sprites and having them sit off the canvas, usually by making the x value negative.
  
  //MAZE GAME
  player = new Sprite(princess,-100, -50, 40, 40);
  vill = new Sprite(villain,-100, -50, 40, 40);
  //Create the maze
  walls = new Group();
  walls.color = "black";
  walls.collider = "s";

  //Here I have made the x values negative so they sit off screen, 
  new walls.Sprite(-160, 10, 300, 5);
  new walls.Sprite(-10, height/2, 5, height - 15);  
  new walls.Sprite(-150, 60, 5, 100);
  //for this one I changed the y value
  new walls.Sprite(width/2 + 35, -390, 325, 5);
  new walls.Sprite(-50, 300, 75, 5); 
  new walls.Sprite(-340, 146, 110, 5);
  new walls.Sprite(-340, 250, 110, 5);
  new walls.Sprite(-285, 198, 5, 109);
  new walls.Sprite(-185, 332, 5, 109);
  new walls.Sprite(-190, 197, 185, 5);
  new walls.Sprite(-395, 200, 5, 380);
  

  //PONG GAME
  //Create paddle 
  //I again made the x value negative
  paddle = new Sprite( catcherImg, -200,380,100,20);
  paddle.color = color(95,158,160);
  paddle.rotationLock = true;
  
  //Create ball
  //I again made the x value negative
  ball = new Sprite(fallingObjectImg, -100, 50, 20);
  ball.color = color(0,128,128);
  ball.direction = 'down';
  ball.speed = 5;
  ball.bounciness = 1;
  ball.friction = 0;
  
  //Create walls
  //I did not adjust these since they do not affect the rest of the games.
  walls2 = new Group();
	walls2.w = 10;
	walls2.h = 400;
  walls2.collider = "static";
  walls2.visible = false;

  // left and right walls
	new walls2.Sprite(0, height / 2);
	new walls2.Sprite(width, height / 2);
  
  //top wall
	let wallTop = new walls2.Sprite(width / 2, 0);
	wallTop.rotation = 90;
}

/* DRAW LOOP REPEATS */
function draw() {

  // Check enter button
  if (enterButton.mouse.presses()){
    print ("pressed");
    prepScreen1();
  }

  //Screen 1 has the maze game. I called the function prepScreen1 when the enter button was pressed on screen 0. 
  //In this if statement I can put all my game play.
  if (screen == 1){
    background("#89CFF0");

    if (kb.pressing("left")){
        player.vel.x = -3;
        player.vel.y = 0;
      } else if (kb.pressing("right")){
        player.vel.x = 3;
        player.vel.y = 0;
      } else if (kb.pressing("up")){
        player.vel.y = -3;
      } else if (kb.pressing("down")){
        player.vel.y = 3;
      }else{
        player.vel.x = 0;
        player.vel.y = 0;
    }
  
    // Draw start and end text
    fill(0);
    textSize(20);
    text('Start', 330, 20);
    text('End', 22, 395);
  
    //Player cannot go above maze
    if (player.y < 20) {
      player.y = 20;
    }

    //Here the player wins! We make a button that will take players to screen 2.
    if (player.y >380) {
      fill(0);
      textSize(20);
      text('You Win!', 160, 170);
      player.vel.x = 0;
      player.vel.y = 0;
      screen2Button.pos = {x: 300, y: 300}
    }
    // The game has been won, If the player presses the button they will go to screen   2.
    if (screen2Button.mouse.presses()){
      print ("pressed");
      prepScreen2();
    }
  }

  
  //This is screen 2, its our paddle game.
  //I called the function prepScreen2 when the player reached the end of the maze in screen 1. 
  //In this if statement I can put all of my game play. 
  if (screen == 2){
    background("plum");

    //Move the paddle
    paddle.moveTowards (mouse.x, 380, 1);
    
    //When ball collides with paddle bounce off and increase score
    if (ball.collides(paddle)) {
      ball.speed = 8;
      score = score + 1;
      ball.direction = ball.direction + random(-10,10);
    }
    if (ball.collides(vill)) {
      ball.speed = 8;
      score = score + 100;
      ball.direction = ball.direction + random(-10,10);
     // vill.pos{400,400}
    }
  
    
    //When ball hits ground your score resets to zero.
    if (ball.y > 390) {
      score = 0;
      ball.y = 0;
    }

    //Here our player has won.
    if (score >= 5){
      fill(0);
      textSize(20);
      text('You Win!', 160, 170);
      paddle.collider = "static";
      ball.collider = "static";
      screen3Button.pos = {x: 300, y: 300}
    }
    
    // The game has been won, If the player presses the button they will go to screen   3.
    if (screen3Button.mouse.presses()){
      print ("pressed");
      prepScreen3();
    }  
    //Draw the score
    fill(0, 128, 128);
    textAlign(LEFT);
    textSize(20);
    text('Score = ' + score, 10, 30);  

     // Draw directions to screen
    fill(0);
    textSize(12);
    textAlign("left");
    text("\n\n\n\n\n\n Deflect the fireball\nby moving your\nmouse. You need\nto reach a\nscore of 5.\nIf you miss a fireball,\nyou start over. If you deflect the magic fireball onto the villain you gain 100 points.", width - 100, 20);
  } 

  //This is screen 3, its our end screen.
  //I called the function prepScreen3 when the player reached a score of 10 in our paddle game on screen 2. 
  if (screen == 3){
    background("lightblue");
    fill(0);
    textSize(15);
    text("You Won!\n\n You defeated the evil sea witch \nand returned peace and hope\n back to the Shark Kingdom", width/2-120  , height / 2);
  }
}

/* FUNCTIONS TO DISPLAY SCREENS */

//the prepScreen functions will:
// -change the screen variable
// -remove sprites from previous screen
// -add sprites we want on the screen

function prepScreen1(){
  //set our screen variable
  screen = 1; 
  
  //remove sprites from the previous screen by setting their position off the screen.
  enterButton.pos = {x: -50, y:-50};

  //Move sprites we need for this screen back onto the screen.
  //put in walls and player
  player.pos = {x: 330, y:50};
  vill.pos= {x: 330, y:50};
  walls[0].position.x = 160;
  walls[1].position.x = 10;
  walls[2].position.x = 150;
  walls[3].position.y = 390;
  walls[4].position.x = 50;
  walls[5].position.x = 340;
  walls[6].position.x = 340;
  walls[7].position.x = 285;
  walls[8].position.x = 185;
  walls[9].position.x = 190;
  walls[10].position.x = 395;
}

function prepScreen2(){
  print("Preping Screen 2!");
  //set our screen variable
  screen = 2;
  
 //remove sprites from the previous screen by setting their position off the screen.
  screen2Button.pos = {x: -50, y:-50};
  player.pos = {x: -350, y:50};
  walls[0].position.x = -160;
  walls[1].position.x = -10;
  walls[2].position.x = -150;
  walls[3].position.y = -390;
  walls[4].position.x = -50;
  walls[5].position.x = -340;
  walls[6].position.x = -340;
  walls[7].position.x = -285;
  walls[8].position.x = -185;
  walls[9].position.x = -190;
  walls[10].position.x = -395;
  
  //Move sprites we need for this screen back onto the screen.
  //add paddle and ball
  ball.position.x = 100;
  paddle.pos = {x:200, y:380};
}

function prepScreen3(){
  print("Preping Screen 3!");
  //set our screen variable
  screen = 3;

   //remove sprites from the previous screen by setting their position off the screen
  screen3Button.pos = {x: -50, y:-50};
  ball.position.x = -100;
  paddle.position.x =-100;

  //Move sprites we need for this screen back onto the screen.
}