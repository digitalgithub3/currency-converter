
//https://v6.exchangerate-api.com/v6/6afaeacf29c11f247e2f9288/latest/USD
//https://api.currencylayer.com/list?access_key=16f71d4616fb0e73d7625fd1ea958013

const apiKey = '6afaeacf29c11f247e2f9288';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const currencyLayerApiKey = '16f71d4616fb0e73d7625fd1ea958013';
const currencyListApiUrl = `https://api.currencylayer.com/list?access_key=${currencyLayerApiKey}`;

let currencyData = {};
let currencyKeys = {};



async function getCurrencyName(){
  try {
    const resp = await fetch(currencyListApiUrl);
    const curname = await resp.json();
    // console.log(curname.currencies);
    currencyData = curname.currencies;
    //console.log(currencyData);
    
    currencyKeys = Object.keys(currencyData);
    console.log(currencyKeys);
    
    //document.getElementById('result').textContent = currencyKeys;
    
  } catch (error) {
    //console.error("Error loading currency list:", error);
    document.getElementById('result').textContent = `Error loading currency list: gcn`;
  }
  
  
    // console.log(currencyKeys[0]);
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  
  currencyKeys.forEach(currency => {
    const optionFrom = document.createElement('option');
    const optionTo = document.createElement('option');
    
    let currencyName = currencyData[currency];
    
    optionFrom.value = currency;
    optionTo.value = currency;
    optionFrom.textContent = `${currency} - ${currencyName}`;
    optionTo.textContent = `${currency} - ${currencyName}`;
    fromCurrency.appendChild(optionFrom);
    toCurrency.appendChild(optionTo);
    
    if(currencyName === "Zimbabwean Dollar"){
      document.getElementById('result').textContent = "--";
    }
    
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}



// Populate currency options
// async function loadCurrencies() {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     //console.log(data);
//     if(data.result === "success"){
//       currencyKeys = Object.keys(data.conversion_rates);
//       console.log("success");
//       getCurrencyName();
//       // console.log(typeof(currencyKeys));
//     } else {
//       document.getElementById('result').textContent = `Keys not found`;
//       console.log("fail");
//     }
//   } catch (error) {
//     //console.error("failed to load currencies:", error);
//     document.getElementById('result').textContent = `failed to load currency list: lc`;
//   }
  
//     // console.log(currencyKeys[0]);
//   const fromCurrency = document.getElementById('fromCurrency');
//   const toCurrency = document.getElementById('toCurrency');
  
//   currencyKeys.forEach(currency => {
//     const optionFrom = document.createElement('option');
//     const optionTo = document.createElement('option');
//     let currencyName = currencyData[currency];
    
//     optionFrom.value = currency;
//     optionTo.value = currency;
//     optionFrom.textContent = `${currency} - ${currencyName}`;
//     optionTo.textContent = `${currency} - ${currencyName}`;
//     fromCurrency.appendChild(optionFrom);
//     toCurrency.appendChild(optionTo);
    
//   });
//   fromCurrency.value = 'USD';
//   toCurrency.value = 'INR';
  
// }

// Convert currency
async function exchangeCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;
  if (!amount || isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
    const data = await response.json();
    if (data.result === "success") {
      const rate = data.conversion_rate;
      const convertedAmount = (amount * rate).toFixed(4);
      document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
      document.getElementById('result').textContent = "Conversion failed. Please try again.";
    }
  } catch (error) {
    document.getElementById('result').textContent = "Error: Could not retrieve exchange rate.";
    // console.error("Conversion error:", error);
  }
}
// Load currencies on page load
// loadCurrencies();
getCurrencyName();
//console.log(Object.keys(currencyData));






function interchangeCurrencies() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  document.getElementById('fromCurrency').value = toCurrency;
  document.getElementById('toCurrency').value = fromCurrency;
}

//Interchanging Currencies
document.querySelector('#exchange span').addEventListener("click", interchangeCurrencies);

//Live Result
let allsel = document.querySelectorAll('select');
// console.log(allsel)
allsel.forEach(item => {
  item.addEventListener("change", () => {
    // console.log(item);
    exchangeCurrency();
  });
});



document.getElementById('refresh').addEventListener("click", ()=>{
  location.reload();
})




