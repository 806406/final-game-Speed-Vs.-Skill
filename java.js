var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");

let snakeHealthValue = 100;
let gorillaHealthValue = 100;

var gorillaKills = 0;
var snakeKills = 0;

var snakeHead = { x: (canvas.width - 150), y: (canvas.height - 150)};
var snakeBody = [{x: snakeHead.x, y: snakeHead.y}]
var gorillaBody = { x: 150, y: (canvas.height - 150)};

var gorillaRight = false

var gorillaLeft = false

var alreadyPickedLevel = false;
var randomModeActive = false;
var currentLevel = "0";
var inGame = false; 
var paused = false;

var isJumping = false
var velocityY = 0;
var gravity = 0.5; // Adjust for jump height/speed
var jumpStrength = -10; // negative value for upward movement
var groundLevel = 530; // where the ground starts. if a sprite's y level is greater or equal to this, dont let it fall further down!

// constantly updates to your mouse position
var moveMouseX = 0;
var moveMouseY = 0;

// pause menu button sizes
const unpauseBoxY = 250;
const menuBoxY = 400;
const boxWidth = 200;
const boxHeight = 50;

// attack cooldowns (will check if the attack's variable is true before allowing to attack)
var canSnakeBite = true;
var canDrawSnakeAttackSphere = false;

var level1img = new Image();
var level1imgx = ((canvas.width / 2) - 300);
var level1imgy = 160;
level1img.width = 210;
level1img.height = 90;
level1img.src = 'images/backgrounds/green land background level.png';

var level2img = new Image();
var level2imgx = ((canvas.width / 2) + 105);
var level2imgy = 160;
level2img.width = 210;
level2img.height = 90;
level2img.src = 'images/backgrounds/desertlevel.png';

var level3img = new Image();
var level3imgx = ((canvas.width / 2) - 300);
var level3imgy = 320;
level3img.width = 210;
level3img.height = 90;
level3img.src = 'images/backgrounds/cloud.png';

var level4img = new Image();
var level4imgx = ((canvas.width / 2) + 105);
var level4imgy = 320;
level4img.width = 210;
level4img.height = 90;
level4img.src = 'images/backgrounds/cave level.png';

var randomimg = new Image();
var randomimgx = ((canvas.width / 2) - 105);
var randomimgy = 460;
randomimg.width = 210;
randomimg.height = 90;
randomimg.src = 'images/backgrounds/random.png';

var levelSelectImgLeft = new Image();
levelSelectImgLeft.src = 'images/backgrounds/levelselectLeft10.png';
var levelSelectImgRight = new Image();
levelSelectImgRight.src = 'images/backgrounds/levelselectRight10.png';

var snakeHeadIMG = new Image();
snakeHeadIMG.src = 'images/sprites/snakehead.png';
var snakeHeadIMGRight = new Image();
snakeHeadIMGRight.src = 'images/sprites/snakeheadright.png';

canvas.width = 0
canvas.height = 0

