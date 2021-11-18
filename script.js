document.getElementById('play').addEventListener('click', function(){
  let difficulty = document.getElementById('difficulty').value;
  switch(difficulty) {
    case 'easy':
      spawnSquare(100, 'width-10');
      break;
    case 'medium':
      spawnSquare(225, 'width-15')
      break;
    case 'hard':
      spawnSquare(400, 'width-20')
      break;
  }
})

// 00000000 FUNZIONI 00000000

// spawnSquare serve per generare n (segnaposto nSquare) quadrati di lunghezza x (segnaposto classeWidth)
function spawnSquare(nSquare, classeWidth) {
  // svuoto la griglia
  document.getElementById('grid').innerHTML = '';
  // genero n quadrati = al segnaposto nSquare
  for (let i = 0; i <nSquare; i++) {
    let div = document.createElement('div');
    // do classe square di base + segnaposto classeWidth
    div.classList.add('square', classeWidth);
    // aggiungo funzionalità con il click
    div.addEventListener('click', function() {
      div.classList.add('active');
    })
    // inserisco il quadrato nella griglia
    document.getElementById('grid').appendChild(div);
  }
}