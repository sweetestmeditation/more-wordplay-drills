const fs = require('fs');

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node findWordsWithUs.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];
    console.log(`Processing file: ${filename}`);

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Filter out empty lines and words without only "U"s for vowels
        const wordsWithOnlyUs = wordsArray.filter(word => {
            const lowercaseWord = word.toLowerCase();

            return (
                word.trim() !== '' &&
                !/[aeio]/i.test(lowercaseWord) && // No other vowels
                /^[u]+$/i.test(lowercaseWord) // Only "U"s
            );
        });

        console.log(`Words with only "U"s for vowels in ${filename}:`, wordsWithOnlyUs);
    });
}

