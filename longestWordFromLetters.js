const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node longestWordFromLetters.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const availableLetters = 'RSTLNE'.split('');

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Filter out empty lines and find all words with the longest length that can be made from the letters in "RSTLNE"
        const longestWordsFromLetters = wordsArray.reduce((longestWords, currentWord) => {
            const availableLettersCopy = [...availableLetters];

            for (const letter of currentWord) {
                const index = availableLettersCopy.indexOf(letter.toUpperCase());
                if (index === -1) {
                    return longestWords; // Word contains a letter not in "RSTLNE"
                }
                availableLettersCopy.splice(index, 1);
            }

            if (currentWord.trim() !== '' && currentWord.length === longestWords[0].length) {
                longestWords.push(currentWord);
            } else if (currentWord.trim() !== '' && currentWord.length > longestWords[0].length) {
                return [currentWord];
            }

            return longestWords;
        }, ['']);

        console.log(`Longest words that can be made from the letters in "RSTLNE" in ${filename}:`, longestWordsFromLetters);
    });
}


