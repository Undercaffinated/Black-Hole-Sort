// Accept an array as input.
const sourceArray = [15, -2, 47, 11, 3, 4, 6, 8];

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

// Graph Reduction Loop
while (nodeArray[0] !== undefined) {
  for (let i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].distance === 1) {
      workingArray[positiveWrites] = nodeArray[i].value;
      ++positiveWrites;
      nodeArray[i].markForDeletion = true;
    } else if (nodeArray[i].distance === -1) {
      workingArray[arraySize - 1 - negativeWrites] = nodeArray[i].value;
      ++negativeWrites;
      nodeArray[i].markForDeletion = true;
    } else if (nodeArray[i].distance > 1) {
      --nodeArray[i].distance;
    } else if (nodeArray[i].distance < -1) {
      ++nodeArray[i].distance;
    }
  }

  for (let i = nodeArray.length - 1; i > -1; i--) {
    if (nodeArray[i].markForDeletion === true) {
      nodeArray.splice(i, 1);
    }
  }
}

// Step 6: Copy values from sourceArray to workingArray.
for (let i = positiveWrites; i < arraySize; i++) {
  sourceArray[i - positiveWrites] = workingArray[i];
}

for (let i = 0; i < positiveWrites; i++) {
  sourceArray[i + negativeWrites] = workingArray[i];
}

console.log(sourceArray);
