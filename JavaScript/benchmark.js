const fs = require('fs');
const bha = require('./bha_benchable');
const bhs = require('./bhs_experimental')
const qs = require('./qs_benchable');
const { it } = require('node:test');

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

let bha_elapsed = (measureExecutionTime(bha(testArray), iterations) / iterations);
let bhs_elapsed = (measureExecutionTime(bhs(testArray), iterations) / iterations);
let qs_elapsed = (measureExecutionTime(qs(testArray), iterations) / iterations);

console.log("BHS_STABLE (s): ", bha_elapsed);
console.log("BHA_EXPERIMENTAL (s): ", bhs_elapsed);
console.log("QuickSort (s): ", qs_elapsed);