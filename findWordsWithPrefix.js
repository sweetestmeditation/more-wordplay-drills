const fs = require('fs');

function findWordsWithSubstring(substring, wordsArray) {
    const lowerCaseSubstring = substring.toLowerCase();
    return wordsArray.filter(currentWord => currentWord.toLowerCase().includes(lowerCaseSubstring));
}

function findWordsWithPrefix(prefix, wordsArray) {
    const lowerCasePrefix = prefix.toLowerCase();
    return wordsArray.filter(currentWord => currentWord.toLowerCase().startsWith(lowerCasePrefix));
}

// Ensure at least one filename and a prefix are provided
if (process.argv.length < 4) {
    console.log('Usage: node findWordsWithPrefix.js PREFIX FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const prefix = process.argv[2];

// Process all files passed as arguments starting from the third position
for (let i = 3; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Find words starting with the specified prefix
        const wordsWithPrefix = findWordsWithPrefix(prefix, wordsArray);

        console.log(`Words in ${filename} starting with the prefix "${prefix}":`, wordsWithPrefix);
    });
}

