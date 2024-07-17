// DOM elements
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

// Function to clean non-numeric characters from input
function cleanInputString(str) {
  const regex = /[+-\s]/g; // Regex to match non-numeric characters
  return str.replace(regex, ''); // Remove non-numeric characters from input string
}

// Function to check for invalid scientific notation inputs
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // Regex to match scientific notation (e.g., 1e3)
  return str.match(regex); // Returns true if input matches scientific notation
}

// Event listener function to add entry fields dynamically
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  // HTML template for new entry fields
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />`;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // Insert new entry fields
}

// Event listener function to calculate remaining calories
function calculateCalories(e) {
  e.preventDefault(); // Prevent default form submission

  isError = false; // Reset error flag

  // Select all input fields for each category
  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  // Get total calories from each category
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // Budgeted calories

  if (isError) {
    return; // Exit function if there's an error
  }

  // Calculate consumed and remaining calories
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

  // Determine surplus or deficit and display results
  const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide'); // Show output section
}

// Function to sum up calories from an array of input fields
function getCaloriesFromInputs(list) {
  let calories = 0;

  // Iterate through input fields and sum up valid numeric values
  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value); // Clean input value
    const invalidInputMatch = isInvalidInput(currVal); // Check for invalid scientific notation

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); // Alert user if invalid input detected
      isError = true; // Set error flag
      return null; // Return null to indicate error
    }

    calories += Number(currVal); // Add cleaned numeric value to total calories
  }

  return calories; // Return total calories
}

// Function to clear all input fields and reset output
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  // Clear all input fields
  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = '';
  }

  // Reset budget input and hide output
  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

// Event listeners for add entry, calculate calories, and clear form buttons
addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener('click', clearForm);
