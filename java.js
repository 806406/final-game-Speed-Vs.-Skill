var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");

let keysPressed = [];
let alreadyDidKonamiCode = false;
let mariosActive = false;
let mariosThatAttacked = 0;

let marioTable = [
  {mario0x: 999, mario0y: 999, mario0Fall: 1, mario0Speed: 1},
  {mario1x: 999, mario1y: 999, mario1Fall: 1, mario1Speed: 1.2},
  {mario2x: 999, mario2y: 999, mario2Fall: 1, mario2Speed: 0.9},
  {mario3x: 999, mario3y: 999, mario3Fall: 1, mario3Speed: 1.4},
  {mario4x: 999, mario4y: 999, mario4Fall: 1, mario4Speed: 1.1},
  {mario5x: 999, mario5y: 999, mario5Fall: 1, mario5Speed: 1.3},
  {mario6x: 999, mario6y: 999, mario6Fall: 1, mario6Speed: 0.9},
  {mario7x: 999, mario7y: 999, mario7Fall: 1, mario7Speed: 1.3},
  {mario8x: 999, mario8y: 999, mario8Fall: 1, mario8Speed: 1.1},
  {mario9x: 999, mario9y: 999, mario9Fall: 1, mario9Speed: 1.2}
]

let snakeHealthValue = 100;
let gorillaHealthValue = 100;

let healUpPos = {x: 999, y: 999};

var gorillaKills = 0;
var snakeKills = 0;

var snakeHead = { x: (canvas.width - 150), y: (canvas.height - 150)};
var snakeBody = [{x: snakeHead.x, y: snakeHead.y}]
var gorillaBody = { x: 150, y: (canvas.height - 150)};

var gorillaRight = false;
var gorillaLeft = false;

var alreadyPickedLevel = false;
var randomModeActive = false;
var currentLevel = "0";
var inGame = false; 
var paused = false;

var canGorillaPunch = true;
var canDrawGorillaPunchSphere = false;

var isJumping = false

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

var canVenomSpit = true;
var venomSpitPos = { x: 0, y: 0};
var canDrawVenomSpitLine = false;
var venomSpitActive = false;

var canGrapple = true;
var grapplePos = { x: 0, y: 0};
var canDrawGrappleLine = false;
var grappling = false;

// level damage sprites
var tumbleweedPos = {x: 999, y: 999};
var tumbledDamagedGorilla = false;
var tumbledDamagedSnake = false;

var chomperPos = {x: 999, y: 999};
var chomperDamagedGorilla = false;
var chomperDamagedSnake = false;

var raindropPos = {x: 999, y: 999};
var raindropDamagedGorilla = false;
var raindropDamagedSnake = false;

var boulderPos  = {x: -999, y: 999};
var boulderDamagedGorilla = false;
var boulderDamagedSnake = false;

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

var venomSpitIMG = new Image();
venomSpitIMG.src = 'images/sprites/spit bomb.png';

var tumbleweedIMG = new Image();
tumbleweedIMG.src = 'images/sprites/tumble weed damage for desert.png';

var chomperIMG = new Image();
chomperIMG.src = 'images/sprites/chomper easter egg.png';

var raindropIMG = new Image();
raindropIMG.src = 'images/sprites/raindrop damage dealer.png';

var boulderIMG = new Image();
boulderIMG.src = 'images/sprites/bolder for cave level.png';

var marioIMG = new Image();
marioIMG.src = 'images/sprites/Mario.png';

