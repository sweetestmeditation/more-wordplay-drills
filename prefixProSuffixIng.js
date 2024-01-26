const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node findWords.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Filter out empty lines and find words starting with "PRO", ending in "ING", and are exactly 11 letters long
        const wordsMatchingCriteria = wordsArray.filter(word => {
            const lowercaseWord = word.toLowerCase();

            return (
                word.trim() !== '' &&
                lowercaseWord.startsWith('pro') &&
                lowercaseWord.endsWith('ing') &&
                word.length === 11
            );
        });

        console.log(`Words starting with "PRO", ending in "ING", and are exactly 11 letters long in ${filename}:`, wordsMatchingCriteria);
    });
}
