
function drawSnakeBody() {
    snakeBody.forEach((segment, index) => {
        ctx.fillStyle = green;
        ctx.fillRect(segment.x * 4, segment.y * 4, 4, 4); //figure out what this does and how to actually fill a snake in 
    }
  )}

  function updateGame(){
    drawSnakeBody() //figure out the rest of the major functions that will be needed to start the game and then add them here. 
}


var gorillaBody

functiondrawGorillaBody() {
  gorillaBody.forEach((segment, index) => {
    ctx.fillStyle = WebGLQuery;
    ctx.fillRect(segment.x * 8, segment.y * 8)
  }
)}
updateGame();

