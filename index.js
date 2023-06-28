//--------------------------------- VARIABLES ------------------------------------------
//Value of the edges for circle
let minimumWidth = 0; //minimum would be 0. we are considering 10 radious of the circle.
let maximumWidth = 600; //maximum would be 600. we are considering 10 radious of the circle.
let minimumHeight = 0;
let maximumHeight = 400;


//left racket
let leftRacketX = 0;
let leftRacketY = 165;
let leftRacketWeigth = 10;
let leftRacketHeigth = 70
//rigth racket
let rigthRacketX = 590; 
let rigthRacketY = 165;
let rigthRacketWeigth = 10;
let rigthRacketHeigth = 70
//rigth racket single
let rigthRacketSingleX = 590; 
let rigthRacketSingleY = 165;
let rigthRacketSingleWeigth = 10;
let rigthRacketSingleHeigth = 70
let ruffle;
let hit = true;
let rigthRacketVelocity = 0;
let rigthRacketSingleVelocity = 0;


//Circle
let circleX = 300;
let circleY = 200;
let diameterCircle = 20;
let radious = 10;
//Velocity of the circle
let circleVelocityX = 5;
let circleVelocityY = 5;
let timerVelocity = 30;


//Scoreboard
let leftRacketPoints = 10;
let rigthRacketPoints = 10;
let font;
let timerPointsLeft = 2;
let canScoreLeft = true;
let timerPointsRigth = 2;
let canScoreRigth = true;


//Sounds
let racketSound;
let pointSound;
let music;
let victory;
let silenceSound;


//HomeScreen
let backgroundHomeScreen;
let textX = 178
let textY = 75
let addY = 0.2;
let button;
let cnv;
let homeCircleDiameter = 28;
let homeCircleX = 300;
let homeCircleY = 327;
let homeCircleRadious = homeCircleDiameter/2;
let addDiameter = -0.2;
let circleClick;

//Game Screen
let timer = 3;

//Changing Screen
let currentPage = 1;
let numberOfPages = 3;


//Game Commands
let gameIsRunning = true;

//Game not getting stuck behind racket for too long
let condition = 1;
let list1 = [];
let list2 = [];
//--------------------------------- SETUP ------------------------------------------

function preload() {
  backgroundHomeScreen = loadImage('background-home.jpg')
  font = loadFont('Orbitron.ttf')
  music = loadSound("music.mp3");
  racketSound = loadSound("racket.mp3");
  pointSound = loadSound("point.mp3");
  victorySound = loadSound('victory.mp3');
  silenceSound = loadSound('silence.mp3')
}

function setup() {
  cnv = createCanvas(600,400);
  music.loop();
}

//--------------------------------- HOME SCREEN -----------------------------------------

function playMusic() {
  silenceSound.play();
}

function Title(x,y) {
  textFont(font);  
  textSize(15);
  fill('white');
  noStroke();
  text('Choose a mode to start playing',x,y);
  if(y >= 75){
    addY *= -1;
  }
  if(y <= 60){
    addY *= -1;
  }
  textY += addY;
}

function growCircle() {
  noFill();
  stroke('white');
  circle(homeCircleX,homeCircleY,homeCircleDiameter);
    if(homeCircleDiameter <= 28){
      addDiameter *= -1;
    }
    if(homeCircleDiameter >= 35){
      addDiameter *= -1;
    }
    homeCircleDiameter += addDiameter;
}

function singleplayerButton() {
  //first button
  fill('white');
  rect(225,135,150,50);  
  textSize(15);
  fill('black');
  text('Single Player',245,165);
  if (mouseIsPressed) {
    if (insideSingleplayerButton()) {
        currentPage = 2;
      } 
    }
  }

function insideSingleplayerButton() {
  if(mouseX >= 225 && mouseX <= 375 && mouseY >= 135 && mouseY <= 185) {
    return true;
  } else {
    return false;
  }
}

function multiplayerButton() {
  // second button
  fill('white');
  rect(225,215,150,50);  
  textSize(15);
  fill('black');
  text('Multiplayer',255,245);
  if (mouseIsPressed) {
    if (insideMultiplayerButton()) {
        currentPage = 3;
      } 
    }
  }

function insideMultiplayerButton() {
  if(mouseX >= 225 && mouseX <= 375 && mouseY >= 215 && mouseY <= 265) {
    return true;
  } else {
    return false;
  }
}

