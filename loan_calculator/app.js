document.querySelector('#loan-form').addEventListener('submit', function (e) {
  document.getElementById('results').classList.remove('d-block');
  document.getElementById('loading').classList.add('d-block');

  setTimeout(calcResult, 2000);

  e.preventDefault();
});

function calcResult() {
  const amountEl = document.getElementById('amount');
  const interestEl = document.getElementById('interest');
  const yearsEl = document.getElementById('years');
  // const calcEl = document.getElementById('calc');
  const monthlyEl = document.getElementById('monthly');
  const totalEl = document.getElementById('total');
  const totalInterestEl = document.getElementById('total-interest');

  const principal = +amountEl.value;
  const calculatedInterest = +interestEl.value / 100 / 12;
  const calculatedPayment = +yearsEl.value * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyEl.value = monthly.toFixed(2);
    totalEl.value = (monthly * calculatedPayment).toFixed(2);
    totalInterestEl.value = (monthly * calculatedPayment - principal).toFixed(
      2
    );
    document.getElementById('results').classList.add('d-block');
    document.getElementById('loading').classList.remove('d-block');
  } else {
    showError('Please check your numbers');
  }
}

function showError(error) {
  const card = document.querySelector('.card');
  const html = `
  <div class="alert alert-danger"">
  ${error}
</div>
  `;
  card.insertAdjacentHTML('afterbegin', html);

  document.getElementById('results').classList.add('d-none');
  document.getElementById('loading').classList.remove('d-block');

  setTimeout(removeError, 2000);
}

function removeError() {
  document.querySelector('.alert').remove();
}
