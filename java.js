var snakeBody = [];
var gorillaBody = [];

var gorillaRight = false

var gorillaLeft = false

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

    generatefood();
    



function gorillaJump(){

}