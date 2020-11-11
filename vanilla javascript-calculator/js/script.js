"use strict";

var input = document.getElementById("input");  // input/output button
var number = document.querySelectorAll(".numbers div"); // number buttons 
var operator = document.querySelectorAll(".operators div"); // operator buttons
var result = document.getElementById("result"); // equal button
var clear = document.getElementById("clear"); // clear button
var resultDisplayed = false; // flag to keep an eye on what output is displayed

// adding click handlers to number buttons        #1
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // storing current input string and it's last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // if result is not displayed, just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            /* if result is currently displayed and user pressed an operator
            we need to keep adding to the string for the next operation */
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            /* if result is currently displayed and user pressed a number
            we need to clear the input string and add the new input to start the new operation*/ 
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML; 
        }
    });
}

// adding click handlers to operator buttons        #2
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        //storing current input string and it's last character in variables - used later
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // if last character entered is an operator, replace it with a currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length === 0) {
            //if first key pressed is an operator, don't do anything
            console.log("enter a number first");
        } else {
            //else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// on click of 'equal' button
result.addEventListener("click", function() {

    // this is the string we will be processing eg 10 + 20 + 30
    var inputString = input.innerHTML;

    // forming an array of numbers eg for above string it will be ["10", "20", "30"]
    var numbers = inputString.split(/\+|\-|\x|\÷/g);

    /* forming an array of operators. For the above string it will be operators = ["+", "-", "*", "÷", "/"]
    first we replace all of the numbers and dot with empty string and then split */
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("-----------------------------");

    /* now we are looping through the array and doing one operation at a time.
       First divide, then multiply, then subtraction and finally addition.
       As we move we are altering the original numbers and operators array.
       The final element remaining in the array will be the output.
    */
   
    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("x");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("x");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; // displays the output

    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})
         