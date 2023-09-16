function measureExecutionTime(func, iterations) {
    const start = process.hrtime();

    for (let i = 0; i < iterations; i++) {
        func;
    }

const stop = process.hrtime();

    let elapsed = 1000 * (stop[0] - start[0]) + ( (stop[1] - start[1]) / 1000000 );
    return elapsed;
}


// -----------------------------------------
// SET ARRAY SIZE AND ITERATIONS
// -----------------------------------------
// Specifies the input size of the array to be sorted.
const MAX_ARRAY_SIZE = 100;
const MIN_ARRAY_SIZE = 1;

// Specifies the number of times you want the test to be run for each array size.
const iterations = 1;


// -----------------------------------------
// MAIN
// -----------------------------------------

// Load Dependencies
const fs = require('fs');
const { it } = require('node:test');

// Load files to be benchmarked
const BHS_STABLE = require('./bha_benchable');
const BHS_EXPERIMENTAL = require('./bhs_experimental')
const QUICKSORT = require('./qs_benchable');

// Check if an output file exists. If not, make it.
const fileExists = fs.existsSync('output.csv');
const csv_headers = "Program, Iterations, Array_Size, Total_Time, Average_Time\n";

if (!fileExists) {
    fs.appendFileSync('output.csv', csv_headers);
}

// Wrap the measurement and notetaking process into a loop that will take measurements of
// all array sizes between MIN_ARRAY_SIZE and MAX_ARRAY_SIZE
for (let i = MIN_ARRAY_SIZE; i < MAX_ARRAY_SIZE + 1; i++) {

    // Create an array full of random values
    let testArray = new Array(i);
    for (let j = 0; j < i; j++) {
        // Using Math.random, create random numbers of a large range.
        testArray[j] = Math.floor((Math.random() - .5) * 2 * Math.pow(10, j%10));
    }
    
    let stable_elapsed = measureExecutionTime(BHS_STABLE(testArray), iterations);
    let experimental_elapsed = measureExecutionTime(BHS_EXPERIMENTAL(testArray), iterations);
    let qs_elapsed = measureExecutionTime(QUICKSORT(testArray), iterations);

    // Complie and export data to CSV
    let row_1_data = ["BHS_Stable", iterations, MAX_ARRAY_SIZE, stable_elapsed, stable_elapsed / iterations];
    let row_2_data = ["BHS_Experimental", iterations, MAX_ARRAY_SIZE, experimental_elapsed, experimental_elapsed / iterations];
    let row_3_data = ["QuickSort", iterations, MAX_ARRAY_SIZE, qs_elapsed, qs_elapsed / iterations];

    let row_1_csv = row_1_data.join(',') + '\n';
    let row_2_csv = row_2_data.join(',') + '\n';
    let row_3_csv = row_3_data.join(',') + '\n';

    fs.appendFileSync('output.csv', row_1_csv);
    fs.appendFileSync('output.csv', row_2_csv);
    fs.appendFileSync('output.csv', row_3_csv);
}

console.log("Done!");