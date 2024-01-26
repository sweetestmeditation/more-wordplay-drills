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

    return {
        mostCommonPrefix: findMaxKeyValue(prefixes),
        mostCommonSuffix: findMaxKeyValue(suffixes),
    };
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

// Process all files passed as arguments starting from the third position
for (let i = 3; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Find the most common prefix and suffix
        const { mostCommonPrefix, mostCommonSuffix } = findMostCommonPrefixSuffix(minLength, wordsArray);

        console.log(`Most common prefix in ${filename}: "${mostCommonPrefix}"`);
        console.log(`Most common suffix in ${filename}: "${mostCommonSuffix}"`);
    });
}
