const fs = require('fs');

function findWordsWithSubstring(substring, wordsArray) {
    const lowerCaseSubstring = substring.toLowerCase();
    return wordsArray.filter(currentWord => currentWord.toLowerCase().includes(lowerCaseSubstring));
}

// Ensure at least one filename and a substring are provided
if (process.argv.length < 4) {
    console.log('Usage: node findWordsWithSubstring.js SUBSTRING FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const substring = process.argv[2];

// Process all files passed as arguments starting from the third position
for (let i = 3; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        const wordsArray = data.split('\n');

        // Find words containing the specified substring
        const wordsWithSubstring = findWordsWithSubstring(substring, wordsArray);

        console.log(`Words in ${filename} containing the substring "${substring}":`, wordsWithSubstring);
    });
}

