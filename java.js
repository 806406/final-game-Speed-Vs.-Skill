var snakeBody
var gorillaBody

function drawSnakeBody() {
    snakeBody.forEach((segment, index) => {
        ctx.fillStyle = green;
        ctx.fillRect(segment.x * 4, segment.y * 4, 4, 4); //figure out what this does and how to actually fill a snake in 
    }
  )
}

function drawGorillaBody() {
  ctx.fillStyle = WebGLQuery;
  ctx.fillRect(segment.x * 8, segment.y * 8)
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

var snakeBite 

function snakeBite() {

}

var speedAttack

function speedAttack(){
  
}

function updateGame() {
  drawSnakeBody() //figure out the rest of the major functions that will be needed to start the game and then add them here. 
}