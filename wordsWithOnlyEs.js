const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node findWordsWithEs.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Filter out empty lines and words with only "E"s for vowels and at least 15 letters long
        const wordsWithOnlyEs = wordsArray.filter(word => {
            const lowercaseWord = word.toLowerCase();

            return (
                word.trim() !== '' &&
                !/[a-df-z]/i.test(lowercaseWord) && // No other vowels
                word.length >= 15 // At least 15 letters long
            );
        });

        console.log(`Words with only "E"s for vowels and at least 15 letters long in ${filename}:`, wordsWithOnlyEs);
    });
}



