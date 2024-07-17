// Get reference to the sort button
const sortButton = document.getElementById("sort");

// Function to handle sorting of input values
const sortInputArray = (event) => {
  event.preventDefault(); // Prevent form submission

  // Extract values from dropdowns and convert to numbers
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));
  
  // Choose a sorting algorithm (uncomment one of the following)
  // const sortedValues = bubbleSort(inputValues.slice()); // Bubble Sort
  // const sortedValues = selectionSort(inputValues.slice()); // Selection Sort
  const sortedValues = insertionSort(inputValues.slice()); // Insertion Sort

  updateUI(sortedValues); // Update UI with sorted values
}

// Function to update the UI with sorted values
const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

// Bubble Sort algorithm
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements if they are in the wrong order
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array; // Return the sorted array
}

// Selection Sort algorithm
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j; // Find the index of the minimum element
      }
    }
    // Swap the found minimum element with the first element
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array; // Return the sorted array
}

// Insertion Sort algorithm
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    // Shift elements of array[0..i-1] that are greater than currValue
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array; // Return the sorted array
}

// Event listener for when the sort button is clicked
sortButton.addEventListener("click", sortInputArray);