function startButtonAnimation() {
  var title = document.getElementById("title");
  var overview = document.getElementById("overview");
  var overview2 = document.getElementById("overview2");
  var startButton = document.getElementById("StartGameButton");

  canvas.style.border = '5px solid lightgreen';

  setTimeout(() => {
    title.style.fontSize = "95%";
    overview.style.fontSize = "95%";
    overview2.style.fontSize = "95%";
    startButton.style.fontSize = "95%";
    canvas.width = 14;
    canvas.height = 6;
  }, 50);
  setTimeout(() => {
    title.style.fontSize = "90%";
    overview.style.fontSize = "90%";
    overview2.style.fontSize = "90%";
    startButton.style.fontSize = "90%";
    canvas.width = 70;
    canvas.height = 30;
  }, 100);
  setTimeout(() => {
    title.style.fontSize = "85%";
    overview.style.fontSize = "85%";
    overview2.style.fontSize = "85%";
    canvas.width = 140;
    canvas.height = 60;
    startButton.style.fontSize = "85%";
  }, 150);
  setTimeout(() => {
    title.style.fontSize = "80%";
    overview.style.fontSize = "80%";
    overview2.style.fontSize = "80%";
    startButton.style.fontSize = "80%";
    canvas.width = 210;
    canvas.height = 90;
  }, 200);
  setTimeout(() => {
    title.style.fontSize = "75%";
    overview.style.fontSize = "75%";
    overview2.style.fontSize = "75%";
    startButton.style.fontSize = "75%";
    canvas.width = 280;
    canvas.height = 120;
  }, 250);
  setTimeout(() => {
    title.style.fontSize = "70%";
    overview.style.fontSize = "70%";
    overview2.style.fontSize = "70%";
    startButton.style.fontSize = "70%";
    canvas.width = 350;
    canvas.height = 150;
  }, 300);
  setTimeout(() => {
    title.style.fontSize = "60%";
    overview.style.fontSize = "60%";
    overview2.style.fontSize = "60%";
    startButton.style.fontSize = "60%";
    canvas.width = 560;
    canvas.height = 240;
  }, 350);
  setTimeout(() => {
    title.style.fontSize = "50%";
    overview.style.fontSize = "50%";
    overview2.style.fontSize = "45%";
    startButton.style.fontSize = "45%";
    canvas.width = 700;
    canvas.height = 300;
  }, 400);
  setTimeout(() => {
    title.style.fontSize = "40%";
    overview.style.fontSize = "40%";
    overview2.style.fontSize = "25%";
    startButton.style.fontSize = "25%";
    canvas.width = 840;
    canvas.height = 360;
  }, 450);
  setTimeout(() => {
    title.style.fontSize = "30%";
    overview.style.fontSize = "30%";
    overview2.style.fontSize = "10%";
    startButton.style.fontSize = "10%";
    canvas.width = 980;
    canvas.height = 420;
  }, 500);
  setTimeout(() => {
    title.style.fontSize = "20%";
    overview.style.fontSize = "40%";
    overview2.style.fontSize = "40%";
    startButton.style.fontSize = "5%";
    canvas.width = 1260;
    canvas.height = 540;
  }, 550);
  setTimeout(() => {
    title.style.fontSize = "15%";
    overview.style.fontSize = "50%";
    overview2.style.fontSize = "50%";
    startButton.style.fontSize = "1%";
    canvas.width = 1400;
    canvas.height = 600;
    startLevelSelect();
  }, 600);
  setTimeout(() => {
    overview.style.fontSize = "100%";
    overview2.style.fontSize = "100%";
    overview.innerHTML = "(The first to 4 kills wins)";
    overview2.innerHTML = "<span class='gorilla'>GORILLA CONTROLS:</span> <br> W & Space - Jump <br> A - Move Left <br> D - Move Right <br><br> <span class='snake'>SNAKE CONTROLS:</span> <br> Mouse Movement - Move <br> Left Click - Bite";
    startButton.innerHTML = "";
  }, 650);
}

function startGameplay(level) {
  alreadyPickedLevel = true;

  if (level == "1") {
    canvas.style.backgroundImage = "url('images/backgrounds/green land background level.png')";
  } else if (level == "2") {
    canvas.style.backgroundImage = "url('images/backgrounds/desertlevel.png')";
  } else if (level == "3") {
    canvas.style.backgroundImage = "url('images/backgrounds/cloud.png')";
  } else if (level == "4") {
    canvas.style.backgroundImage = "url('images/backgrounds/cave level.png')";

  } else if (level == "random") {
    var randomLev = Math.floor(Math.random() * 4) + 1;

    if (randomLev == 1) {
      canvas.style.backgroundImage = "url('images/backgrounds/green land background level.png')";
      currentLevel = "1";
    } else if (randomLev == 2) {
      canvas.style.backgroundImage = "url('images/backgrounds/desertlevel.png')";
      currentLevel = "2";
    } else if (randomLev == 3) {
      canvas.style.backgroundImage = "url('images/backgrounds/cloud.png')";
      currentLevel = "3";
    } else if (randomLev == 4) {
      canvas.style.backgroundImage = "url('images/backgrounds/cave level.png')";
      currentLevel = "4";
    }
  }

  function drawAll() {
    if (levelSelectImgLeft.complete == true && levelSelectImgRight.complete == true) {
      var leftxval = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(levelSelectImgLeft, leftxval, 0);
      ctx.drawImage(levelSelectImgRight, (leftxval * -1), 0);

      setTimeout(() => {
        function openAnim() {
          if (leftxval >= -1000) {
            leftxval -= 6;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(levelSelectImgLeft, leftxval, 0);
            ctx.drawImage(levelSelectImgRight, (leftxval * -1), 0);
            requestAnimationFrame(openAnim);
          }
        }

        openAnim();
      }, 2000);
    }
  }

  levelSelectImgLeft.onload = () => {
    drawAll();
  }

  levelSelectImgRight.onload = () => {
    drawAll();
  }

  drawAll();

  setTimeout(() => {
    gorillaHealthValue = 100;
    gorillaKills = 0;
    snakeHealthValue = 100;
    snakeKills = 0;
    inGame = true;
    snakeHead.x = (canvas.width - 150);
    snakeHead.y = (canvas.height - 150);
    snakeBody = [{x: snakeHead.x, y: snakeHead.y}]
    gorillaBody.x = 150;
    gorillaBody.y = (canvas.height - 150);
  }, 3000);
}

