// Get references to DOM elements
const buttonCheck = document.getElementById('check-btn'); // Button for checking palindrome
const resultText = document.getElementById('result'); // Element to display result message
const inputField = document.getElementById('text-input'); // Input field for user input

// Function to check if a string is a palindrome
function palindrome() {
  // Get the input value and remove special characters, spaces, and make it lowercase
  const inputText = inputField.value;
  const cleanedInput = inputText.replace(/[^A-Z0-9]/ig, "").toLowerCase();

  // Reverse the cleaned string for comparison
  const reversedInput = cleanedInput.split('').reverse().join('');

  // Check for empty input
  if (inputText.trim() === "") {
    alert("Please input a value");
    return;
  }

  // Check if the cleaned input matches its reversed version
  if (cleanedInput === reversedInput) {
    resultText.innerHTML = `<p>${inputText} is a palindrome</p>`;
  } else {
    resultText.innerHTML = `<p>${inputText} is not a palindrome</p>`;
  }
}

// Event listener for the button click to initiate palindrome check
buttonCheck.addEventListener("click", palindrome);
