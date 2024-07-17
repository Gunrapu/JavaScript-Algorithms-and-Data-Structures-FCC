// Function to calculate the mean of an array of numbers
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

// Function to calculate the median of an array of numbers
const getMedian = (array) => {
  // Sort the array
  const sorted = array.slice().sort((a, b) => a - b);
  // Determine the median based on array length
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
}

// Function to calculate the mode of an array of numbers
const getMode = (array) => {
  // Initialize an object to store counts of each element
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1; // Increment count for each element
  });
  
  // Check if all counts are the same, implying no mode
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  
  // Determine the mode(s)
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
  return mode.join(", ");
}

// Function to calculate the range of an array of numbers
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

// Function to calculate the variance of an array of numbers
const getVariance = (array) => {
  const mean = getMean(array);
  // Calculate variance using the mean
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

// Function to calculate the standard deviation of an array of numbers
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  // Calculate standard deviation as square root of variance
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

// Main calculation function triggered on form submission
const calculate = () => {
  // Fetch input value and parse into an array of numbers
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el)); // Convert to numbers and filter out NaNs
  
  // Calculate statistics
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);
  
  // Update HTML with results
  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}