function touchingEdges() {  // makes the ball stay inside the canvas
 if(circleX <= minimumWidth + radious || circleX >= maximumWidth - radious){
   circleVelocityX *= -1;
 } 
 if(circleY <= minimumHeight + radious || circleY >= maximumHeight - radious){
   circleVelocityY*= -1;
 }
}

function drawCircleHomeScreen() {
  noStroke();
  squareColor = color('white');
  squareColor.setAlpha(50);
  fill(squareColor);
  circle(circleX,circleY,diameterCircle);
  touchingEdges();
  circleX += circleVelocityX;
  circleY+= circleVelocityY;
} 

//--------------------------------- PLAY MODES ------------------------------------------

  function circleNotStuckTooLong() { //doesn't let the ball get stuck in the racket for too long
  
    if(condition == 1) {
      list1.push(circleX);
      condition++
    } else if (condition == 2) {
      list2.push(circleX);
      condition--;     
    }  
    if(list1.length == 2 && list2.length == 2) {
      if(list1[0] == list1[1] && list2[0] == list2[1] && circleX > 300  && currentPage == 3){
        console.log('passei aqui1')        
        circleX = rigthRacketX - 25;
        circleVelocityX *= -1;           
      } else if(list1[0] == list1[1] && list2[0] == list2[1] && circleX > 300 && currentPage == 2){
        console.log('passei aqui2')        
        circleX = rigthRacketSingleX - 25;
        circleVelocityX *= -1;   
      } else if (list1[0] == list1[1] && list2[0] == list2[1] && circleX < 300) {
        console.log('passei aqui3')
        circleX = leftRacketX + 25;
        circleVelocityX *= -1;
        }
        list1 = [];
        list2 = [];
      }
    }

  function timerStartGame() { 
    if (timer == 0) {
      textSize(0);
      return false;
    }
    textAlign(CENTER,CENTER);
    textFont(font);
    textSize(100);
    stroke('black')
    fill('white');
    text(timer, width/2, height/2);

    if (frameCount % 60 == 0 && timer > 0) { 
      timer --;
    }
    if (timer > 0) {
      circleX = 300;
      circleY = 200;
    }
  }

  function timerToGainVelocity() { //ball gets plus 1 velocity every 30 seconds
    if (timerVelocity == 0) {
      if(circleVelocityX < 0) {
        circleVelocityX--;
      } else {
        circleVelocityX++;
      }
      if(circleVelocityY < 0) {
        circleVelocityY--;
      } else {
        circleVelocityY++;
      }
      timerVelocity = 30;
    }   
    if (frameCount % 60 == 0 && timerVelocity > 0) { 
      timerVelocity--;
    }
  }    

  function touchingEdges() {  // makes the ball stay inside the canvas
   if(circleX <= 10) {
     circleVelocityX *= -1;
   } 
    if(circleX >= 590) {
      circleVelocityX *= -1;      
    }
   if(circleY <= minimumHeight + radious || circleY >= maximumHeight - radious){
     circleVelocityY*= -1;
   }
  }

  function leftRacketMove() { 
    if (keyIsDown(87)) {
      leftRacketY -= 5;
    } 
    if (keyIsDown(83)) {
      leftRacketY += 5;
    }
  }

  function circleNotStuckLeft() { //ball doesn`t get stuck behind racket
    if(circleX < 10) {    
      // circleY = leftRacketY + 35;
      circleX = leftRacketX + 25;
      circleVelocityX *= -1;
    }
  }

  function restartGame() {
    if(rigthRacketPoints == 10 && leftRacketPoints == 10) {
      timer = 3;
      timerStartGame();
      circleX = 300;
      circleY = 200;       
    } else {
      return false;
    }
  }

  function resetVariables() { //reset some variables to restart the game
      timer = 3;
      timerStartGame();
      circleVelocityX = 5;
      circleVelocityY = 5;
      timerVelocity = 30;          
      rigthRacketPoints = 10;
      leftRacketPoints = 10;
      leftRacketX = 0;
      leftRacketY = 165;
      rigthRacketX = 590;
      rigthRacketY = 165;
      rigthRacketSingleX = 590; 
      rigthRacketSingleY = 165;      
      circleX = 300;
      circleY = 200;  
  }

  function keyTyped() { //pause game function
    if (key == 'p' && gameIsRunning == true) {
      noLoop(draw);
      music.stop();
      gameIsRunning = false;
    } else if (key == 'p' && gameIsRunning == false) {
      loop(draw);
      music.play();
      gameIsRunning = true;
    }
    if (key == 'r') {
      loop(draw);
      music.stop();
      music.play();
      gameIsRunning = true;      
      resetVariables();  
    }
    if (key == 'c') {
      silenceSound.play();
    }
  }

  function timerCanScoreLeft() { //you can just score again every 2 seconds. It avoids miss counting.
    if (frameCount % 60 == 0 && timerPointsLeft > 0) {       
      timerPointsLeft--;
    }
     // textFont(font);
     // textSize(20);
     // noStroke();
     // fill('white');
     // text(timerPointsLeft,20,10);
    
    if (timerPointsLeft > 0) {
      canScoreLeft = false;
    } 
    if (timerPointsLeft == 0) {
      canScoreLeft = true;   
    }    
  }

  function timerCanScoreRigth() { //you can just score again every 2 seconds. It avoids miss counting.
    if (frameCount % 60 == 0 && timerPointsRigth > 0) {         
      timerPointsRigth--;
    }
     // textFont(font);
     // textSize(20);
     // noStroke();
     // fill('white');
     // text(timerPointsRigth,580,10);
    
    if (timerPointsRigth > 0) {
      canScoreRigth = false;
    } 
    if (timerPointsRigth == 0) {
      canScoreRigth = true;   
    }    
  }  

  function scoreLeft() { 
    timerCanScoreLeft();      
    leftRacketPoints--;
    canScoreLeft = false;      
    pointSound.play();    
  }

  function scoreRigth() {
    timerCanScoreRigth();      
    rigthRacketPoints--;
    canScoreRigth = false;      
    pointSound.play();    
  }

  function points() { // points counter analizing if can score or not
    if(circleX <= 10 && circleX >= 4) {
      if(canScoreLeft == false) {
        return false;
      } else {
        timerPointsLeft = 2;
      }
      scoreLeft();
    }
    if(circleX >= 590 && circleX <= 596) {
      if(canScoreRigth == false) {
          return false;
      } else {
          timerPointsRigth = 2;
      }            
      scoreRigth();
    }   
    if(currentPage == 2) {
      scoreboardSingle();
      loseOrWinSingle();
    } else if (currentPage == 3) {
      scoreboardMultiplayer();
      loseOrWinMultiplayer();      
    }

  }  
