const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node wordsMadeFromLetters.js FILENAME [FILENAME2 ...]');
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

        // Filter out empty lines and find words that can be made from the letters in "RSTLNE"
        const wordsMadeFromLetters = wordsArray.filter(word => {
            const availableLettersCopy = [...availableLetters];

            for (const letter of word) {
                const index = availableLettersCopy.indexOf(letter.toUpperCase());
                if (index === -1) {
                    return false; // Word contains a letter not in "RSTLNE"
                }
                availableLettersCopy.splice(index, 1);
            }

            return word.trim() !== '';
        });

        console.log(`Words that can be made from the letters in "RSTLNE" in ${filename}:`, wordsMadeFromLetters);
    });
}



