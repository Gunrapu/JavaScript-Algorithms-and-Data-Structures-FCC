// DOM elements
const numberInput = document.getElementById("number"); // Input field for number
const convertBtn = document.getElementById("convert-btn"); // Button to trigger conversion
const result = document.getElementById("output"); // Output area to display Roman numeral result

// Function to convert Arabic numeral to Roman numeral
const numeralToRoman = (num) => {
  // Roman numeral mappings
  const numerals = {
    1: 'I',    4: 'IV',   5: 'V',    9: 'IX',   10: 'X',
    40: 'XL',  50: 'L',   90: 'XC',  100: 'C',  400: 'CD',
    500: 'D',  900: 'CM', 1000: 'M'
  };

  let romanizedNumerals = ''; // Initialize empty string to store Roman numerals
  const arabicNumerals = Object.keys(numerals).reverse(); // Get keys in descending order

  // Iterate through each key (numeral value) in descending order
  arabicNumerals.forEach(key => {
    // Append corresponding Roman numeral while the key is less than or equal to num
    while (key <= num) {
      romanizedNumerals += numerals[key];
      num -= key; // Subtract key value from num
    }
  });

  return romanizedNumerals; // Return the Roman numeral string
};

// Function to validate user input and perform conversion
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value); // Convert input value to integer

  // Input validation checks
  if (!numberInput.value || isNaN(inputInt)) {
    result.innerText = "Please enter a valid number"; // Show error for non-numeric input
    return;
  } else if (inputInt === -1) {
    result.innerText = "Please enter a number greater than or equal to 1"; // Show error for -1 input
    return;
  } else if (inputInt >= 4000) {
    result.innerText = "Please enter a number less than or equal to 3999"; // Show error for input >= 4000
    return;
  }

  // If input is valid, convert and display the Roman numeral
  result.textContent = numeralToRoman(inputInt);
};

// Event listener for button click to trigger conversion
convertBtn.addEventListener("click", checkUserInput);

// Event listener for Enter key press in input field to trigger conversion
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput(); // Call checkUserInput function when Enter key is pressed
  }
});
