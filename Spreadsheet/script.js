// Object mapping infix operators to their corresponding functions
const infixToFunction = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
}

/**
 * Function to evaluate infix expressions by replacing matches of a regular expression
 * with the result of applying the corresponding operator function to the operands.
 * @param str - String representing the infix expression.
 * @param regex - Regular expression pattern used to match and extract operands and operators.
 * @returns Evaluated string after replacing matches.
 */
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

/**
 * Function to evaluate high precedence operations (* and /) in a string recursively.
 * @param str - Input string with mathematical operations.
 * @returns String with high precedence operations evaluated.
 */
const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return str === str2 ? str : highPrecedence(str2);
}

// Functions for spreadsheet operations
const sum = nums => nums.reduce((acc, el) => acc + el, 0);
const average = nums => sum(nums) / nums.length;
const isEven = num => num % 2 === 0;
const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;
    return isEven(length)
        ? average([sorted[middle], sorted[middle + 1]])
        : sorted[Math.ceil(middle)];
}

// Object containing spreadsheet functions
const spreadsheetFunctions = {
    "": nums => nums,
    sum,
    average,
    median,
    even: nums => nums.filter(isEven),
    someeven: nums => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map(num => num + 1),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: nums => range(...nums),
    nodupes: nums => [...new Set(nums).values()]
}

/**
 * Function to apply functions and operations to a string formula.
 * @param str - Input formula string.
 * @returns Modified string after applying operations and functions.
 */
const applyFunction = str => {
    const noHigh = highPrecedence(str);
    const infix = /([\d.]+)([+-])([\d.]+)/;
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = args => args.split(",").map(parseFloat);
    
    // Function to apply a function to arguments in a string
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    
    return str2.replace(functionCall, (match, fn, args) => 
        spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
}

/**
 * Function to generate an array of numbers within a specified range.
 * @param start - Starting value of the range.
 * @param end - Ending value of the range.
 * @returns Array of numbers within the specified range.
 */
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);

/**
 * Function to generate an array of characters between two specified characters.
 * @param start - Starting character of the range.
 * @param end - Ending character of the range.
 * @returns Array of characters within the specified range.
 */
const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

/**
 * Function to evaluate a formula by replacing cell references with their values.
 * @param x - Formula string to evaluate.
 * @param cells - Array of objects representing cells in a spreadsheet.
 * @returns Expanded and evaluated formula string.
 */
const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
    
    // Replace range references with expanded values
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    
    // Replace cell references with their values and apply functions
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
}

// Function to initialize spreadsheet upon window load
window.onload = () => {
    const container = document.getElementById("container");
    
    // Function to create labels (header cells) in the spreadsheet
    const createLabel = (name) => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        container.appendChild(label);
    }
    
    // Generate column labels (A-J)
    const letters = charRange("A", "J");
    letters.forEach(createLabel);
    
    // Generate row labels (1-99) and input cells
    range(1, 99).forEach(number => {
        createLabel(number);
        letters.forEach(letter => {
            const input = document.createElement("input");
            input.type = "text";
            input.id = letter + number;
            input.ariaLabel = letter + number;
            input.onchange = update; // Bind update function to input change event
            container.appendChild(input);
        })
    })
}

// Function to update spreadsheet cell values upon input change
const update = event => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    
    // Evaluate formula if it starts with '=' and update cell value
    if (!value.includes(element.id) && value.startsWith('=')) {
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
}
