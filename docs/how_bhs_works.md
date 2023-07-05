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


# Overview

BHS is performed over three phases:

1. **Data Preparation** - All the data and resources required for BHS to work are created and initialized. This step involves identifying the black hole and any duplicates, and creating a node array based on the remaining elements of the source array.

2. **Graph Reduction Loop** - Once the source data has been processed, a new array full of nodes (here called "stars") will exist. The GRL is able to take the node array and "consume" stars based on their distance to the black hole. This is done iteratively, where the stars closest to the black hole are destroyed before more distant stars are. When a star is destroyed, the value of the node is written to a working array, which when the GRL is completed, the working array will be completely filled in and sorted, but will also be shifted some number of indeces.

3. **Output Interpolation** - This step involves writing values from the working array back into the souce array. This step is able to compensate for the shift introduced by the GRL and results in a fully sorted source array.

# In-Depth Explanations

*Since the most optimal implementation of BHS can vary based on language, I will avoid using specific code examples. When I refer to variables or other data structures, I mean for them to be interpreted in the most abstract way so as not to be confusing. If you'd like to see how a particular language can utilize BHS, take a look at the language specific directories.*

*Also worth noting, for all of my descriptions, I will objects when they become relevant. This may not align with when specifically they are created. Don't assume because a variable is first mentioned in some specific scope that the object is created there.*

## Core Concept

The BHS treats input data as one of two things, a black hole or a star. Just like in our own universe, black holes often appear in the center of huge systems of stars, pulling them inward by gravity. The BHS borrows this idea, where a black hole is defined as a central point and all the other stars orbit around it. This can be represented graphically with a graph of nodes where a single, central node (the black hole) is connected to every star. This connection has the unique property of having a particular distance to the black hole.

During the Graph Reduction Loop, which is the main sorting process, stars are pulled in by gravity. When a star reaches the black hole, it is consumed, the star is removed from its array and the star's value is recorded to a working array. Later, this working array will be used to modify the original source array.

## Phase 1 - Data Preparation

### Input

BHS requires a handful of items to operate. Obviously, it needs some input. For simplicity, I will use an array of integers as my example, but this idea will eventually extend to virtually all data types.

*Note: I may use both terms source array and input array interchangeably. They mean the same thing.*

### The Working Array

The working array is a temporary holding place for all the sorted data coming from **Data Preparation** and the **Graph Reduction Loop**. The size of this array is equal to the size of the input array.

Values are written the working array in three situations:
1. From left to right, the value of the black hole is written to the working array once for each black hole in the input array.
2. From left to right, following the black hole values, once every time a star with a positive distance is destroyed.
3. From right to left starting at the final element of the array, one value is written every time a star with a negative distance is destroyed.

### Identifying Black Holes

For those of you already familiar with how QuickSort works, you may find identifying black holes as very similar to determining a pivot.

The BHS operates by noting the value of the first element of the input array. The value of the first element, not the element itself, becomes associated with being a black hole. This value is maintained by its own variable. After the black hole value has been identified, a star array (described below) is created from every element in the array whose value is not equal to the black hole. For all the black hole values, they are immediately written to the working array from left to right. This results in the first n elements of the working array (n = number of black holes) being filled with the black hole value.

### The Star Array

We will require a specialized data structure. This structure is an array of nodes, each node being a "star". Stars themselves are instances of a star class (depending on the language) which contain three pieces of information: the value of the element they are based on, their distance to the black hole, and a boolean which keeps track of whether the star should be destroyed during a particular iteration of GRL. For this example, I will refer to these as the star's value, distance, and markedForDeletion respectively.

Each star's value is equal to the value of the element it was based on. For instance, the stars based on this array `[19, 6, 43]` will have the values `6` and `43` respectively.

*Recall that the first element is considered a black hole and therefore will not have a star associated with it.*

Each star's distance is a signed value which represents both the direction and distance one would have to travel from the black hole to the individual star. For example, stil using the above arrays, the two stars would have distances of `-13` and `24` respectively. This results in potentially negative distances. This is totally fine and is in fact critical to the operation of BHS.

Finally, each star in the star's markedForDeletion is initialized to `False`.

Naturally, the length of the star array will be equal to the length of the input array minus the number of identified black holes.

### Positive and Negative Writes

