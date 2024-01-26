const fs = require('fs');

function countLetterInWord(word, letter) {
    const regex = new RegExp(letter, 'gi');
    return (word.match(regex) || []).length;
}

// Ensure at least one filename is provided
if (process.argv.length < 4) {
    console.log('Usage: node countLetterInWord.js LETTER FILENAME [FILENAME2 ...]');
    process.exit(1);
}

const letterToCount = process.argv[2];

// Process all files passed as arguments
for (let i = 3; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    const data = fs.readFileSync(filename, 'utf8');
    const wordsArray = data.split('\n');

    console.log(`Count of "${letterToCount}"s in ${filename}:`);
    const wordCountList = wordsArray.map(word => ({
        word,
        count: countLetterInWord(word, letterToCount)
    }));

    for (const { word, count } of wordCountList) {
        console.log(`Word: ${word}, Count of "${letterToCount}"s: ${count}`);
    }
    console.log(); // Add a newline for better readability
}
