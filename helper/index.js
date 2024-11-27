// Levenshtein function to calculate the distance between two strings
function levenshtein(a, b) {
    const tmp = [];
    for (let i = 0; i <= a.length; i++) {
        tmp[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
        tmp[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            tmp[i][j] = Math.min(
                tmp[i - 1][j] + 1,
                tmp[i][j - 1] + 1,
                tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }
    return tmp[a.length][b.length];
}

// Main function to process the sentence
export function processSentence(sentence) {
    // Convert the sentence to lowercase and split into words
    const sentenceLowerCase = sentence.toLowerCase();
    const wordsArray = sentenceLowerCase.split(/\s+/);

    // Set initial boolean values for "temperature" and "humidity"
    let isTemperatureFound = false;
    let isHumidityFound = false;

    // Expected words
    const expectedWords = ["temperature", "humidity"];

    // Check for each word in the sentence
    wordsArray.forEach(word => {
        if (expectedWords.includes(word)) {
            if (word === "temperature") isTemperatureFound = true;
            if (word === "humidity") isHumidityFound = true;
        } else {
            // Suggest corrections if the word is close to "temperature" or "humidity"
            if (levenshtein(word, "temperature") <= 2) {
                console.log(`Did you mean 'temperature'?`);
                isTemperatureFound = true;
            }
            if (levenshtein(word, "humidity") <= 2) {
                console.log(`Did you mean 'humidity'?`);
                isHumidityFound = true;
            }
        }
    });

    // Output the result
    console.log(`Temperature found: ${isTemperatureFound}`);
    console.log(`Humidity found: ${isHumidityFound}`);

    // Return the result
    return isTemperatureFound || isHumidityFound;
}

