const fs = require('fs');

function countCharactersInPhrase(phrase) {
    const charCount = {};
    for (const char of phrase) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
}

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node countCharactersInFiles.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

// Arrays to store results
const fileResults = [];

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    const data = fs.readFileSync(filename, 'utf8');
    const phrasesArray = data.split('\n').filter(phrase => phrase.split(' ').length >= 2);

    console.log(`Character counts in phrases for ${filename}:`);

    const charCountList = phrasesArray.map(phrase => ({
        phrase,
        charCount: countCharactersInPhrase(phrase)
    }));

    fileResults.push({
        filename,
        charCountList
    });
}

// Display results
for (const { filename, charCountList } of fileResults) {
    console.log(`Results for ${filename}:`);
    for (const { phrase, charCount } of charCountList) {
        console.log(`Phrase: ${phrase}`);
        console.log('Character Counts:', charCount);
        console.log(); // Add a newline for better readability
    }
}