function startLevelSelect() {
  ctx.font = "40px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillStyle = "#edf4ff";
  ctx.fillText("LOADING", (canvas.width / 2), (canvas.height / 2));

  canvas.style.backgroundImage = "url('images/backgrounds/levelselectbackground.png')";

  function drawAll() {
    if (level1img.complete == true && level2img.complete == true && level3img.complete == true && level4img.complete == true && randomimg.complete == true) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#445775";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 106);
      ctx.fillStyle = "#94acd1";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 103);
      ctx.fillStyle = "#edf4ff";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 100);
    
      ctx.font = "30px Lucida Sans Unicode";
      ctx.fillText("Grasslands", ((canvas.width / 2) - 200), 280);
      ctx.fillText("Dangerous Desert", ((canvas.width / 2) + 205), 280);
      ctx.fillText("Cloud Kingdom", ((canvas.width / 2) - 200), 440);
      ctx.fillText("Cave of Doom and Despair", ((canvas.width / 2) + 205), 440);

      ctx.fillStyle = "#eea3ff";
      ctx.fillText("RANDOM LEVEL", (canvas.width / 2), 580);
      ctx.font = "15px Lucida Sans Unicode";
      ctx.fillText("(New level every death)", (canvas.width / 2), 595);
      ctx.font = "30px Lucida Sans Unicode";

      ctx.drawImage(level1img, level1imgx, level1imgy, level1img.width, level1img.height);
      ctx.drawImage(level2img, level2imgx, level2imgy, level1img.width, level1img.height);
      ctx.drawImage(level3img, level3imgx, level3imgy, level1img.width, level1img.height);
      ctx.drawImage(level4img, level4imgx, level4imgy, level1img.width, level1img.height);

      ctx.drawImage(randomimg, randomimgx, randomimgy, level1img.width, level1img.height);
    }
  }

  level1img.onload = () => {
    drawAll();
  }

  level2img.onload = () => {
    drawAll();
  }

  level3img.onload = () => {
    drawAll();
  }

  level4img.onload = () => {
    drawAll();
  }

  randomimg.onload = () => {
    drawAll();
  }

  drawAll();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      gorillaJump();
      break;
    case "s":
      direction = "down"
      break;
    case "a":
      direction = "left"
      break;
    case "d":
      direction = "right"
      break;
    case "Escape":
      pauseUnpause();
      break;
  }
})

