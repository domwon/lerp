outputEl = document.getElementById('output');
document.getElementById('solve-btn').onclick = function() {
    
    var a1 = document.getElementById('a1').value;
    var a2 = document.getElementById('a2').value;
    var b1 = document.getElementById('b1').value;
    var b2 = document.getElementById('b2').value;
    var givenA = document.getElementById('givenA').value;
    
    // If input is null
    if (a1 == null | a2 == null | b1 == null | b2 == null | givenA == null) {
        
        outputEl.innerHTML = 'Please enter all inputs.';
        
    // If input is not a number
    } else if (isNaN(a1) | isNaN(a2) | isNaN(b1) | isNaN(b2) | isNaN(givenA)) {
        
        outputEl.innerHTML = 'Inputs must be numbers.';
    
    } else {
        
        // Convert to numbers
        a1 = a1*1; a2 = a2*1; b1 = b1*1; b2 = b2*1; givenA = givenA*1;
        
        // If given search term is outside of a1 and a2
        if (givenA > a2 | givenA < a1) {

            outputEl.innerHTML = 'Given A must between A1 and A2.';

        } else {

            outputEl.innerHTML = Math.round(lerp.s.pt(a1,a2,b1,b2,givenA)*100)/100;
        }
    }
};
