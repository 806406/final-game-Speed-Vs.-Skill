var snakeBody = [];
var gorillaBody = [];

var gorillaRight = false

var gorillaLeft = false

var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");

var alreadyPickedLevel = false;

var gravity = 2; // temp value of 2, will change this later depending on how we want the gameplay to feel.

var isJumping = false
var velocityY = 0;
var gravity = 0.5; // Adjust for jump height/speed
var jumpStrength = -10; // negative value for upward movement
var groundLevel = 100; // let groundLevel = 100; // the y-coordinate of the ground

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
    overview.style.fontSize = "10%";
    overview2.style.fontSize = "5%";
    startButton.style.fontSize = "5%";
    canvas.width = 1260;
    canvas.height = 540;
  }, 550);
  setTimeout(() => {
    title.style.fontSize = "15%";
    overview.style.fontSize = "15%";
    overview2.style.fontSize = "1%";
    startButton.style.fontSize = "1%";
    canvas.width = 1400;
    canvas.height = 600;
    startLevelSelect();
  }, 600);
  setTimeout(() => {
    overview.innerHTML = "";
    overview2.innerHTML = "";
    startButton.innerHTML = "";
  }, 650);
}

function startGameplay(level) {
  alreadyPickedLevel = true;

  var levelSelectImgLeft = new Image();
  levelSelectImgLeft.src = 'images/backgrounds/levelselectLeft10.png';
  var levelSelectImgRight = new Image();
  levelSelectImgRight.src = 'images/backgrounds/levelselectRight10.png';

  function drawAll() {
    if (levelSelectImgLeft.complete == true && levelSelectImgRight.complete == true) {
      var leftxval = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(levelSelectImgLeft, leftxval, 0);
      ctx.drawImage(levelSelectImgRight, ((leftxval * -1) + (canvas.width / 2)), 0);

      setTimeout(() => {
        function openAnim() {
          if (leftxval >= -700) {
            leftxval -= 6;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(levelSelectImgLeft, leftxval, 0);
            ctx.drawImage(levelSelectImgRight, ((leftxval * -1) + (canvas.width / 2)), 0);
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
}

function startLevelSelect() {
  var levelSelectMain = new Image();
  levelSelectMain.src = 'images/backgrounds/levelselectbackground.png'; 

  var level1img = new Image();
  var level1imgx = ((canvas.width / 2) - 300);
  var level1imgy = 160;
  level1img.width = 210;
  level1img.height = 90;
  level1img.src = 'images/backgrounds/placeholder3x.png';

  var level2img = new Image();
  var level2imgx = ((canvas.width / 2) + 105);
  var level2imgy = 160;
  level2img.width = 210;
  level2img.height = 90;
  level2img.src = 'images/backgrounds/placeholder3x.png';

  var level3img = new Image();
  var level3imgx = ((canvas.width / 2) - 300);
  var level3imgy = 320;
  level3img.width = 210;
  level3img.height = 90;
  level3img.src = 'images/backgrounds/placeholder3x.png';

  var level4img = new Image();
  var level4imgx = ((canvas.width / 2) + 105);
  var level4imgy = 320;
  level4img.width = 210;
  level4img.height = 90;
  level4img.src = 'images/backgrounds/placeholder3x.png';

  var randomimg = new Image();
  var randomimgx = ((canvas.width / 2) - 105);
  var randomimgy = 460;
  randomimg.width = 210;
  randomimg.height = 90;
  randomimg.src = 'images/backgrounds/random.png';

  ctx.font = "40px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillStyle = "#edf4ff";
  ctx.fillText("LOADING", (canvas.width / 2), (canvas.height / 2));

  function drawAll() {
    if (level1img.complete == true && level2img.complete == true && level3img.complete == true && level4img.complete == true && randomimg.complete == true && levelSelectMain.complete == true) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(levelSelectMain, 0, 0);

      ctx.fillStyle = "#445775";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 106);
      ctx.fillStyle = "#94acd1";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 103);
      ctx.fillStyle = "#edf4ff";
      ctx.fillText("LEVEL SELECT", (canvas.width / 2), 100);
    
      ctx.font = "30px Lucida Sans Unicode";
      ctx.fillText("Level 1 Placeholder", ((canvas.width / 2) - 200), 280);
      ctx.fillText("Level 2 Placeholder", ((canvas.width / 2) + 205), 280);
      ctx.fillText("Level 3 Placeholder", ((canvas.width / 2) - 200), 440);
      ctx.fillText("Level 4 Placeholder", ((canvas.width / 2) + 205), 440);

      ctx.fillStyle = "#eea3ff";
      ctx.fillText("RANDOM LEVEL", (canvas.width / 2), 580);

      ctx.drawImage(level1img, level1imgx, level1imgy, level1img.width, level1img.height);
      ctx.drawImage(level2img, level2imgx, level2imgy, level1img.width, level1img.height);
      ctx.drawImage(level3img, level3imgx, level3imgy, level1img.width, level1img.height);
      ctx.drawImage(level4img, level4imgx, level4imgy, level1img.width, level1img.height);

      ctx.drawImage(randomimg, randomimgx, randomimgy, level1img.width, level1img.height);
    }
  }

  levelSelectMain.onload = () => {
    drawAll();
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

  canvas.addEventListener("click", (event) => {
    var mousex = event.offsetX;
    var mousey = event.offsetY;

    function innerLevelAnim(level) {
      if (alreadyPickedLevel == true) { return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(levelSelectMain, 0, 0);

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
  });
}

function drawSnakeBody() {
    snakeBody.forEach((segment, index) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * 4, segment.y * 4, 4, 4); //figure out what this does and how to actually fill a snake in 
    }
  )
}

function drawGorillaBody() {
  gorillaBody.forEach((segment) => {
    ctx.fillStyle = "brown";
    ctx.fillRect(segment.x * 8, segment.y * 8, 8, 8);
  });
}
updateGame();

var gorillaAttack

  function gorillaAttack() {

  }

var gorillaGrapple

function gorillaGrapple() {

}

var bananaAttack

function bananaAttack() {

}

var gorillaHealth

function gorillaHealth() {

}

var snakeBite 

function snakeBite() {

}

var speedAttack

function speedAttack(){


}


function updateGame() {
  drawSnakeBody() //figure out the rest of the major functions that will be needed to start the game and then add them here. 
}

var snakehealth

function snakeHealth() {}

var healUp   

function healUp(){
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

setInterval(updateGame, 100);



function gorillaJump(){

}
