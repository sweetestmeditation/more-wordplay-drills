const fs = require('fs');

// Point values for each letter
const letterPoints = {
  'W': 12,
  'Z': 15,
  'E': -17
};

// Default point value for other letters
const defaultPoint = 1;

// Function to calculate the total points for a word
function calculatePoints(word) {
  return word.split('').reduce((total, letter) => {
    return total + (letterPoints[letter.toUpperCase()] || defaultPoint);
  }, 0);
}

// Function to read words from a file and filter by points
function filterWordsByPoints(filename, minPoints) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const words = data.split('\n').map(word => word.trim());

    // Filter words by points
    const filteredWords = words.filter(word => calculatePoints(word) >= minPoints);

    return filteredWords;
  } catch (error) {
    console.error(`Error reading file ${filename}: ${error.message}`);
    return [];
  }
}

// Specify the files to read
const files = ['baby_names_1880_short.txt', 'baby_names_2020_short.txt', 'countries.txt', 'sowpods.txt'];

// Specify the minimum points
const minPoints = 50;

// Iterate through each file and display words with at least 50 points
files.forEach(file => {
  const wordsWithPoints = filterWordsByPoints(file, minPoints);

  console.log(`Words with at least ${minPoints} points in ${file}:`);
  console.log(wordsWithPoints);
  console.log();
});
