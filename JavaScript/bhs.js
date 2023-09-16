// PARADIGM CHANGES
// workingArray should not contain any instances of black holes. Instead, the number
// of instances of black holes will be contained in a counting variable blackHoles. This
// allows the nodeArray to have size arraySize - blackHoles, which may save on computations.f

function bhs(sourceArray) {

// Create variables
const arraySize = sourceArray.length;
const workingArray = new Array(arraySize);
let blackHoleValue = sourceArray[0];
let blackHoles = 0;

function node(value, distance, markForDeletion) {
  this.value = value;
  this.distance = distance;
  this.markForDeletion = markForDeletion;
}

// Write Black Hole and Equivalents to workingArray
let leftptr = 0;
for (let i = 0; i < arraySize; i++) {
  if (sourceArray[i] === blackHoleValue) {
    workingArray[leftptr] = blackHoleValue;
    blackHoles++;
    leftptr++;
  }
}

// Since we know how many times the black hole element appears, we can reduce the size
// of nodeArray before it is created, saving unnecessary node creations.
const nodeArraySize = arraySize - blackHoles;
const nodeArray = new Array(nodeArraySize);

// For each non black hole element in sourceArray, create a node in nodeArray.
leftptr = 0;
for (let i = 0; i < arraySize; i++) {
  if (sourceArray[i] !== blackHoleValue) {
    nodeArray[leftptr] = new node(
        sourceArray[i],
        sourceArray[i] - sourceArray[0],
        markForDeletion = false,
    )
        leftptr++;
    };
}


// Graph Reduction Loop
// Recall that there have already been blackHole number of writes to the left of
// workingArray. Therefore, set the positiveWrites value equal to blackHoles.
let positiveWrites = blackHoles;
let negativeWrites = 0;
while (nodeArray[0] !== undefined) {
  let smallestAbsoluteDistance = Infinity;

  // Write node values to workingArray whose node distances are 1 or -1:
  for (let i = 0; i < nodeArray.length; i++) {
    if (nodeArray[i].distance === 1) {
      workingArray[positiveWrites] = nodeArray[i].value;
      ++positiveWrites;
      nodeArray[i].markForDeletion = true;
    } else if (nodeArray[i].distance === -1) {
      workingArray[arraySize - 1 - negativeWrites] = nodeArray[i].value;
      ++negativeWrites;
      nodeArray[i].markForDeletion = true;
    } 
    
    // Check if smallestAbsoluteDistance should be reduced. If so, do it.
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
}

// Copy values from workingArray to sourceArray
// First, write the values that were less than the origin.
for (let i = positiveWrites; i < arraySize; i++) {
  sourceArray[i - positiveWrites] = workingArray[i];
}
// console.log(sourceArray);

// console.log(positiveWrites);
// console.log(sourceArray);
// Third, write the values that were greater than or equal to the origin.
for (let i = 0; i < positiveWrites; i++) {
  sourceArray[i + negativeWrites] = workingArray[i];
}

return sourceArray;
}

module.exports = bhs;