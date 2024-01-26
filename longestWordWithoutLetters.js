const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node wordsWithoutLetters.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const excludedLetters = new Set('AEIOSHRTN');

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Filter out empty lines and find all words without the specified letters
        const wordsWithoutLetters = wordsArray.filter(currentWord => {
            const lowercaseWord = currentWord.toLowerCase();
            return ![...lowercaseWord].some(letter => excludedLetters.has(letter));
        });

        console.log(`Words without letters "${[...excludedLetters].join('')}" in ${filename}:`, wordsWithoutLetters.filter(word => !word.match(/[aeioshrtn]/gi)));
    });
}










