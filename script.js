'use strict';

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0]; //Punti finali
// let currentScore = 0;
// let activePlayer = 0;
// let isPlaying = true;

let scores, currentScore, activePlayer, isPlaying;

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
}

function init() {
  //eliminare classe winner
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  //settare l'active player e aggiungere la classe active
  activePlayer = 0;
  player0EL.classList.add('player--active');
  //Azzerare scores
  scores = [0, 0];
  //Azzerare il current score
  currentScore = 0;
  //Azzerare punteggi finali e correnti
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //nascondere dado
  diceEl.classList.add('hidden');
  // isplaying true
  isPlaying = true;
}

//Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display the dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //3.Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish game
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
