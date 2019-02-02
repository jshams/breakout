// JavaScript code goes here

// //////////////////////////////
// /////// Rectangles  /////////
// ////////////////////////////
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// // first two values are coordinates for the top left corner.
// // Second two values are the length and width.
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// //////////////////////////////
// ///////   Circles   /////////
// ////////////////////////////

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// // Six parameters:
// //   x and y coordinates of the arc center
// //   arc radius
// //   start and end angle (in radians)
// //   direction of drawing:
// //     false, for clockwise (negative)
// //     true, for counter clockwise (positive)
// //     This parameter is optional.
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// //////////////////////////////
// /////// Transparent /////////
// ////////////////////////////

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let rightPressed = false;
let leftPressed = false;

// -------------------- //
// IMPLEMENT IN CLASSES //
// -------------------- //

const ballRadius = 20;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;
const paddleHeight = 20;
const paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) / 2;
// using let instead of const here to later change for stretch challenges
let brickRowCount = 3;
let brickColumnCount = 5;
const brickWidth = 150;
const brickHeight = 40;
const brickPadding = 20;
const brickOffsetTop = 60;
const brickOffsetLeft = 60;
let score = 0;
let lives = 3;


const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
function useMouse() {
  document.addEventListener('mousemove', mouseMoveHandler, false);
}
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#00FF00';
  ctx.fill();
  ctx.closePath();
}


// // All bricks blue
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = '#0095DD';
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }


// // Challenge 1.1: Bricks colored by row
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         if (r == 0) {
//           ctx.fillStyle = '#0095DD';
//         }
//         else if (r == 1) {
//           ctx.fillStyle = '#00FF00';
//         }
//         else {
//           ctx.fillStyle = '#FFA500'
//         }
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }

// // Challenge 1.2: Bricks colored by column
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         if (c == 1) {
//           ctx.fillStyle = '#0095DD';
//         }
//         else if (c == 2) {
//           ctx.fillStyle = '#00FF00';
//         }
//         else if (c == 3) {
//           ctx.fillStyle = '#FFA500';
//         }
//         else if (c == 4) {
//           ctx.fillStyle = '#FFFF00';
//         }
//         else {
//           ctx.fillStyle = '000FFF';
//         }
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }


// // Challenge 1.3: Bricks Alternate color
// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         if ((c + r) % 2 == 0) {
//           ctx.fillStyle = '#0095DD';
//         }
//         else {
//           ctx.fillStyle = '#00FF00';
//         }
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }

// Challenge 1.4: Bricks random colors
const randomColors = [];
for (let i = 0; i < (brickColumnCount * brickRowCount); i++) {
  randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  randomColors.push(randomColor);
}

function drawBricks() {

  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = randomColors[(c * brickRowCount) + r];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 4;
        dy = -4;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

// let interval = setInterval(draw, 10);
draw();
