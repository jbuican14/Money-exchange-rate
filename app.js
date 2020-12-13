const currencyElem_one = document.getElementById('currency-one');
const currencyElem_two = document.getElementById('currency-two');
const amountElem_one = document.getElementById('amount-one');
const amountElem_two = document.getElementById('amount-two');
const rateElem = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  console.log('INSIDE calculate');
  const currency_one = currencyElem_one.value;
  const currency_two = currencyElem_two.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.rates[currency_two];
      // console.log(rate);
      rate
        ? (rateElem.innerText = `1 ${currency_one} = ${rate} ${currency_two}`)
        : (rateElem.innerHTML = `<span style="color:red">Currency ${currency_two} is not available </span>`);

      rate
        ? (amountElem_two.value = (amountElem_one.value * rate).toFixed(2))
        : (amountElem_two.value = `Not Available`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Event listeners
currencyElem_one.addEventListener('change', calculate);
currencyElem_two.addEventListener('change', calculate);
amountElem_one.addEventListener('input', calculate);
amountElem_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyElem_one.value;
  currencyElem_one.value = currencyElem_two.value;
  currencyElem_two.value = temp;
  calculate();
});

calculate();
