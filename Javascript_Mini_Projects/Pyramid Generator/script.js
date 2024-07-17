function buildPyramid(character, count) {
    const rows = [];
    let inverted = false;

    // Function to pad each row with spaces and characters
    function padRow(rowNumber, rowCount) {
        return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
    }

    // Build the rows of the pyramid
    for(let i = 1; i <= count; i++) {
        if (inverted) {
            rows.unshift(padRow(i, count));
        } else {
            rows.push(padRow(i, count));
        }
    }

    // Join rows with newline character to form the result string
    const result = rows.join("\n");

    return result;
}

// Example usage:
const character = "B"
const count = 8
const pyramid = buildPyramid(character, count);
console.log(pyramid)