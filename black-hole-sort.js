// Task: Create a generic sorting algorithm with O(n) time complexity, disproving that one dude's mathematically sound proof that it cannot be done.

// Step 1: Accept an array as input.
let sourceArray = [15, -2, 47, 11, 3, 4, 6, 8];
const arraySize = sourceArray.length;
// Step 2: Convert to comparable form (But I'm not going to here).

// Step 2: Create variables
let nodeArray = new Array(arraySize - 1);
let workingArray = new Array(arraySize); 
let positiveWrites = 1;
let negativeWrites = 1;
function node(value, distance, markForDeletion) {
  this.value = value; 
  this.distance = distance;
  this.markForDeletion = markForDeletion; 
}

// Step 3: For each element in sourceArray, create a node in nodeArray.
// Note: We are intentionally omitting the first element of sourceArray.
for (let i = 1; i < sourceArray.length; i++) {
    nodeArray[i - 1] = new node(
    sourceArray[i],
    sourceArray[i] - sourceArray[0],
    markForDeletion = false
  );
}


// Step 5: Write Origin Value to workingArray.
workingArray[0] = sourceArray[0];

console.log("Checkpoint A Works!");

// Step 6: Implement Black Hole Algorithm.
while (nodeArray[0] !== undefined) {
  for (let i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].distance === 1) {
      workingArray[positiveWrites] = nodeArray[i].value;
      ++positiveWrites;
      nodeArray[i].markForDeletion = true;
    }

    else if (nodeArray[i].distance === -1) {
      workingArray[arraySize - negativeWrites] = nodeArray[i].value;
      ++negativeWrites;
      nodeArray[i].markForDeletion = true;
    }

    else if (nodeArray[i].distance > 1) {
      --nodeArray[i].distance;
    }

    else if (nodeArray[i].distance < -1) {
      ++nodeArray[i].distance;
    }
  }

  for (let i = nodeArray.length - 1; i > -1; i--) {
    if (nodeArray[i].markForDeletion === true) {
      nodeArray.splice(i, 1);
    }
  }
}

console.log("Checkpoint B Works");

negativeWrites--;

// Step 6: Copy values from sourceArray to workingArray.
for (let i = positiveWrites; i < arraySize; i++) {
  sourceArray[i - positiveWrites] = workingArray[i];
}

for (let i = 0; i < positiveWrites; i++) {
  sourceArray[i + negativeWrites] = workingArray[i];
}


console.log(sourceArray);