canvas.addEventListener("click", (event) => {
  var mousex = event.offsetX;
  var mousey = event.offsetY;

  if (inGame == false && paused == false) {
    function innerLevelAnim(level) {
      if (alreadyPickedLevel == true) { return; }
      if (level == "random") { 
        randomModeActive = true;
      } else {
        currentLevel = level;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = "40px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillStyle = "#edf4ff";
      ctx.fillText("LOADING", (canvas.width / 2), (canvas.height / 2));
      
      startGameplay(level);
    }

    if (mousex >= level1imgx - level1img.width && mousex <= level1imgx + level1img.width && mousey >= level1imgy - level1img.height && mousey <= level1imgy + level1img.height) {
      innerLevelAnim("1");
    }

    if (mousex >= level2imgx - level1img.width && mousex <= level2imgx + level2img.width && mousey >= level2imgy - level2img.height && mousey <= level2imgy + level2img.height) {
      innerLevelAnim("2");
    }

    if (mousex >= level3imgx - level1img.width && mousex <= level3imgx + level3img.width && mousey >= level3imgy - level3img.height && mousey <= level3imgy + level3img.height) {
      innerLevelAnim("3");
    }

    if (mousex >= level4imgx - level4img.width && mousex <= level4imgx + level4img.width && mousey >= level4imgy - level4img.height && mousey <= level4imgy + level4img.height) {
      innerLevelAnim("4");
    }

    if (mousex >= randomimgx - randomimg.width && mousex <= randomimgx + randomimg.width && mousey >= randomimgy - randomimg.height && mousey <= randomimgy + randomimg.height) {
      innerLevelAnim("random");
    }
  } else if (inGame == true && paused == true) {
    if (mousex >= (canvas.width / 2) - boxWidth && mousex <= (canvas.width / 2) + boxWidth && mousey >= unpauseBoxY - boxHeight && mousey <= unpauseBoxY + boxHeight) {
      paused = false;
    }

    if (mousex >= (canvas.width / 2) - boxWidth && mousex <= (canvas.width / 2) + boxWidth && mousey >= menuBoxY - boxHeight && mousey <= menuBoxY + boxHeight) {
      inGame = false;
      paused = false;
      alreadyPickedLevel = false;
      randomModeActive = false;
      currentLevel = "0";

      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.backgroundImage = "url('images/backgrounds/levelselectbackground.png')";
      startLevelSelect();
    }
  }
});

document.addEventListener("click", (event) => {
  if (inGame == true && paused == false) {
    if (canSnakeBite == true) {
      canSnakeBite = false;
      snakeBite();
      setTimeout(() => {
        canSnakeBite = true;
      }, 500);
    }
  }
});

canvas.addEventListener("mousemove", (event) => {
  moveMouseX = event.offsetX;
  moveMouseY = event.offsetY;
})

function pauseUnpause() {
  if (inGame == false) { return; }

  if (paused == false) {
    paused = true;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font = "70px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "white";
    ctx.fillText("PAUSED", (canvas.width / 2), 150);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(((canvas.width / 2) - (boxWidth / 2)), (unpauseBoxY - (boxHeight / 1.25)), boxWidth, boxHeight);

    ctx.fillStyle = "white";
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Unpause", (canvas.width / 2), 240);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(((canvas.width / 2) - (boxWidth / 2)), (menuBoxY - (boxHeight / 1.25)), boxWidth, boxHeight);

    ctx.fillStyle = "white";
    ctx.font = "30px Trebuchet MS";
    ctx.fillText("Quit to Menu", (canvas.width / 2), 390);
  } else {
    paused = false;
  }
}

function moveGorilla() {

}

function moveSnake() {
  var distanceFromX = moveMouseX - snakeHead.x;
  var distanceFromY = moveMouseY - snakeHead.y;

  snakeHead.x += (distanceFromX / 100);

  if (snakeHead.y <= groundLevel) {
    snakeHead.y += (distanceFromY / 100);
  } else {
    snakeHead.y = groundLevel
  }

  snakeBody.unshift({ x: snakeHead.x, y: snakeHead.y });
  if (snakeBody.length > 60) {
    snakeBody.splice(60);
  }
}

function drawSnakeBody() {
  snakeBody.forEach((segment, index) => {
    ctx.fillStyle = "rgb(80,213,45)";
    ctx.beginPath();
    ctx.arc(
      segment.x,
      segment.y,
      20,
      2 * Math.PI,
      false
    );
    ctx.fill();
  })

  if (moveMouseX < snakeHead.x) {
    if (canDrawSnakeAttackSphere == true) {
      ctx.fillStyle = "rgba(255, 70, 70, 0.4)";
        ctx.beginPath();
        ctx.arc(
          snakeHead.x -50,
          snakeHead.y,
          40,
          2 * Math.PI,
          false
        );
      ctx.fill();
    }

    ctx.drawImage(snakeHeadIMG, (snakeHead.x - (snakeHeadIMG.width / 2)) - 40, (snakeHead.y - (snakeHeadIMG.height / 2)) - 5, 108, 66);
  } else if (moveMouseX > snakeHead.x) {
    if (canDrawSnakeAttackSphere == true) {
      ctx.fillStyle = "rgba(255, 70, 70, 0.4)";
        ctx.beginPath();
        ctx.arc(
          snakeHead.x + 60,
          snakeHead.y,
          40,
          2 * Math.PI,
          false
        );
      ctx.fill();
    }

    ctx.drawImage(snakeHeadIMGRight, (snakeHead.x - (snakeHeadIMGRight.width / 2)) + 40, (snakeHead.y - (snakeHeadIMGRight.height / 2)) - 5, 108, 66);
  }
}

function drawGorillaBody() {
  // temporary gorilla body draw
  ctx.fillStyle = "brown";
  ctx.fillRect(gorillaBody.x - (150 / 2), gorillaBody.y - (150 / 2), 150, 150);
}

updateGame();

function gorillaAttack() {

}

function gorillaGrapple() {

}

function bananaAttack() {

}

function gorillaHealth() {
  const width = 200;
  const height = 25;
  const x = 15;
  const y = 15;

  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgb(55, 56, 18)"
  ctx.beginPath();
  ctx.rect(x,y,width,height);
  ctx.stroke();

  ctx.fillStyle = "rgb(72, 73, 27)";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "rgb(253, 255, 117)"
  ctx.fillRect(x, y, (gorillaHealthValue / 100) * width, height);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.font = "20px Trebuchet MS";
  ctx.fillText("Gorilla", (x + (width / 2)), (y + (height / 2)));

  if (gorillaHealthValue <= 0) {
    roundWin("snake");
  }
}

function snakeHealth(){
  const width = 200;
  const height = 25;
  const x = 240;
  const y = 15;

  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgb(18, 56, 23)"
  ctx.beginPath();
  ctx.rect(x,y,width,height);
  ctx.stroke();

  ctx.fillStyle = "rgb(27, 73, 37)";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "rgb(117, 255, 147)"
  ctx.fillRect(x, y, (snakeHealthValue / 100) * width, height);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.font = "20px Trebuchet MS";
  ctx.fillText("Snake", (x + (width / 2)), (y + (height / 2)));

  if (snakeHealthValue <= 0) {
    roundWin("gorilla");
  }
}

function snakeKillCounter() {
  const width = 80;
  const height = 15;
  const x = 240;
  const y = 55;

  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgb(11, 37, 14)"
  ctx.beginPath();
  ctx.rect(x,y,width,height);
  ctx.stroke();

  ctx.fillStyle = "rgb(27, 73, 37)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "rgb(117, 255, 147)"
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.font = "15px Trebuchet MS";
  ctx.fillText("Kills: "+snakeKills, (x + (width / 2)), (y + (height / 2)) + 1);
}

function gorillaKillCounter() {
  const width = 80;
  const height = 15;
  const x = 15;
  const y = 55;

  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgb(42, 43, 12)"
  ctx.beginPath();
  ctx.rect(x,y,width,height);
  ctx.stroke();

  ctx.fillStyle = "rgb(72, 73, 27)";
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = "rgb(253, 255, 117)"
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
  ctx.font = "15px Trebuchet MS";
  ctx.fillText("Kills: "+gorillaKills, (x + (width / 2)), (y + (height / 2)) + 1);
}

function snakeBite() {
  var distanceFromGorillaX = Math.abs(snakeHead.x - gorillaBody.x)
  var distanceFromGorillaY = Math.abs(snakeHead.y - gorillaBody.y)

  if (distanceFromGorillaX <= 140 && distanceFromGorillaY <= 140) {
    gorillaHealthValue -= 10;
  }

  canDrawSnakeAttackSphere = true
  setTimeout(() => {
    canDrawSnakeAttackSphere = false
  }, 70);
}

function speedAttack(){

}

function healUp(){

}

function gorillaJump(){

}

function roundWin(playerWhoWon) {
  inGame = false;
  paused = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function randomUntilLastUnplayed() {
    var randomLev = Math.floor(Math.random() * 4) + 1;

    if (randomLev == 1 && currentLevel == "1") {
      randomUntilLastUnplayed();
      return;
    } else if (randomLev == 2 && currentLevel == "2") {
      randomUntilLastUnplayed();
      return;
    } else if (randomLev == 3 && currentLevel == "3") {
      randomUntilLastUnplayed();
      return;
    } else if (randomLev == 4 && currentLevel == "4") {
      randomUntilLastUnplayed();
      return;
    }

    if (randomLev == 1) {
      canvas.style.backgroundImage = "url('images/backgrounds/green land background level.png')";
      currentLevel = "1";
    } else if (randomLev == 2) {
      canvas.style.backgroundImage = "url('images/backgrounds/desertlevel.png')";
      currentLevel = "2";
    } else if (randomLev == 3) {
      canvas.style.backgroundImage = "url('images/backgrounds/cloud.png')";
      currentLevel = "3";
    } else if (randomLev == 4) {
      canvas.style.backgroundImage = "url('images/backgrounds/cave level.png')";
      currentLevel = "4"; 
    }
  }

  if (playerWhoWon == "gorilla") {
    if (gorillaKills <= 2) {
      gorillaKills += 1
      continueGame();
    } else {
      winGame();
    }
  } else if (playerWhoWon == "snake") {
    if (snakeKills <= 2) {
      snakeKills += 1
      continueGame();
    } else {
      setTimeout(() => {
        winGame(playerWhoWon);
      }, 10);
    }
  }

  function winGame(playerWhoWon) {
    // placeholder win screen stuff
    canvas.style.backgroundImage = "url('images/backgrounds/placeholder3x.png')";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (playerWhoWon == "gorilla") {
      ctx.fillStyle = "rgb(255, 237, 155)"
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = "rgb(126, 112, 49)"
      ctx.font = "120px Trebuchet MS";
      ctx.strokeText("Gorilla Wins!", (canvas.width / 2), (canvas.height - 100));
      ctx.fillText("Gorilla Wins!", (canvas.width / 2), (canvas.height - 100));
    } else {
      ctx.fillStyle = "rgb(181, 255, 174)"
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = "rgb(43, 104, 37)"
      ctx.font = "120px Trebuchet MS";
      ctx.strokeText("Snake Wins!", (canvas.width / 2), (canvas.height - 100));
      ctx.fillText("Snake Wins!", (canvas.width / 2), (canvas.height - 100));
    }

    setTimeout(() => {
      inGame = false;
      paused = false;
      alreadyPickedLevel = false;
      randomModeActive = false;
      currentLevel = "0";

      canvas.style.backgroundImage = "url('images/backgrounds/levelselectbackground.png')";
      startLevelSelect();
    }, 4000);
  }

  function continueGame() {
    var leftxval = -1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(levelSelectImgLeft, leftxval, 0);
    ctx.drawImage(levelSelectImgRight, (leftxval * -1), 0);

    function closeAnim() {
      if (leftxval <= -25) {
        leftxval += 25;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(levelSelectImgLeft, leftxval, 0);
        ctx.drawImage(levelSelectImgRight, (leftxval * -1), 0);
        requestAnimationFrame(closeAnim);
      }

      if (leftxval > -25) {
        leftxval = -25;

        ctx.fillStyle = "rgb(255, 237, 155)"
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = "rgb(126, 112, 49)"
        ctx.font = "80px Trebuchet MS";
        ctx.strokeText(gorillaKills, (canvas.width / 2) - 200, (canvas.height - 200));
        ctx.fillText(gorillaKills, (canvas.width / 2) - 200, (canvas.height - 200));

        ctx.strokeStyle = "rgb(43, 104, 37)"
        ctx.strokeText(snakeKills, (canvas.width / 2) + 200, (canvas.height - 200));
        ctx.fillStyle = "rgb(181, 255, 174)"
        ctx.fillText(snakeKills, (canvas.width / 2) + 200, (canvas.height - 200));
      }
    }

    closeAnim();

    setTimeout(() => {
      if (randomModeActive == true) {
        randomUntilLastUnplayed();
      }

      leftxval = 0;

      function openAnim() {
        if (leftxval >= -1000) {
          leftxval -= 15;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(levelSelectImgLeft, leftxval, 0);
          ctx.drawImage(levelSelectImgRight, (leftxval * -1), 0);
          requestAnimationFrame(openAnim);
        }
      }

      openAnim();
    }, 2000);

    setTimeout(() => {      
      gorillaHealthValue = 100;
      snakeHealthValue = 100;
      inGame = true;
      paused = false;
      snakeHead.x = (canvas.width - 150);
      snakeHead.y = (canvas.height - 150);
      snakeBody = [{x: snakeHead.x, y: snakeHead.y}];
      gorillaBody.x = 150;
      gorillaBody.y = (canvas.height - 150);
    }, 3000);
  }
}

function updateGame() {
  if (inGame == false) { return; }
  if (paused == true) { return; }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();
  moveGorilla();

  drawGorillaBody();
  drawSnakeBody();

  gorillaHealth();
  gorillaKillCounter();
  snakeHealth();
  snakeKillCounter();
}


document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      gorillaJump
      break;
    case "s":
      direction = "down"
      break;
    case "a":
      direction = "left"
      break;
    case "d":
      direction = "right"
      break;


  }
})

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "s":
      direction = "down"
      break;
    case "a":
      direction = "left"
      break;
    case "d":
      direction = "right"
      break;


  }
})


setInterval(updateGame, 1);