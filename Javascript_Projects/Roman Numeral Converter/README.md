# Roman Numeral Converter

This project is a simple web application that converts Arabic numerals (1 to 3999) into Roman numerals. It includes an HTML form where users can input a number, a CSS file for styling, and a JavaScript file for functionality.

## Features

- Convert Arabic to Roman Numerals: Enter a number and click the "Convert" button to see its Roman numeral equivalent.
- Input Validation: Validates user input to ensure it's a valid number between 1 and 3999.
- Responsive Design: Designed to work on various screen sizes using CSS media queries.

## Usage

    1. Open the Roman Numeral Converter in your web browser.
    2. Enter a number in the input field labeled "Enter a Number".
    3. Click the "Convert" button or press Enter after inputting the number.
    4. The Roman numeral equivalent of the entered number will be displayed below the input field.

## Tech Stack

**Client:** HTML5, CSS3, JavaScript (ES6)

## User Stories

    1. You should have an input element with an id of "number"
    2. You should have a button element with an id of "convert-btn"
    3. You should have a div, span or p element with an id of output
    4. When you click on the #convert-btn element without entering a value into the #number element, the #output element should contain the text "Please enter a valid number"
    5. When the #number element contains the number -1 and the #convert-btn element is clicked, the #output element should contain the text "Please enter a number greater than or equal to 1"
    6. When the #number element contains the number 4000 or greater and the #convert-btn element is clicked, the #output element should contain the text "Please enter a number less than or equal to 3999"
    7. When the #number element contains the number 9 and the #convert-btn element is clicked, the #output element should contain the text "IX"
    8. When the #number element contains the number 16 and the #convert-btn element is clicked, the #output element should contain the text "XVI"
    9. When the #number element contains the number 649 and the #convert-btn element is clicked, the #output element should contain the text "DCXLIX"
    10. When the #number element contains the number 1023 and the #convert-btn element is clicked, the #output element should contain the text "MXXIII"
    11. When the #number element contains the number 3999 and the #convert-btn element is clicked, the #output element should contain the text "MMMCMXCIX"

## Credits

This project was developed as part of the FreeCodeCamp JavaScript certificate project. For more information, visit FreeCodeCamp.