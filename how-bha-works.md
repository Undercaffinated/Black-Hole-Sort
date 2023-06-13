# How the Black Hole Algorithm Works

## Requirements:
1. An array that needs to be sorted. Ideally, you are working with integers. Step 2 in my example, which I skipped, requires you to figure out how to convert your input into something useful.

## How Do Thing:

This explanation probably won't make much sense without pictures, but I'll try anyway.

The idea is to create a graph of nodes, each with three components: value, distance, and markForDeletion. I'll explain the purpose of those properties when they become relevant. For now, just know that there is only one central node (the Origin) and all other nodes connect to only it.

Ironically, the Origin which is based on the first element of the array and is the center of everything, doesn't actually have to be created. All of its values are set by definition, so that's a thing. However, I developed the idea believing it would eventually be a node, and I think the model makes better sense that way, so I'll just pretend we make it into a node, even though we don't.

Anyway, that first node (the one based on the first array element), is the Origin and every other node connects directly to it. All the other nodes are an integer distance away equal to the difference between the value of the node and the value of the Origin node.

In the code, this is found by subtracting the node value from the origin value, which can result in a negative number.

(Now is the time to start drawing btw)

If you have the origin node in place on your paper, you could place every other node some distance from the origin, that distance being the difference between the origin and node instance values. Don't freak out about negative distances. It's fine. We'll get to that.


Perhaps this will make more sense with an example. Say our input array looks like this:

`sourceArray = [5, 2, 7, 1, 3, 4, 6, 8];`

The first element (according to the description above) would be made into a node. We don't actually have to do it though, so I won't. All the other values do though. This results in an array of objects with one element less than sourceArray. We will call this new array nodeArray.

