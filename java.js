const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

    let snake = [{ x: 5, y: 5, color: getRandomColor() }];
    let food = { x: 10, y: 10 };
    let direction = "right";

    function drawSnake() {
      snake.forEach((segment, index) => {
        ctx.fillStyle = segment.color;
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);

        // Draw an eye on the head
        if (index === 0) {
          ctx.fillStyle = "black"; 
          ctx.beginPath();
          ctx.arc(segment.x * tileSize + tileSize / 2, segment.y * tileSize + tileSize / 4, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
