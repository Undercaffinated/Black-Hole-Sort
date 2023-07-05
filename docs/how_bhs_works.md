# Usage

BHS takes an array as input and sorts the array, returning a mutated source array. 

`SourceArray ->  |BHS| -> Source Array`

For example:
In JavaScript:
```
let sourceArray = [12, 5, -4, 16, 39];
sourceArray = bhs(sourceArray);
console.log(sourceArray);
// Expected Output: [-4, 5, 12, 16, 39]
```

Non-Integer arrays can also theoretically be sorted, but I have not yet designed the implementation to do so. For now, just know that any array of any data type is theoretically sortable as long as an integer "distance" can be calculated between elements. If you have any questions or ideas, check out the relevant github discussions.


# Under the Hood

BHS is performed over three steps:

1. **Data Preparation** - All the data and resources required for BHS to work are created and initialized. This step involves identifying the black hole and any duplicates, and creating a node array based on the remaining elements of the source array.

2. **Graph Reduction Loop** - Once the source data has been processed, a new array full of nodes (here called "stars") will exist. The GRL is able to take the node array and "consume" stars based on their distance to the black hole. This is done iteratively, where the stars closest to the black hole are destroyed before further out stars are. When a star is destroyed, the value of the node is written to a working array, which when the GRL is completed, the working array will be completely filled in and sorted, but will also be shifted some number of indeces.

3. **Outpus Interpolation** - This step involves writing values from the working array back into the souce array. This step is able to compensate for the shift introduced by the GRL and results in a fully sorted source array.