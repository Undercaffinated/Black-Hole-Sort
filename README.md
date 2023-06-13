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
3. Graph Reduction Loop: This step is what gives the BHA its name and does the actual sorting of data. This is accomplished by calculating relative distances for each object, then iteratively reducing those distances until they are swallowed by the Origin Node.
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

2. Negative Writes (negativeWrites = 1). This value increments each time a node is identified by the BHA with a negative distance. Using the first element of the array as origin, this value, at the end fo BHA, should be equal to the number of instances within the input array with values less than the first element value.
