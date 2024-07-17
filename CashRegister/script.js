//default price
let price = 3.26;

//default cash in drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const inputCash = document.getElementById("cash");
const resultCash = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const formatResults = (status, change) => {
  resultCash.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    (money) =>
      (resultCash.innerHTML += `<p>${money[0]}: $${money[1]}</p>`),
  );
  return;
};

//check user input
const checkCashInput = () => {
  if (Number(inputCash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    inputCash.value = "";
    return;
  }

  if (Number(inputCash.value) === price) {
    resultCash.innerHTML = "<p>No change due - customer paid with exact cash</p>"
    inputCash.value = "";
    return;
  }

let changeDue = Number(inputCash.value) - price;
let reverseCid = [...cid].reverse();

//prepare data structure
let amount = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
let result = 
  { 
    status: "OPEN", 
    change: [] 
  };
let totalCid =
    parseFloat(cid.map((total) => total[1]).reduce((prev, curr) => prev + curr).toFixed(2));

if (totalCid < changeDue) {
  return (resultCash.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
};

if (totalCid === changeDue) {
    formatResults('CLOSED', cid);
};

//Iterate through cash denominations
for (let i = 0; i <= reverseCid.length; i++) {
  if (changeDue >= amount[i] && changeDue > 0) {
    let count = 0;
    let total = reverseCid[i][1];
    while (total > 0 && changeDue >= amount[i]) {
      total -= amount[i];
      changeDue = parseFloat((changeDue -= amount[i]).toFixed(2));
      count++;
    }
    result.change.push([reverseCid[i][0], count * amount[i]]);
  }
}

if (changeDue > 0) {
    return (resultCash.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
}

  formatResults(result.status, result.change);
  updateUI(result.change);
};

//check result
const checkResults = () => {
  if (!inputCash.value) {
    return;
  }
  checkCashInput();
};

//update Cid UI realtime
const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };
  
  // Update cid if change is passed in
  if (change) {
    change.forEach((changeArr) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = "";
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map((money) => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

purchaseBtn.addEventListener("click", checkCashInput);

inputCash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults();
  }
});

updateUI();
