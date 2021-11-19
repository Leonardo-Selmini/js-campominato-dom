let gameState = {
  counter: 0,
  bombs: 0,
  squares: 0
}

document.getElementById('play').addEventListener('click', createGame)
function createGame() {
  
  document.getElementById('banner').classList.remove('visible')

  let difficulty = document.getElementById('difficulty').value;
  let gameClass = 'width-7';

  switch (difficulty) {
    case 'easy':
      gameClass = 'width-7';
      gameState.squares = 49;
      gameState.bombs = 7;
      break;
    case 'medium':
      gameClass = 'width-10';
      gameState.squares = 100;
      gameState.bombs = 20;
      break;
    case 'hard':
      gameClass = 'width-14';
      gameState.squares = 196;
      gameState.bombs = 60;
      break;
  }
  spawnSquare(gameState.squares, gameClass);
  spawnBombs(gameState.bombs, gameState.squares);
}

function updateScore(isBomb) {
  let banner = document.getElementById('banner');
  let result = document.getElementById('result');
  let resultCounter = document.getElementById('result-counter');

  if (isBomb) {
    //hai perso
    banner.classList.add('visible');
    result.innerHTML = 'Hai perso';
    resultCounter.innerHTML = gameState.counter;
    gameState.counter = 0;
  } else {
    gameState.counter++;
  }

  if (gameState.counter == gameState.squares - gameState.bombs) {
    //hai vinto
    banner.classList.add('visible');
    result.innerHTML = 'Hai vinto';
    resultCounter.innerHTML = gameState.counter;
    gameState.counter = 0;
  }

  document.getElementById('counter').innerHTML = gameState.counter;
  document.getElementById('restart-btn').addEventListener('click', function () {
    createGame()
  })
}

function spawnSquare(nSquare, classeWidth) {
  // svuoto la griglia
  document.getElementById('grid').innerHTML = '';
  // genero n quadrati = al segnaposto nSquare
  for (let i = 0; i < nSquare; i++) {
    let div = document.createElement('div');
    // do classe square di base + segnaposto classeWidth
    div.classList.add('square', classeWidth);
    // aggiungo funzionalità con il click
    div.addEventListener('click', function () {
      if (!div.classList.contains('active')) {
        div.classList.add('active');
        updateScore(false)
      }
    })
    // inserisco il quadrato nella griglia
    document.getElementById('grid').appendChild(div);
  }
}

function nRandom(max, min) {
  Math.floor(Math.random() * (max - min + 1) + min);
}

function spawnBombs(nBomb, nSquare) {
  let squares = document.getElementsByClassName('square');
  let bombs = [];
  while (bombs.length < nBomb) {
    let bomb = Math.floor(Math.random() * nSquare + 1);
    if (bombs.includes(bomb) == false) {
      bombs.push(bomb);
      squares[bomb - 1].innerHTML = `<i class="fas fa-bomb"></i>`
      squares[bomb - 1].addEventListener('click', function () {
        squares[bomb - 1].classList.add('bg-bomb')
        updateScore(true);
        showBombs(squares, bombs);
      })
    }
  }
}

function showBombs(squares, bombs) {
  for (let i = 0; i < bombs.length; i++) {
    squares[bombs[i] - 1].classList.add('bg-bomb')
  }
}