var healUpIMG = new Image();
healUpIMG.src = 'images/sprites/heal up.png';

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
    ctx.imageSmoothingEnabled = false;
    startLevelSelect();
  }, 600);
  setTimeout(() => {
    overview.style.fontSize = "100%";
    overview2.style.fontSize = "100%";
    overview.innerHTML = "The first to 4 kills wins! <br> Some maps have special events which will try to hurt you!";
    overview2.innerHTML = "<span class='gorilla'>GORILLA CONTROLS:</span> <br> W & Space - Jump <br> A - Move Left <br> D - Move Right <br> E - Grapple (Movement translates to direction) <br> F - Punch <br> <br> <span class='snake'>SNAKE CONTROLS:</span> <br> Mouse Movement - Move <br> Left Click - Bite <br> Right Click - Venom Spit Trap";
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
    tumbleweedPos = {x: 999, y: 999};
    chomperPos = {x: 999, y: 999};
    raindropPos = {x: 999, y: 999};
    boulderPos = {x: -999, y: 999};
    keysPressed = [];
    alreadyDidKonamiCode = false;
    mariosActive = false;
    mariosThatAttacked = 0;
    venomSpitActive = false;
    canDrawVenomSpitLine = false;
    canVenomSpit = true;
    canGrapple = true;
    canDrawGrappleLine = false;
    grappling = false;
    healUpPos = {x:999,y:999};
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

const gorillaImage = new Image();
gorillaImage.src = "images/sprites/GORILLA_scaled_20x_pngcrushed.png";



document.addEventListener("keydown", (event) => {
  if (inGame == true && paused == false) {
    if (event.key != " " && event.key != "w" && event.key != "d" && event.key != "Escape" && event.key != "a" && event.key != "e" && event.key != "f") {
      keysPressed.push(event.key);
    }
  }

  switch (event.key) {
    case " ":
      isJumping = true;
      break;
    case "w":
      isJumping = true;
      break;
    case "a":
      gorillaLeft = true
      break;
    case "d":
      gorillaRight = true
      break;
    case "f":
      gorillaPunch();
      break;
    case "Escape":
      pauseUnpause();
      break;
    case "e":
      gorillaGrapple();
      break;
  }

  var keysToString = JSON.stringify(keysPressed)
  if (keysToString.includes('"ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"')) {
    if (alreadyDidKonamiCode == false) {
      // Activate mario easter egg
      alreadyDidKonamiCode = true;

      for (let i = 0; i < marioTable.length; i++) {
        var specificMarioX = "mario" + i + "x";
        var specificMarioY = "mario" + i + "y";

        marioTable[i][specificMarioX] = snakeHead.x
        marioTable[i][specificMarioY] = snakeHead.y
      }

      mariosActive = true
      snakeHead.y = 999;
      snakeBody = [{x: 999, y: 999}];
      keysPressed = [];

      setTimeout(() => {
        mariosActive = false;
        mariosThatAttacked = 0;
      }, 15000);
    }
  }
})



function gorillaPunch() {
  if (canGorillaPunch == true && inGame == true && paused == false) {
    canGorillaPunch = false;
    setTimeout(() => {
      canGorillaPunch = true;
    }, 1000); 
    var distanceFromSnakeX = Math.abs(gorillaBody.x - snakeHead.x)
    var distanceFromSnakeY = Math.abs(gorillaBody.y - snakeHead.y)
 
    if (distanceFromSnakeX <= 100 && distanceFromSnakeY <= 100) {
      snakeHealthValue -= 20; 
    }

    canDrawGorillaPunchSphere = true
    setTimeout(() => {
      canDrawGorillaPunchSphere = false
    }, 100);
  }
}


function drawGorillaBody() {
  if (canDrawGorillaPunchSphere == true) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; 
    ctx.beginPath();
    ctx.arc(
      gorillaBody.x,
      gorillaBody.y - 20,
      60,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }
 ctx.drawImage(gorillaImage, gorillaBody.x-75, gorillaBody.y-75, 150, 150);
}

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
      tumbleweedPos = {x: 999, y: 999};
      chomperPos = {x: 999, y: 999};
      raindropPos = {x: 999, y: 999};
      boulderPos = {x: -999, y: 999};
      venomSpitActive = false;
      canDrawVenomSpitLine = false;
      canVenomSpit = true;
      canGrapple = true;
      canDrawGrappleLine = false;
      grappling = false;
      keysPressed = [];
      alreadyDidKonamiCode = false;
      mariosActive = false;
      mariosThatAttacked = 0;
      healUpPos = {x:999,y:999};

      ctx.clearRect(0,0,canvas.width,canvas.height);
      canvas.style.backgroundImage = "url('images/backgrounds/levelselectbackground.png')";
      startLevelSelect();
    }
  }
});