//--------------------------------- MULTIPLAYER -----------------------------------------

  function drawCircleMultiplayer() { //ball from multiplayer
    fill('white'); 
    circle(circleX,circleY,diameterCircle);
    circleNotStuckMultiplayer();
    circleTouchingObjectsMultiplayer();
    circlePlusVelocityMultiplayer();
  }

  function circlePlusVelocityMultiplayer() { //velocity from the ball
    circleX += circleVelocityX;
    circleY+= circleVelocityY;    
  }

  function circleTouchingObjectsMultiplayer() { //information if the ball is touching some objects or not
    touchingEdges();
    touchingRectsMultiplayer();    
  }

  function circleNotStuckMultiplayer() { //doesn't let the ball get stuck on the racket
    circleNotStuckTooLong();
    circleNotStuckLeft();   
    circleNotStuckRigthMultiplayer();      
  }

  function circleNotStuckRigthMultiplayer() { //doesn't let the ball get stuck on the racket
    if(circleX > 590) {
      // circleY = rigthRacketY + 35;
      circleX = rigthRacketX - 22;
      circleVelocityX *= -1;         
    }
  }

  function touchingRectsMultiplayer() { // makes the racket to bounce off the ball
    if(circleY >= leftRacketY && circleY <= leftRacketY + leftRacketHeigth && circleX <= 22) { //25
      circleVelocityX *= -1;
      racketSound.play();
    }
      if(circleY >= rigthRacketY && circleY <= rigthRacketY + rigthRacketHeigth && circleX >= 580) {
      circleVelocityX *= -1;  
      racketSound.play();
    }
  }

  function leftRacketDrawMultiplayer(x,y) { //left racket draw
    //Left Racket
    fill('white');
    rect(x,y,rigthRacketWeigth,rigthRacketHeigth);
    leftRacketMove();
    if(leftRacketY <= 0) { //doesn't let racket leave the canvas
      leftRacketY = 0;
    }
    if (leftRacketY >= 335) {
      leftRacketY = 335;
    } 
  }

  function rigthRacketDrawMultiplayer(x,y) { //rigth racket draw
    fill('white');
    rect(x,y,rigthRacketWeigth,rigthRacketHeigth);    
    rigthRacketMove();
    if(rigthRacketY <= 0) { //doesn't let racket leave the canvas
      rigthRacketY = 0;
    }
    if (rigthRacketY >= 335) {
      rigthRacketY = 335;
    }     
  }

  function rigthRacketMove() { //moviment from racket using keys from keyboard
    if (keyIsDown(UP_ARROW)) {
      rigthRacketY -= 5;
    } 
    if (keyIsDown(DOWN_ARROW)) {
      rigthRacketY += 5;
    }
  }

  function drawRacketsMultiplayer(x,y) { //draw both rackets
  //Left Racket
    leftRacketDrawMultiplayer(x,y);
  //Rigth racket
    rigthRacketDrawMultiplayer(x,y);
  }

  function scoreboardMultiplayer() {
    fill('white');
    textSize(15);      
    text('p1 life points:',153, 10);
    text('p2 life points:',453,10);     
    textSize(32);    
    text(leftRacketPoints, 150, 35);
    text(rigthRacketPoints, 450, 35);    
  }

  function player1WinnerMessage() {
    fill('white');
    textSize(30);
    music.stop()      
    victorySound.play();      
    text('player 1 is the winner!',300,200);
    textSize(15);      
    text('press R to restart',300,230);      
    noLoop(draw);
    circleVelocityX = 5;
    circleVelocityY = 5;
    timerVelocity = 30;          
    rigthRacketPoints = 10;
    leftRacketPoints = 10;       
    gameIsRunning = false;    
  }

  function player2WinnerMessage() {
      fill('white');
      textSize(30);
      music.stop()
      victorySound.play();
      text('player 2 is the winner!',300,200);
      textSize(15);      
      text('press R to restart',300,230);      
      noLoop(draw);
      circleVelocityX = 5;
      circleVelocityY = 5;
      timerVelocity = 30;      
      rigthRacketPoints = 10;
      leftRacketPoints = 10;       
      gameIsRunning = false;
  }

  function loseOrWinMultiplayer(){ //condition to check if there is a winner or not yet. If there is it shows a message.
    if (leftRacketPoints == 0 && gameIsRunning == true) {
      player1WinnerMessage();
    } else if (rigthRacketPoints == 0 && gameIsRunning == true) {
      player2WinnerMessage();
    }
  }