By now I've mentioned that the Working array is a sorted, albeit shifted array that will have to be un-shifted when it is copied back to the source array. While certain techniques exist to identify where a shift in an array occurs, I find it is easier to instead keep track of how many times a value greater than or equal to the black hole or a value less than the value of the black hole is written to the working array. I use an int variable for both.

#### Positive Writes

This value is initialized to 0 and is incremented every time a value greater than or equal to the black hole is written into the working array.

This value will be incremented n times during the **Data Preparation** step, n being the number of black holes in the array. This value will also be incremented some number of times t during the **Graph Reduction Loop** equal to the number of stars with positive distances, hence the name.

This value is frequently used as a pointer to an index in the working array. As new values are added and the positive writes value increments, new values will keep being added to the right of already existing data. Later, during **Output Interpolation** this value will conveniently point to the index in the working array of the element with the lowest value.

#### Negative Writes

This value keeps track of how many elements have been written from right to left in the working array. This value increments every time a star with a negative distance is destroyed and is used as a pointer to the next empty index of the working array to the left of existing data. This pointer at any time points to workingArray[length of working array - 1 - negative writes].

### Other Variables

There are a few other variables that are used. That said, they won't be mentioned during this explanation and are self-explanatory in the code. If you're curious, you'll have to read the code.

### Recap

I realize that was a lot. Here's a quick list of everything that exists at the end of the **Data Preparation** phase:
1. The input array.
2. A partially filled in working array which is the same size as the input array.
3. A star array containg stars for every element in the input array that was not a black hole.
4. One variable each keeping track of the number of positive and negative writes that have been made to the working array. At this stage, positive writes will be >= 1 and negative writes will equal 0.

## Phase 2 - The Graph Reduction Loop (GRL)

Finally, the real sorting can take place!

During each iteration of the GRL, BHS checks each element of the star array to see if any star has a distance of +/- 1 from the black hole. When such a star is identified, a few things happen.

First, the value of the star is written to the appropriate position in the working array. This position is determined by the positive writes or negative writes variable, whichever applies. The applicable positive or negative writes variable is incremented.

Second, the identified star(s) are marked for deletion.

For every star whose absolute distance (the absolute value of its distance) is greater than one, the GRL checks it against a value called the smallest absolute distance. This is part of a major computation time optimization, which I will explain in a moment. For now, just know that the program will know exactly how far out the next closest star is at the end of the iteration.

After the first pass over the star array, a second pass is made to remove all of the stars that were marked for deletion.

*Note: At some point this method may be phased out, instead checking against the star's distance. However, this is the current implementation, so I will describe it here.*

Once the marked stars are removed, the array is updated so that it only contains the stars that were not destroyed. At this stage, the star array size has shrunk.

It is at this point that the smallest absolute distance value becomes relevant. All stars are "pulled in" toward the black hole by the smallest absolute distance less 1. This means that there will always be at least one star to be removed on the subsequent GRL iteration. Previous versions of the BHS instead reduced the distance to each star by 1, which meant the range of values in the input array added its own time complexity factor. This method prevents unnecessary loop iterations and ensures O(n), not O(range) time complexity.

The GRL continues like this until every star has been destroyed. In some languages, this manifests as a while loop whose condition is that the length of the array is != 0. In others, it may be faster to check whether the 0th index is defined. In either case, the loop ends.

### Results of the GRL

The GRL accomplishes a few things:
1. The working array has been completely filled in and is now sorted, albeit shifted right by a number of indeces equal to the value of positive writes.
2. The star array is now empty and may be deleted.

## Phase 3 - Output Interpolation

At last, the data is sorted. Now all there is to do is to write the values from the working array back to the source array.

Recall that there have been three types of values written to the working array. Values equal to the black hole, values greater, and values less than. The beauty of how we have been writing the values to the working array is that we result in an array that looks like this:

`workingArray = [=, =, =, +, +, +, +, +, -, -, -, -, -]`
                                         ^
                                         |
                            workingArray[positiveWrites]

We also happen to know exactly where the values less than the black hole begins, thanks to the value of positive writes. We even happen to know that within each section, all the numbers are sorted. Now all we have to do is start writing from where the negative signs begin to the end of the array, then start again at the beginning of the equal signs straight on through to the end of the plus signs.

Once every value has been copied, the BHS has been completed.


