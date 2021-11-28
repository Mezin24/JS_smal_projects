const loanInput = document.querySelector('#laon_amount');
const interestInput = document.querySelector('#interest');
const yearsInput = document.querySelector('#years');
const mounthlyOutput = document.querySelector('#monthly');
const totalOutput = document.querySelector('#total');
const interestOutput = document.querySelector('#interest');
const btn = document.querySelector('button');

function calcDisplayOutput(e) {
  e.preventDefault();

  console.log(loanInput.value);
}
btn.addEventListener('click', calcDisplayOutput);