canvas.addEventListener("contextmenu", (event) => { // prevents right click menu from opening on right click
  event.preventDefault();
  if (canVenomSpit == false) { return; }
  if (mariosActive == true) { return; }

  canVenomSpit = false;

  venomSpitPos.x = moveMouseX;
  venomSpitPos.y = moveMouseY;
  if (venomSpitPos.y > groundLevel) {
    venomSpitPos.y = groundLevel;
  }
  canDrawVenomSpitLine = true;

  setTimeout(() => {
    canDrawVenomSpitLine = false;
    venomSpitActive = true;

    setTimeout(() => {
      venomSpitActive = false;

      setTimeout(() => {
        canVenomSpit = true;
      }, 4000); // 12 sec cooldown

    }, 7000); // venom lasts for 8 seconds

  }, 1000); // summon venom after 1 second
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

// Gorilla movement and jump logic
const gravity = 1.01;
var fallAmount = 1;
var isJumpAdding = false;

function moveGorilla() {
  if (grappling == true) {
    var distanceFromX = grapplePos.x - gorillaBody.x;
    var distanceFromY = grapplePos.y - gorillaBody.y;

    gorillaBody.x += (distanceFromX / 30);
    gorillaBody.y += (distanceFromY / 30);

    return;
  }

  if (gorillaLeft == true) {
    if (gorillaBody.x > 0) {
      gorillaBody.x -= 2.5;
    }
  }

  if (gorillaRight == true) {
    if (gorillaBody.x < canvas.width) {
      gorillaBody.x += 2.5;
    }
  }

  if (gorillaBody.y < 450) {
    fallAmount *= gravity;
    if (isJumpAdding == false) {
      gorillaBody.y += fallAmount;
    }
  } else {
    gorillaBody.y = 450;
    fallAmount = 1;
  }

  // Gorilla jump
  if (isJumping == true) {
    if (gorillaBody.y >= 450) {
      fallAmount = 1;
      isJumpAdding = true;
      setTimeout(() => {
        isJumpAdding = false;
        fallAmount = 0.7;
      }, 200);
    }
  }

  if (isJumpAdding == true) {
    var jumpAmount = fallAmount * 3.5
    gorillaBody.y -= jumpAmount;
  }
}

function moveSnake() {
  if (mariosActive == true) { return; }

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
  if (canDrawVenomSpitLine == true) {
    ctx.strokeStyle = "rgba(69, 224, 31, 0.6)";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(snakeHead.x, snakeHead.y);
    ctx.lineTo(venomSpitPos.x, venomSpitPos.y);
    ctx.stroke();
  }

  if (venomSpitActive == true) {
    ctx.drawImage(venomSpitIMG, venomSpitPos.x - 70, venomSpitPos.y - 40, 140, 80);
  }

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
  if (canDrawGrappleLine == true) {
    ctx.strokeStyle = "rgba(224, 221, 31, 0.6)";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(gorillaBody.x, gorillaBody.y);
    ctx.lineTo(grapplePos.x, grapplePos.y);
    ctx.stroke();
  }

   if (canDrawGorillaPunchSphere == true) {
    ctx.fillStyle = "rgba(255, 70, 70, 0.4)";
    ctx.beginPath();
    ctx.arc(
      gorillaBody.x,
      gorillaBody.y,
      80,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

 ctx.drawImage(gorillaImage, gorillaBody.x-75, gorillaBody.y-75, 150, 150);
}

function gorillaAttack() {

}

function gorillaGrapple() {
  if (canGrapple == false) { return; }
  if (gorillaRight == true && gorillaLeft == true) { return; }
  if (gorillaRight == false && gorillaLeft == false) { return; }

  canGrapple = false;
  canDrawGrappleLine = true;
  grappling = true;

  if (gorillaRight == true && gorillaLeft == false) {
    grapplePos.x = gorillaBody.x + 500;
    grapplePos.y = gorillaBody.y;
    if (grapplePos.x > 1400) { grapplePos.x = 1400; }
  } else if (gorillaRight == false && gorillaLeft == true) {
    grapplePos.x = gorillaBody.x - 500;
    grapplePos.y = gorillaBody.y;
    if (grapplePos.x < 0) { grapplePos.x = 0; }
  }

  setTimeout(() => {
    grappling = false;
    canDrawGrappleLine = false;
  }, 500);

  setTimeout(() => {
    canGrapple = true;
  }, 1500);
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
  ctx.fillText("Gorilla (" + gorillaHealthValue + ")", (x + (width / 2)), (y + (height / 2)));

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
  ctx.fillText("Snake (" + snakeHealthValue + ")", (x + (width / 2)), (y + (height / 2)));

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

  if (distanceFromGorillaX <= 110 && distanceFromGorillaY <= 110) {
    gorillaHealthValue -= 10;
  }

  canDrawSnakeAttackSphere = true
  setTimeout(() => {
    canDrawSnakeAttackSphere = false
  }, 70);
}

function snakeVenomCheckCollisions() {
  if (venomSpitActive == false) { return; }

  var distanceFromGorillaX = Math.abs(venomSpitPos.x - gorillaBody.x)
  var distanceFromGorillaY = Math.abs(venomSpitPos.y - gorillaBody.y)

  if (distanceFromGorillaX <= 75 && distanceFromGorillaY <= 85) {
    gorillaHealthValue -= 25;
    venomSpitActive = false;
  }
}

function speedAttack(){

}

function healUpSpawn(){
  if (inGame == false) { return; }
  if (paused == true) { return; }

  var randomX = Math.floor(Math.random() * 1400)
  healUpPos = {x: randomX, y: -50};

  if (healUpPos.x < 70) {
    healUpPos.x = 70;
  } else if (healUpPos.x > 1330) {
    healUpPos.x = 1330;
  }
}

function moveAndDrawHeal(){
  ctx.drawImage(healUpIMG, healUpPos.x - 50, healUpPos.y - 60, 280, 120);

  if (healUpPos.y < groundLevel - 20) {
    healUpPos.y += 3;
  }

  var distanceFromGorillaX = Math.abs(healUpPos.x - gorillaBody.x)
  var distanceFromGorillaY = Math.abs(healUpPos.y - gorillaBody.y)

  if (distanceFromGorillaX <= 80 && distanceFromGorillaY <= 70) {
    if (gorillaHealthValue < 100) {
      gorillaHealthValue += 20;
      healUpPos = {x: 999, y: 999};
    }
    if (gorillaHealthValue > 100) {
      gorillaHealthValue = 100;
    }
  }

  var distanceFromSnakeX = Math.abs(healUpPos.x - snakeHead.x)
  var distanceFromSnakeY = Math.abs(healUpPos.y - snakeHead.y)

  if (distanceFromSnakeX <= 80 && distanceFromSnakeY <= 70) {
    if (snakeHealthValue < 100) {
      snakeHealthValue += 20;
      healUpPos = {x: 999, y: 999};
    }
    if (snakeHealthValue > 100) {
      snakeHealthValue = 100;
    }
  }
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
      setTimeout(() => {
        winGame(playerWhoWon);
      }, 10);
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
    canvas.style.backgroundImage = "url('images/sprites/win screen.png')";
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
      keysPressed = [];
      alreadyPickedLevel = false;
      randomModeActive = false;
      alreadyDidKonamiCode = false;
      mariosActive = false;
      mariosThatAttacked = 0;
      currentLevel = "0";
      healUpPos = {x:999,y:999};

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
      venomSpitActive = false;
      canVenomSpit = true;
      canDrawVenomSpitLine = false;
      canGrapple = true;
      canDrawGrappleLine = false;
      grappling = false;
      gorillaHealthValue = 100;
      snakeHealthValue = 100;
      tumbleweedPos = {x: 999, y: 999};
      chomperPos = {x: 999, y: 999};
      raindropPos = {x: 999, y: 999};
      boulderPos = {x: -999, y: 999};
      inGame = true;
      paused = false;
      snakeHead.x = (canvas.width - 150);
      snakeHead.y = (canvas.height - 150);
      snakeBody = [{x: snakeHead.x, y: snakeHead.y}];
      gorillaBody.x = 150;
      gorillaBody.y = (canvas.height - 150);
      mariosActive = false;
      mariosThatAttacked = 0;
      healUpPos = {x:999,y:999};
    }, 3000);
  }
}

function moveAndDrawLevelEvents() {
  if (currentLevel == "1") {
    if (chomperDamagedGorilla == false) {
      var distanceFromGorillaX = Math.abs(chomperPos.x - gorillaBody.x)
      var distanceFromGorillaY = Math.abs(chomperPos.y - gorillaBody.y)

      if (distanceFromGorillaX <= 100 && distanceFromGorillaY <= 100) {
        gorillaHealthValue -= 15;
        chomperDamagedGorilla = true;
      }
    }

    if (chomperDamagedSnake == false) {
      var distanceFromSnakeX = Math.abs(chomperPos.x - snakeHead.x)
      var distanceFromSnakeY = Math.abs(chomperPos.y - snakeHead.y)

      if (distanceFromSnakeX <= 100 && distanceFromSnakeY <= 100) {
        snakeHealthValue -= 15;
        chomperDamagedSnake = true;
      }
    }

    chomperPos.x += 2;
    ctx.fillStyle = "red";
    ctx.drawImage(chomperIMG, chomperPos.x - 75, chomperPos.y - 75, 150, 150);
  }
  if (currentLevel == "2") {
    if (tumbledDamagedGorilla == false) {
      var distanceFromGorillaX = Math.abs(tumbleweedPos.x - gorillaBody.x)
      var distanceFromGorillaY = Math.abs(tumbleweedPos.y - gorillaBody.y)

      if (distanceFromGorillaX <= 80 && distanceFromGorillaY <= 80) {
        gorillaHealthValue -= 15;
        tumbledDamagedGorilla = true;
      }
    }

    if (tumbledDamagedSnake == false) {
      var distanceFromSnakeX = Math.abs(tumbleweedPos.x - snakeHead.x)
      var distanceFromSnakeY = Math.abs(tumbleweedPos.y - snakeHead.y)

      if (distanceFromSnakeX <= 80 && distanceFromSnakeY <= 80) {
        snakeHealthValue -= 15;
        tumbledDamagedSnake = true;
      }
    }

    tumbleweedPos.x += 3;
    ctx.fillStyle = "red";
    ctx.drawImage(tumbleweedIMG, tumbleweedPos.x - 320, tumbleweedPos.y - 135, 700, 300);
  }

  if (currentLevel == "3") {
    if (raindropDamagedGorilla == false) {
      var distanceFromGorillaX = Math.abs(raindropPos.x - gorillaBody.x)
      var distanceFromGorillaY = Math.abs(raindropPos.y - gorillaBody.y)

      if (distanceFromGorillaX <= 90 && distanceFromGorillaY <= 90) {
        gorillaHealthValue -= 20;
        raindropDamagedGorilla = true;
      }
    }

    if (raindropDamagedSnake == false) {
      var distanceFromSnakeX = Math.abs(raindropPos.x - snakeHead.x)
      var distanceFromSnakeY = Math.abs(raindropPos.y - snakeHead.y)

      if (distanceFromSnakeX <= 90 && distanceFromSnakeY <= 90) {
        snakeHealthValue -= 20;
        raindropDamagedSnake = true;
      }
    }

    raindropPos.y += 4;
    ctx.drawImage(raindropIMG, raindropPos.x - 44, raindropPos.y - 74, 88, 148);
  }

  if (currentLevel == "4") {
    if (boulderDamagedGorilla == false) {
      var distanceFromGorillaX = Math.abs(boulderPos.x - gorillaBody.x)
      var distanceFromGorillaY = Math.abs(boulderPos.y - gorillaBody.y)

      if (distanceFromGorillaX <= 90 && distanceFromGorillaY <= 90) {
        gorillaHealthValue -= 40;
        boulderDamagedGorilla = true;
      }
    }

    if (boulderDamagedSnake == false) {
      var distanceFromSnakeX = Math.abs(boulderPos.x - snakeHead.x)
      var distanceFromSnakeY = Math.abs(boulderPos.y - snakeHead.y)

      if (distanceFromSnakeX <= 90 && distanceFromSnakeY <= 90) {
        snakeHealthValue -= 40;
        boulderDamagedSnake = true;
      }
    }

    boulderPos.x -= 2;
    ctx.drawImage(boulderIMG, boulderPos.x - 92, boulderPos.y - 76, 184, 152);
  }
}

function levelEvents() {
  if (inGame == true && paused == false) {
    if (currentLevel == "1") {
      // chomper stuff
      var randomChomperUpOrDown = Math.round(Math.random());
      var randomChomperVariation = Math.round(Math.random() * 120);

      chomperPos.x = -150;

      if (randomChomperUpOrDown == 0) {
        chomperPos.y = snakeHead.y + randomChomperVariation;
      } else {
        chomperPos.y = snakeHead.y - randomChomperVariation;
      }

      if (chomperPos.y > groundLevel) {
        chomperPos.y = groundLevel;
      }

      if (chomperPos.y < 230) {
        chomperPos.y = gorillaBody.y;
        if (chomperPos.y < 230) {
          chomperPos.y = 230;
        }
      }

      chomperDamagedGorilla = false;
      chomperDamagedSnake = false;
    }

    if (currentLevel == "2") {
      // tumbleweed stuff
      var randomTumbleUpOrDown = Math.round(Math.random());
      var randomTumbleVariation = Math.round(Math.random() * 120);

      tumbleweedPos.x = -150;

      if (randomTumbleUpOrDown == 0) {
        tumbleweedPos.y = snakeHead.y + randomTumbleVariation;
      } else {
        tumbleweedPos.y = snakeHead.y - randomTumbleVariation;
      }

      if (tumbleweedPos.y > groundLevel) {
        tumbleweedPos.y = groundLevel;
      }

      if (tumbleweedPos.y < 230) {
        tumbleweedPos.y = gorillaBody.y;
        if (tumbleweedPos.y < 230) {
          tumbleweedPos.y = 230;
        }
      }

      tumbledDamagedGorilla = false;
      tumbledDamagedSnake = false;
    }

    if (currentLevel == "3") {
      // raindrop stuff
      var randomRainFollow = Math.round(Math.random());

      raindropPos.y = -150;

      if (randomRainFollow == 0) {
        raindropPos.x = snakeHead.x;
      } else {
        raindropPos.x = gorillaBody.x;
      }

      raindropDamagedSnake = false;
      raindropDamagedGorilla = false;
    }

    if (currentLevel == "4") {
      // boulder stuff

      boulderPos = {x: 1580, y: 450};

      boulderDamagedGorilla = false;
      boulderDamagedSnake = false;
    }
  }
}

function moveMario() {
  for (let i = 0; i < marioTable.length; i++) {
    let specificMarioX = "mario" + i + "x";
    let specificMarioY = "mario" + i + "y";
    let specificMarioFall = "mario" + i + "Fall";
    let specificMarioSpeed = "mario" + i + "Speed";
    let distanceFromGorillaX = Math.abs(gorillaBody.x - marioTable[i][specificMarioX]);
    let distanceFromGorillaY = Math.abs(gorillaBody.y - marioTable[i][specificMarioY]);

    if (gorillaBody.x < marioTable[i][specificMarioX]) {
      marioTable[i][specificMarioX] -= marioTable[i][specificMarioSpeed];
    } else if (gorillaBody.x > marioTable[i][specificMarioX]) {
      marioTable[i][specificMarioX] += marioTable[i][specificMarioSpeed];
    }

    if (marioTable[i][specificMarioY] < groundLevel - 60) {
      marioTable[i][specificMarioFall] *= 1.01;
      marioTable[i][specificMarioY] += marioTable[i][specificMarioFall];
    } else {
      marioTable[i][specificMarioY] = groundLevel - 60;
      marioTable[i][specificMarioFall] = 1;
    }

    if (distanceFromGorillaX <= 80 && distanceFromGorillaY <= 80) {
      gorillaHealthValue -= 5;
      marioTable[i][specificMarioX] = 999999999999999999999;
      mariosThatAttacked += 1
    }

    if (mariosThatAttacked == 10) {
      mariosActive = false
      mariosThatAttacked = 0;
    }
  }
}

function drawMario() {
  for (let i = 0; i < marioTable.length; i++) {
    let specificMarioX = "mario" + i + "x";
    let specificMarioY = "mario" + i + "y";

    ctx.drawImage(marioIMG, marioTable[i][specificMarioX] - 480, marioTable[i][specificMarioY] - 180, 560, 240);
  }
}

function updateGame() {
  if (inGame == false) { return; }
  if (paused == true) { return; }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();
  moveGorilla();
  moveAndDrawHeal();

  moveAndDrawLevelEvents();
  drawGorillaBody();
  drawSnakeBody();

  if (mariosActive == true) {
    moveMario();
    drawMario();
  }

  gorillaHealth();
  gorillaKillCounter();
  snakeHealth();
  snakeKillCounter();

  snakeVenomCheckCollisions();
}

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      gorillaLeft = false;
      break;
    case "d":
      gorillaRight = false;
      break;
    case " ":
      isJumping = false;
      break;
    case "w":
      isJumping = false;
      break;
  }
})

