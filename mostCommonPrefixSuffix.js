const fs = require('fs');

function findMostCommonPrefixSuffix(minLength, wordsArray) {
    const prefixes = {};
    const suffixes = {};

    for (const word of wordsArray) {
        if (word.length >= minLength) {
            const prefix = word.slice(0, minLength).toUpperCase();
            const suffix = word.slice(-minLength).toUpperCase();

            prefixes[prefix] = (prefixes[prefix] || 0) + 1;
            suffixes[suffix] = (suffixes[suffix] || 0) + 1;
        }
    }

    return { prefixes, suffixes };
}

function findMaxKeyValue(obj) {
    let maxKey = '';
    let maxValue = 0;

    for (const key in obj) {
        if (obj[key] > maxValue) {
            maxKey = key;
            maxValue = obj[key];
        }
    }

    return maxKey;
}

// Ensure at least one filename and a minimum length are provided
if (process.argv.length < 4) {
    console.log('Usage: node mostCommonPrefixSuffix.js MIN_LENGTH FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const minLength = parseInt(process.argv[2]);
const allPrefixes = {};
const allSuffixes = {};

// Process all files passed as arguments starting from the third position
for (let i = 3; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    const data = fs.readFileSync(filename, 'utf8');
    const wordsArray = data.split('\n');

    // Find the most common prefix and suffix for each file
    const { prefixes, suffixes } = findMostCommonPrefixSuffix(minLength, wordsArray);

    // Update the overall count
    for (const prefix in prefixes) {
        allPrefixes[prefix] = (allPrefixes[prefix] || 0) + prefixes[prefix];
    }

    for (const suffix in suffixes) {
        allSuffixes[suffix] = (allSuffixes[suffix] || 0) + suffixes[suffix];
    }
}

// Find the most common prefix and suffix overall
const mostCommonPrefix = findMaxKeyValue(allPrefixes);
const mostCommonSuffix = findMaxKeyValue(allSuffixes);

console.log(`Most common prefix across all files: "${mostCommonPrefix}"`);
console.log(`Most common suffix across all files: "${mostCommonSuffix}"`);

