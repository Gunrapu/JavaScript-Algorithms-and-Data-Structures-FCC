
# buildPyramid Function

The buildPyramid function generates a pyramid pattern using a specified character and number of rows.

## Usage/Examples

const pyramid = buildPyramid(character, count);

console.log(pyramid);

## Parameter

character: (string) The symbol used to build the pyramid.

count: (number) The number of rows in the pyramid.

## Description

The buildPyramid function constructs a pyramid pattern where each row is formed by adding spaces and the character. The number of character in each row increases as you move down the pyramid.

## Example

For example, using character = "B" and count = 5:

         B
        BBB
       BBBBB
      BBBBBBB
     BBBBBBBBB

This illustrates how the buildPyramid function creates a pyramid pattern based on the provided parameters.