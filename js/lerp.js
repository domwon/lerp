//! Lerp
//! Version : 1.0.0
//! Author  : Dominic Khac @dominickhacnguyen
//! License : MIT
//! https://dominickhac.com/Lerp

var lerp = {
    /* Set to true to see output */
    debug: false, 
    
    /* Single interpolation */
    s: {
        
        /** 
        * Function for single linear interpolation for known points
        * Input: 4 pts and 1 given pt
        */
        pt: function(a1, a2, b1, b2, givenA) {
            if (a1 == a2) {
                return (b1 + b2)/2;
            }
            return (b1 + (givenA-a1)*(b2-b1)/(a2-a1));
            
        },
        
        /**
        * Function for single linear interpolation for 2 array data
        * Input: 2 arrays and 1 given pt
        */
        arr: function(arrayA, arrayB, givenA) {
    
            var slerpIndicesArrA = arrayA.getLerpIndices(givenA);
    
            try {

                var a1 = arrayA[slerpIndicesArrA.lowIndex];
                var a2 = arrayA[slerpIndicesArrA.highIndex];
                var b1 = arrayB[slerpIndicesArrA.lowIndex];
                var b2 = arrayB[slerpIndicesArrA.highIndex];

                lerp.debug && console.log("a1: " + a1, "| a2: " + a2, "| b1: " + b1, "| b2: " + b2);

                return lerp.s.pt(a1, a2, b1, b2, givenA);
            }
                
            catch(err) {
                console.log('%cError: Search El must be within Array A.', 'color:red');
            }
        }
    },
    
    // Double (bilinear) interpolation
    d: {
        
        /**
        * Function for double interpolation for known points
        * Input: 8 pts and 2 given pts
        */
        pt: function (a1, a2, b1, b2, c1, c2, c3, c4, givenA, givenB) {
    
            slerp1 = lerp.s.pt(a1,a2,c1,c2,givenA);
            slerp2 = lerp.s.pt(a1,a2,c3,c4,givenA);

            return lerp.s.pt(b1,b2,slerp1,slerp2,givenB);
        },
        
        /**
        * Function for bilinear (double) interpolation for 2 array and 1 matrix data
        * Input: 2 arrays, 1 matrix, and 2 given pts
        */
        arr: function(arrayA, arrayB, matrixC, givenA, givenB) {
            
            
            var slerpIndicesArrA = arrayA.getLerpIndices(givenA);
            var slerpIndicesArrB = arrayB.getLerpIndices(givenB);
            
            try {

                var a1 = arrayA[slerpIndicesArrA.lowIndex];
                var a2 = arrayA[slerpIndicesArrA.highIndex];
                var b1 = arrayB[slerpIndicesArrB.lowIndex];
                var b2 = arrayB[slerpIndicesArrB.highIndex];
                
                // Get arrays from matrix
                var colC1 = lerp.getMatrixCol(matrixC, slerpIndicesArrB.lowIndex);
                var colC2 = lerp.getMatrixCol(matrixC, slerpIndicesArrB.highIndex);
                
                var c1 = colC1[slerpIndicesArrA.lowIndex];
                var c2 = colC1[slerpIndicesArrA.highIndex];
                var c3 = colC2[slerpIndicesArrA.lowIndex];
                var c4 = colC2[slerpIndicesArrA.highIndex];

                lerp.debug && console.log("a1: " + a1, "| a2: " + a2, "| b1: " + b1, "| b2: " + b2);
                lerp.debug && console.log("c1: " + c1, "| c2: " + c2, "| c3: " + c3, "| c4: " + c4);

                return lerp.d.pt(a1, a2, b1, b2, c1, c2, c3, c4, givenA, givenB);
            }
                
            catch(err) {
                console.log('%cError: Search elements must be within arrays.', 'color:red');
            }
        }
    },
    
    /**
    * Function for getting interpolation indices in array using binary search algorithm.
    * Returns object of duplicated search el indices if already in array or
    * two enclosing indices if search el val is not in array.
    */
    getLerpIndices: function(searchEl) {
        var currIndex;
        var currEl;
        var minIndex = 0;
        var maxIndex = this.length - 1;
        
        // Edge case for when searchEl is equal to last element in array
        if (this[maxIndex] == searchEl) {
            
            lerp.debug && console.log("Same Index:" + maxIndex.toString());
            return {
                lowIndex: maxIndex,
                highIndex: maxIndex
            };
            
        } else if (searchEl > this[maxIndex] || searchEl < this[minIndex]) {
            
            // SearchEl outside of Array A
            return;
        }

        while (minIndex <= maxIndex) {
            currIndex = (minIndex + maxIndex) / 2 | 0;
            currEl = this[currIndex];

            if (currEl < searchEl) {
                minIndex = currIndex + 1;
            }
            else if (currEl > searchEl) {
                maxIndex = currIndex - 1;
            }
            else { // Search val in array
                lerp.debug && console.log("Same Index:" + currIndex.toString());
                return {
                    lowIndex: currIndex,
                    highIndex: currIndex
                };
            }
        }
        
        lerp.debug && console.log("Different Indices: " + (maxIndex-1).toString() + ", " + (maxIndex+1).toString());

        return { // Search val not in array
            lowIndex: maxIndex,
            highIndex: maxIndex + 1
        };
    },
    
    /**
    * Function to get column of matrix
    */
    getMatrixCol: function(matrix, col) {
        var colArray = [];
        for (var i = 0; i < matrix.length; i++) {
            colArray.push(matrix[i][col]);
        }
        return colArray;
    }
};

/* Method to get interpolation indices from array */
Array.prototype.getLerpIndices = lerp.getLerpIndices;

/* Demo */
//var arrA = [1,2,3];
//var arrB = [1,5,10];
//var matrixC = [[1, 2, 3],[4,5,6],[7,8,9]];
//console.log(lerp.d.arr(arrA, arrB, matrixC, 1.5, 10));