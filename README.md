# Black Hole Sort
My attempt at creating a generic sorting algorithm with O(n) time complexity.

## What is Black Hole Sort?
I got the idea for Black Hole sort after watching a video about QuickSort. That video claimed that some dude in the 1970s proved that you could not create a comparitive sorting algorithm faster than O(nlogn). So obviously, I had to try and prove him wrong.

As far as I can tell, as this code is implemented, it is indeed O(n) and ChatGPT conditionally agrees when I tell it to, so it must be true, right?

Right now, the code itself probably sucks big time. I'm certain that it's absolutely chock-full of unoptimized code. That's why I'm making it a public repo. Hopefully this will help it gain a bit of traction.

## How it Works

The Black Hole Sort works in 4 general steps; Preparing Data, Creating Variables, Graph Reduction Loop, and Data Interpolation. In brief:
1. Preparing Data: The present version of the BHA only operates on integers. The algorithm should be good for all data types, but if you want to use it now, you should consider devising some method for converting to and from integer values.
2. Creating Variables: There are a handful of extra variables and data structures that must be established for this algorithm to work. This step ensures they are created.
3. Graph Reduction Loop: This step is what gives BHS its name and does the actual sorting of data. This is accomplished by calculating relative distances for each object, then iteratively reducing those distances until they are swallowed by the Origin Node.
4. Data Interpolation: The data output from the BHA results in a shifted array. Rather than using a shifted binary search, I leverage information collected during the BHA to un-shift the data and mutate the input array.

## How it Works in Detail

### Preparing Data

This step is likely going to be use-case specific. My original intention was to take advantage of the fact all data types are expressible as integers. Complex data types can be assigned a hash value based on the value of the desired property, and a hash table could be assembled that would be compatible with the BHA. That said, this was hacked together in a single day, so I have not started working on implementing any kind of generic conversions.

Regardless of approach, the BHA only requires as input an array of integers of any value and those values may repeat any number of times.


### Creating Variables

There are several variables created that serve a crucial role facilitating the BHA. The variables can be sorted into two domains; simple variables and data structures. I will discuss the domains separately.

#### Simple Variables

All of these variables contain only a number or counter. They usually serve as a kind of record for information gained during the BHA.
1. Positive Writes (positiveWrites = 1). This value increments each time a node is identified with a distance of positive 1. Using the first element of the input array as Origin, this value, at the end of BHA, should be equal to the number of instances greater than or equal to the origin plus 1.
    *Side Note: Since the origin is written to the written array differently than every other value, positiveWrites must be initialized to 1.*

2. Negative Writes (negativeWrites = 0). This value increments each time a node is identified by the BHA with a negative distance. Using the first element of the array as origin, this value, at the end fo BHA, should be equal to the number of instances within the input array with values less than the first element value.


### Graph Reduction Loop

The Graph Reduction Loop is the defining characteristic of the Black Hole Sort and enables the algorithm to perform at O(n). This is accomplished by creating a node array based on the elements from the original array and their "distances" from the first element node. In short, BHS explodes all the elements of the source array into a two-dimensional graph of nodes (stars) and "pulls in" those starts until they are all destroyed by the black hole. I'll go more in depth below.

#### Creating the Universe

As I mentioned before, the black hole sort operates not on an array, but on a two dimensional graph. This graph is constructed of nodes (and implicitly edges). These nodes come in two flavors: a singular Black Hole node based on the first element of the source array, and "Stars" which are based on all the other elements of the source array and their "distance" to the Black Hole.

*Note: The Black Hole Node is actually not a node, but the idea makes a little more sense if we allow it to be a node for now.*

#### The Black Hole

Following the graph model, the Black Hole is a singular node that resides at the center of the graph. This node (were it a node, patterned exactly as the other nodes are) is a object containing the value of the first element of the souce array and the distance "0", since the node cannot really have a distance from itself.

It's worth mentioning at this point that other elements in the source array could be duplicates to the Black Hole. I got around this by extending the definition of Stars to include duplicates of the Black Hole and they are processed during the first iteration of the BHS as other stars would be before Stars with a distance of +/- 1 are processed. All this to say that even if there are duplicate values in the array, only the first element is treated specially as the black hole.

#### Filling the Sky with Stars

Every element after the first of the source array is turned into a Star. To reiterate, stars are nodes containing two pieces of information: The value of the element they are based off, and their distance to the black hole. The distance to the black hole is simply the difference between the value of the star and the value of the black hole. Thus:

`distance = star.value - black_hole.value;`

You may notice that this allows for negative distances. This is by design. For example, Given an array `array = [3, 2, 1]`, the first star would contain

`value = 2;`
`distance = -1;`

The easiest way for me to remember this is by asking "What would I have to do to get from the black hole to the star value?"

#### Destroying the Universe

Like you might expect, a black hole pulls in everything around it. This is precisely how the Black Hole Sort works. Every loop, the algorithm checks if there exists a star with a distance of +/- 1. If such a star is found, it is written into a working array which will eventually be interpreted and used to mutate the original source array. If a node has a distance of 1 it is written to the next available index of the working array going from left to right. If the distance is -1, the value is written into the working array from right to left. This results in the working array being shifted, but otherwise sorted.

If no stars are found with a distance of +/- 1, the algorithm identifies the smallest absolute value distance to the next closest star and pulls all stars in the same distance so that the next closest star will have a distance of +/- 1 for the next loop iteration.

Importantly, stars are consumed by the black hole. After a star's value has been written into the working array, the star blinks out of existence. When every star has been consumed, the algorithm is complete.