//--------------------------------- AGAINST MACHINE -------------------------------------

  function circleNotStuckSingleRigth() { //ball doesn't get stuck on racket
    if(circleX > 590) {
      // circleY = rigthRacketSingleY + 35;
      circleX = rigthRacketSingleX - 22;
      circleVelocityX *= -1;       
    }
  }

  function circleNotStuckSingle() { //ball doesn't get stuck behind rackets
    circleNotStuckTooLong();
    circleNotStuckSingleRigth();
    circleNotStuckLeft();    
  }

  function circleTouchingObjectsSingle() { //reaction of the ball touching objects
    touchingEdges();
    touchingRectsSingle();    
  }

  function circlePlusVelocitySingle() { //velocity of the ball
    circleX += circleVelocityX;
    circleY+= circleVelocityY;    
  }

  function drawCircleSingle() { //create ball
    fill('white');
    circle(circleX,circleY,diameterCircle);
    circleNotStuckSingle()
    circleTouchingObjectsSingle();
    circlePlusVelocitySingle();
  }

  function touchingRectsSingle() { // makes the racket to bounce off the ball
    if(circleY >= leftRacketY && circleY <= leftRacketY + leftRacketHeigth && circleX <= 22) {
      circleVelocityX *= -1;
      racketSound.play();
    }
      if(circleY >= rigthRacketSingleY && circleY <= rigthRacketSingleY + rigthRacketSingleHeigth && circleX >= 580) {
      circleVelocityX *= -1;  
      racketSound.play();        
    }
  }

  function drawLeftRacketSingle(x,y) { // draw the left racket from single player mode
  //Left Racket
    rect(x,y,rigthRacketSingleWeigth,rigthRacketSingleHeigth);    
    leftRacketMove();
    if(leftRacketY <= 0) { //doesn't let racket leave the canvas
      leftRacketY = 0;
    }
    if (leftRacketY >= 335) {
      leftRacketY = 335;
    }     
  }

  function drawRigthRacketSingle(x,y) {   // draw the right racket from single player mode
    rect(x,y,rigthRacketSingleWeigth,rigthRacketSingleHeigth);
    if(hit == true){
      rigthRacketSingleY = circleY - rigthRacketSingleVelocity;   
      if(rigthRacketSingleVelocity > 35) {
        rigthRacketSingleVelocity--;
      }
      if(rigthRacketSingleVelocity == 35) {  //follows Y of the ball 
        rigthRacketSingleVelocity = 35;
      } 
      if(rigthRacketSingleVelocity < 35) {
        rigthRacketSingleVelocity++;      
      }
    } else {
      rigthRacketSingleY = circleY - rigthRacketSingleVelocity;
        if(rigthRacketSingleVelocity < 85) {
          rigthRacketSingleVelocity++;
        }
        if(rigthRacketSingleVelocity == 85) {
          rigthRacketSingleVelocity = 85;
        }
      }
      if(rigthRacketSingleY <= 0) { //doesn't let racket leave the canvas
      rigthRacketSingleY = 0;
    }
    if (rigthRacketSingleY >= 335) {
      rigthRacketSingleY = 335;
    }
    if(rigthRacketSingleY <= 0) { //doesn't let racket leave the canvas
      rigthRacketSingleY = 0;
    }
    if (rigthRacketSingleY >= 335) {
      rigthRacketSingleY = 335;
    }
  }

  function drawRacketsSingleplayer(x,y) { //draw both rackets from singleplayer mode
    //Right Racket
    drawRigthRacketSingle(x,y);
    //Left Racket    
    drawLeftRacketSingle(x,y);  
  }

  function iWinMessage() {  //my victory's message
    fill('white');
    textSize(30);
    music.stop()      
    victorySound.play();
    text('You are the winner!',300,200);
    textSize(15);      
    text('press R to restart',300,230);      
    noLoop(draw);
    rigthRacketPoints = 10;
    leftRacketPoints = 10;       
    gameIsRunning = false;
  }

  function computerWinsMessage() { //computer victory's message
    fill('white');
    textSize(30);
    music.stop()      
    victorySound.play();      
    text('Computer is the winner!',300,200);
    textSize(15);      
    text('press R to restart',300,230);      
    noLoop(draw);
    rigthRacketPoints = 10;
    leftRacketPoints = 10;       
    gameIsRunning = false;    
  }

  function loseOrWinSingle(){ //checks if someone already won. If yes, shows a message.
    if (leftRacketPoints == 0 && gameIsRunning == true) {
      computerWinsMessage();
    } else if (rigthRacketPoints == 0 && gameIsRunning == true) {
      iWinMessage();
    }
  }

  function scoreboardSingle() {
    fill('white');
    textSize(15);      
    text('my life points:',152, 10);
    text('computer`s life points:',458,10);     
    textSize(32);    
    text(leftRacketPoints, 150, 35);
    text(rigthRacketPoints, 450, 35);
  }

  function hitOrMissSingle() {  //Makes computer's racket hit or miss. 60% chances of hit.
    ruffle = Math.round(Math.random()*100);
    if(ruffle <= 60) {
      hit = true;
    } else {
      hit = false;
    }
    return hit;
  }

  setInterval(hitOrMissSingle,1000); // set interval of the hit or miss ruffle. Every 1 second it does the ruffle again.

//------------------------------------- RUNING GAME -------------------------------------


function draw() {
  
    switch (currentPage) {
    case 1:
      background(backgroundHomeScreen);        
      drawCircleHomeScreen();   
      Title(textX,textY);
      singleplayerButton();
      multiplayerButton();
      growCircle();        
      break;

    case 2: // singleplayer
      background(0); 
      drawCircleSingle();
      drawRacketsSingleplayer(leftRacketX,leftRacketY);
      drawRacketsSingleplayer(rigthRacketSingleX,rigthRacketSingleY);     
      points();
      timerStartGame();
      timerToGainVelocity();
      timerCanScoreLeft();
      timerCanScoreRigth();
      // console.log(circleX);
      break;     
    
    case 3: // multiplayer
      background(0);    
      drawCircleMultiplayer();
      drawRacketsMultiplayer(leftRacketX,leftRacketY);
      drawRacketsMultiplayer(rigthRacketX,rigthRacketY);         
      points();
      timerStartGame(); 
      timerToGainVelocity();
      timerCanScoreLeft();
      timerCanScoreRigth();              
      break;
  }
}