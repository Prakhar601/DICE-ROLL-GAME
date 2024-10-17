'use strict';
// Selecting elements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0E0 = document.querySelector('#score--0');
const score1E1 = document.getElementById('score--1');
const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0E1 = document.getElementById('current--0');
const current1E1 = document.getElementById('current--1');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
    // Reset scores and active player
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Reset the scores displayed
    score0E0.textContent = 0;
    score1E1.textContent = 0;
    current0E1.textContent = 0;
    current1E1.textContent = 0;

    // Remove winner classes and active states
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');

    // Hide the dice
    diceE1.classList.add('hidden');
};

// Switching player logic
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E1.classList.toggle('player--active');
    player1E1.classList.toggle('player--active');
};

// Rolling functionality of the dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display the dice
        diceE1.classList.remove('hidden');
        diceE1.src = `dice-${dice}.png`;

        // Check the rolled dice
        if (dice !== 1) {
            // Add dice value to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch player if dice is 1
            switchPlayer();
        }
    }
});

// Hold button functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 10 (or 100 if desired)
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceE1.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// New game button functionality
btnNew.addEventListener('click', init);

// Initialize the game for the first time
init();
