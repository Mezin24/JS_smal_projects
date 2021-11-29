let min = 1,
  max = 10,
  winNumber = getRandomNumber(min, max),
  attemps = 3,
  isGameOver = false;

const game = document.querySelector('#game');
const guessEl = document.querySelector('#guess-input');
const submitEl = document.querySelector('#guess-btn');
const messageEl = document.querySelector('.message');

submitEl.addEventListener('click', checkNumber);

// use mousedown event on a parent element to replay the game!
game.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

function checkNumber(e) {
  e.preventDefault();
  const number = parseInt(guessEl.value);

  if (isNaN(number) || number > max || number < min) {
    displayMsg(`Please enter a number between ${min} and ${max}`, 'red');
    return;
  }

  if (number === winNumber) {
    gameOver(true, `${winNumber} is correct, YOU WIN!`);
    isGameOver = true;
    submitEl.value = 'Play Again!';
  } else if (attemps > 1) {
    attemps--;
    guessEl.value = '';
    displayMsg(`${number} is a wrong number, you have ${attemps} tries`, 'red');
    guessEl.style.borderColor = 'red';
  } else {
    gameOver(
      false,
      `${number} is a wrong number, YOU LOSE! The number is ${winNumber}`
    );
    isGameOver = true;
    submitEl.value = 'Play Again!';
  }
}

function displayMsg(msg, color) {
  messageEl.textContent = msg;
  messageEl.style.color = color;
}

function resetGame() {
  attemps = 3;
  isGameOver = false;
  guessEl.disabled = false;
  guessEl.value = '';
  submitEl.value = 'Submit';
  messageEl.textContent = '';
  guessEl.style.borderColor = 'grey';
}

function gameOver(win, msg) {
  const color = win ? 'green' : 'red';

  guessEl.disabled = true;
  guessEl.style.borderColor = color;
  displayMsg(msg, color);
  submitEl.classList.add('play-again');
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
