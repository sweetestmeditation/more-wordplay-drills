const fs = require('fs');

function countAsInWord(word) {
    return (word.match(/A/gi) || []).length;
}

// Ensure at least one filename is provided
if (process.argv.length < 3) {
    console.log('Usage: node countAsInFiles.js FILENAME [FILENAME2 ...]');
    process.exit(1);
}

// Arrays to store results
const fileResults = [];

// Process all files passed as arguments
for (let i = 2; i < process.argv.length; i++) {
    const filename = process.argv[i];

    // Read the file and print its contents.
    const data = fs.readFileSync(filename, 'utf8');
    const wordsArray = data.split('\n');

    console.log(`Results for ${filename}:`);

    const wordCountList = wordsArray.map(word => ({ word, count: countAsInWord(word) }));
    
    for (const { word, count } of wordCountList) {
        console.log(`Word: ${word}, Count of "A"s: ${count}`);
    }
    
    console.log(); // Add a newline for better readability

    fileResults.push({
        filename,
        wordCountList
    });
}

// Display overall results
console.log('Overall Results:');
for (const { filename, wordCountList } of fileResults) {
    console.log(`Total Count of "A"s in ${filename}: ${wordCountList.reduce((sum, entry) => sum + entry.count, 0)}`);
}

