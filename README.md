# Lerp
Lerp is a tiny JavaScript library for all of your linear interpolation needs. Lerp is free to use, less than 2 kB, and dependent-free. You can manually enter data as points or as arrays and matrices. Lerp allows you to linearly approximate a data point in the blink of an eye. [Get Lerp!](js/lerp-min.js)
## How to Use
Lerp supports both single and bilinear (double) interpolation. If you already know all the data points for interpolation, using Lerp is very simple! Single interpolate between points with one line of code.
```
lerp.s.pt(a1, a2, b1, b2, givenA);
```
Double interpolation is just as easy!
```
lerp.d.pt(a1, a2, b1, b2, c1, c2, c3, c4, givenA, givenB);
```
If you have data in arrays instead of individual points, Lerp can interpolate that too!
```
var arrayA = [1, 2, 3];
var arrayB = [1, 4, 5];
var givenA = 2;

lerp.s.arr(arrayA, arrayB, givenA);
```
Double interpolation can be peformed using with 2 arrays and a matrix of data.
```
var arrayA = [1, 2, 3];
var arrayB = [1, 4, 5];
var matrixC = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

var givenA = 2;
var givenB = 3.5;

lerp.d.arr(arrayA, arrayB, matrixC, givenA, givenB);
```
## Contribute
Want to see or build an awesome feature? Fork the project!

&copy; 2018 by Dominic Nguyen.
