// Default price of the item
let price = 19.5;

// Default cash in drawer (cid: Cash In Drawer)
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

// DOM elements
const inputCash = document.getElementById("cash");
const resultCash = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

// Function to format and display results
const formatResults = (status, change) => {
  resultCash.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(money => {
    resultCash.innerHTML += `<p>${money[0]}: $${money[1]}</p>`;
  });
};

// Function to handle user input and calculate change
const checkCashInput = () => {
  // Check if input cash is less than price
  if (Number(inputCash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    inputCash.value = "";
    return;
  }

  // Check if input cash equals price
  if (Number(inputCash.value) === price) {
    resultCash.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    inputCash.value = "";
    return;
  }

  let changeDue = Number(inputCash.value) - price;
  let reverseCid = [...cid].reverse(); // Reverse cid array for easier iteration

  // Prepare data structure for results
  let amount = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]; // Available currency denominations
  let result = { status: "OPEN", change: [] }; // Default status and empty change array
  let totalCid = parseFloat(cid.map(total => total[1]).reduce((prev, curr) => prev + curr).toFixed(2)); // Total cash in drawer

  // Check if total cash in drawer is less than change due
  if (totalCid < changeDue) {
    return (resultCash.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  // Check if total cash in drawer equals change due
  if (totalCid === changeDue) {
    formatResults('CLOSED', cid); // Display CLOSED status with current cash in drawer
    return;
  }

  // Iterate through cash denominations to calculate change
  for (let i = 0; i < reverseCid.length; i++) {
    if (changeDue >= amount[i] && changeDue > 0) {
      let count = 0;
      let total = reverseCid[i][1];
      while (total > 0 && changeDue >= amount[i]) {
        total -= amount[i];
        changeDue = parseFloat((changeDue - amount[i]).toFixed(2));
        count++;
      }
      result.change.push([reverseCid[i][0], count * amount[i]]); // Push denomination and amount to result change array
    }
  }

  // If change due is greater than 0 after iteration, display INSUFFICIENT_FUNDS
  if (changeDue > 0) {
    return (resultCash.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
  }

  // Format and display results
  formatResults(result.status, result.change);
  updateUI(result.change); // Update cash drawer display
};

// Function to handle click on purchase button
const checkResults = () => {
  if (!inputCash.value) {
    return; // If no input cash, do nothing
  }
  checkCashInput(); // Call function to check input cash
};

// Function to update cash drawer display in real-time
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
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2)); // Update amount in cid
    });
  }

  // Clear input cash field
  inputCash.value = "";

  // Update price screen with current item price
  priceScreen.textContent = `Total: $${price}`;

  // Update cash drawer display
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid.map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`).join('')}
  `;
};

// Event listener for click on purchase button
purchaseBtn.addEventListener("click", checkResults);

// Event listener for Enter key press in input cash field
inputCash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults(); // Call checkResults function on Enter key press
  }
});

// Initialize UI on page load
updateUI();
