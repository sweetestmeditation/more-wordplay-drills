const fs = require('fs');

function findWordsWithPrefixSuffixLength(prefix, suffix, length, wordsArray) {
    const lowerCasePrefix = prefix.toLowerCase();
    const lowerCaseSuffix = suffix.toLowerCase();
    return wordsArray.filter(currentWord =>
        currentWord.toLowerCase().startsWith(lowerCasePrefix) &&
        currentWord.toLowerCase().endsWith(lowerCaseSuffix) &&
        currentWord.length >= length
    );
}

// Ensure at least one filename and a prefix, suffix, and length are provided
if (process.argv.length < 6) {
    console.log('Usage: node findWordWithPrefixSuffixLength.js PREFIX SUFFIX LENGTH FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const prefix = process.argv[2];
const suffix = process.argv[3];
const length = parseInt(process.argv[4]);

// Process all files passed as arguments starting from the fifth position
for (let i = 5; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Find words starting with the specified prefix, ending with the specified suffix, and having at least the specified length
        const wordsWithPrefixSuffixLength = findWordsWithPrefixSuffixLength(prefix, suffix, length, wordsArray);

        console.log(`Words in ${filename} starting with the prefix "${prefix}", ending with the suffix "${suffix}", and having at least length ${length}:`, wordsWithPrefixSuffixLength);
    });
}




