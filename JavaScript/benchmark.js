const fs = require('fs');
const bha = require('./bha_benchable');
const qs = require('./qs_benchable');

function measureExecutionTime(func, iterations) {
    const start = process.hrtime();

    for (let i = 0; i < iterations; i++) {
        func;
    }

    const stop = process.hrtime();

    let elapsed = 1000 * (stop[0] - start[0]) + (stop[1] - start[1]) / 1000000;
    return elapsed;
}


// Specifies the input size of the array to be sorteßd by bha_benchable.js
const arraySize = 1000;

// Specifies the number of times you want bha_benchable.js to be run.
const iterations = 1;

// Create an array full of random values
let testArray = new Array(arraySize);
for (let i = 0; i < arraySize; i++) {
    // Using Math.random, create random numbers of a large range.
    testArray[i] = Math.floor((Math.random() - .5) * 2 * Math.pow(10, i%10));
}

console.log(testArray);

let bha_elapsed = measureExecutionTime(bha(testArray), iterations);
let qs_elapsed = measureExecutionTime(qs(testArray), iterations);

console.log(bha_elapsed);
console.log(qs_elapsed);