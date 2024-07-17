// Selecting DOM elements
const numberInput = document.getElementById("user-input"); // Input field for phone number
const checkButton = document.getElementById("check-btn"); // Button to check the phone number
const clearButton = document.getElementById("clear-btn"); // Button to clear the input and results
const result = document.getElementById("results-div"); // Div to display validation result

// Regex components
const countryCode = "^(1\\s?)?"; // Optional country code for US (+1) with optional space
const areaCode = "(\\([0-9]{3}\\)|[0-9]{3})"; // Area code format: (xxx) or xxx
const spacesDashes = "[\\s\\-]?"; // Optional space or dash
const phoneNumber = "[0-9]{3}[\\s\\-]?[0-9]{4}$"; // 7-digit phone number format

// Combined regex for US phone numbers
const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
);

// Event listener for check button click
checkButton.addEventListener("click", () => {
    // Check if input is empty
    if (numberInput.value === "") {
        alert("Please provide a phone number");
        return;
    }

    // Perform regex test on the input value
    const isValid = phoneRegex.test(numberInput.value);

    // Update result div based on validation result
    result.textContent = isValid
        ? "Valid US number: " + numberInput.value
        : "Invalid US number: " + numberInput.value;

    // Clear input field after checking
    numberInput.value = "";
});

// Event listener for clear button click
clearButton.addEventListener("click", () => {
    // Clear input field and result display
    numberInput.value = "";
    result.textContent = "";
});
