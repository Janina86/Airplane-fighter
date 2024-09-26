const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const planeSize = 10;
let planeX = canvas.width / 2 - planeSize / 2;
let score = 0;
let obstacles = [];
let gameInterval;
let gameStartTime;
let playerName = 'Unknown';

document.getElementById('setName').onclick = function() {
  const playerNameInput = document.getElementById('playerNameInput').value.trim();
  if (playerNameInput === '') return;
  playerName = playerNameInput;
  document.getElementById('playerName').innerText = playerName;
  document.getElementById('gameControls').style.display = 'block';
  document.getElementById('nameSetup').style.display = 'none';
};

document.getElementById('startGame').onclick = function() {
  score = 0;
  planeX = canvas.width / 2 - planeSize / 2;
  obstacles = [];
  gameStartTime = Date.now();
  document.getElementById('score').innerText = score;
  document.getElementById('gameOverMessage').innerText = ''; 
  startGame();
};

function startGame() {
  gameInterval = setInterval(gameLoop, 50);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlane();
  handleObstacles();
  updateScore();
}

function drawPlane() {
  ctx.fillStyle = 'black';
  ctx.fillRect(planeX, canvas.height - planeSize - 10, planeSize, planeSize);
}

function handleObstacles() {
  if (Math.random() < 0.05) {
    obstacles.push({ x: Math.random() * (canvas.width - planeSize), y: 0 });
  }

  for (let i = 0; i < obstacles.length; ++i) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacles[i].x, obstacles[i].y, planeSize, planeSize);
    obstacles[i].y += 2;

    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      --i;
      continue;
    }

    if (obstacles[i].y >= canvas.height - planeSize - 10 &&
        obstacles[i].x < planeX + planeSize &&
        obstacles[i].x + planeSize > planeX) {
      endGame();
    }
  }
}

function updateScore() {
  const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
  document.getElementById('score').innerText = elapsedTime;
}

function endGame() {
  clearInterval(gameInterval);
  const finalScore = document.getElementById('score').innerText;
  document.getElementById('gameOverMessage').innerText = "GAME OVER!";
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft' && planeX > 0) {
    planeX -= 10;
  } else if (event.key === 'ArrowRight' && planeX < canvas.width - planeSize) {
    planeX += 10;
  }
});