setInterval(updateGame, 1);
setInterval(levelEvents, 30000);
setInterval(healUpSpawn, 40000);

// EASTER EGGS!!

// By doing the Konami code during gameplay (only ↑ ↑ ↓ ↓ ← → ← →  because of Gorilla movement), the snake will despawn for a short bit and will spawn 10 marios that will attempt to attack the gorilla. When one attacks, they will despawn. However, all of them will despawn either way after 15 seconds. Each mario does 5 damage, resulting in a total of 50 health delt to the gorilla if they all attack.


//Basic movement NOTES: THIS IS MAINLY FOR GORILLA GRAPPLE BECAUSE ALL OF THE BASIC LEFT RIGHT AND UP MOVEMENT IS CONTROLLED BY A(LEFT) D(RIGHT) W & SPACEBAR(JUMP)
//GRAPPLE: For the gorilla to activate the grapple you have to hold the direction you want to move in and then press E, so if you want to grapple to the left, you have to hold A, and then press E, and if you want to grapple right, hold D and press E. Furthermore, you cannot grapple if you are not holding a movement button (A or D), second: you cannot grapple up, THAT IS WHAT JUMPING IS FOR! Third: Yes you can look like a ninja flying in air and it is super cool. Fourth: You cannot hold both left and right and press E, because that doesn't make sense, why would you want to grapple in both directions. 
//Attacks: There is Gorilla Hit, Gorilla banana throw, Snake bite, and Snake venom spit
