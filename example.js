// This code may have become depricated. For the most up to date version in your preferred language, go to the directory named with your preferred language.

// Accept an array as input.
const sourceArray = [15, 15, 15, 15, -2, 47, 11, 3, 4, 6, 8];

// Create variables
const arraySize = sourceArray.length;
const nodeArray = new Array(arraySize - 1);
const workingArray = new Array(arraySize);
let positiveWrites = 1;
let negativeWrites = 0;

function node(value, distance, markForDeletion) {
  this.value = value;
  this.distance = distance;
  this.markForDeletion = markForDeletion;
}

// For each element in sourceArray, create a node in nodeArray.
// Note: We are intentionally omitting the first element of sourceArray.
for (let i = 1; i < arraySize; i++) {
  nodeArray[i - 1] = new node(
    sourceArray[i],
    sourceArray[i] - sourceArray[0],
    markForDeletion = false,
  );
}

// Write Origin Value to workingArray.
workingArray[0] = sourceArray[0];

// Eliminate origin duplicates
for (let i = 0; i < nodeArray.length; i++) {
  if (nodeArray[i].distance === 0) {
    workingArray[positiveWrites] = nodeArray[i].value;
    positiveWrites++;
    nodeArray[i].markForDeletion = true;
  }
}

for (let i = nodeArray.length - 1; i > -1; i--) {
  if (nodeArray[i].markForDeletion === true) {
    nodeArray.splice(i, 1);
  }
}

// Graph Reduction Loop
while (nodeArray[0] !== undefined) {
  let smallestAbsoluteDistance = Infinity;
  // Write out nodes with distance of 1 or -1
  for (let i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].distance === 1) {
      workingArray[positiveWrites] = nodeArray[i].value;
      ++positiveWrites;
      nodeArray[i].markForDeletion = true;
    } else if (nodeArray[i].distance === -1) {
      workingArray[arraySize - 1 - negativeWrites] = nodeArray[i].value;
      ++negativeWrites;
      nodeArray[i].markForDeletion = true;
    } // Check if smallestAbsoluteDistance Should be reduced. If so, do it.
    else if (Math.abs(nodeArray[i].distance) < smallestAbsoluteDistance) {
      smallestAbsoluteDistance = Math.abs(nodeArray[i].distance);
    }
  }

  smallestAbsoluteDistance--;

  // Reduce the absolute distances of the remaining elements
  for (let i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].distance > 1) {
      nodeArray[i].distance -= smallestAbsoluteDistance;
    } else if (nodeArray[i].distance < -1) {
      nodeArray[i].distance += smallestAbsoluteDistance;
    }
  }

  // Remove nodes marked for deletion.
  for (let i = nodeArray.length - 1; i > -1; i--) {
    if (nodeArray[i].markForDeletion === true) {
      nodeArray.splice(i, 1);
    }
  }
  /*
  for (let i = 0; i < nodeArray.length; i++) {
    console.log(
      "Node Array Element " + i + ": " + "Value: " + nodeArray[i].value +
        "Distance: " + nodeArray[i].distance,
    );
  } */
}

// Copy values from sourceArray to workingArray.
// First, write the values that were less than the origin.
for (let i = positiveWrites; i < arraySize; i++) {
  sourceArray[i - positiveWrites] = workingArray[i];
}

// Second, write the values that were greater than or equal to the origin.
for (let i = 0; i < positiveWrites; i++) {
  sourceArray[i + negativeWrites] = workingArray[i];
}

console.log(sourceArray);
