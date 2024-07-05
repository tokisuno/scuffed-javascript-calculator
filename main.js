// Basic math functions
function add(x,y) {
    return Number(x)+Number(y);
}

function subtract(x,y) {
    return x-y;
}

function multiply(x,y) {
    return Number(x*y).toPrecision(4);
}

function divide(x,y) {
    return Number(x/y).toPrecision(4);
}

// Declaring numbers
let first = "";
let second = "";
let operator = "";

// Declaring operator status for logic
let operatorStatus = false;
let firstStatus = false;
let secondStatus = false;
let decimalStatus = false;

// Calculator operation
function operate(first, second, operator) {
    let result = "";
    switch (operator) {
        case "+":
            result = `${add(first, second)}`
            break;
        case "-":
            result = `${subtract(first, second)}`
            break;
        case "*":
            result = `${multiply(first, second)}`
            break;
        case "/":
            result = `${divide(first, second)}`
            break;
    }
    return result;
}
// Make numbers appear on the screen
const buttons = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const clear = document.querySelector(".ac");
const decimal = document.querySelector(".decimal");


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorStatus === false) {
            if (display.textContent === "000000.0000") {
                display.textContent = "";
            }
            first += button.id;
            display.textContent += button.id;
            console.log("first:", first);
        }
        if (operatorStatus === true) {
            second += button.id;
            display.textContent += button.id;
            secondStatus = true;
            console.log("second:", second);
        }
    });
});

operators.forEach((op) => {
    op.addEventListener("click", () => {
        if (operatorStatus === false) {
            operator = op.id;       
            display.textContent += op.id;
            operatorStatus = true;
            decimalStatus = false;
        }
        if (secondStatus === true) {
            first = operate(Number(first), Number(second), operator);
            second = "";
            display.textContent = `${operate(Number(first), Number(second), operator)}${op.id}`;
        }
    });
});

equals.addEventListener("click", () => {
    if (operatorStatus === true && secondStatus === false) {
        first = "";
        second = "";
        operator = "";
        firstStatus = false;
        secondStatus = false;
        operatorStatus = false;
        decimalStatus = false;
        display.textContent = "000000.0000";
    } else {
        display.textContent = operate(Number(first), Number(second), operator);
        first = operate(Number(first), Number(second), operator);
        second = "";
        operator = "";
        secondStatus = false;
        operatorStatus = false;
        decimalStatus = false;
    }
})

clear.addEventListener("click", () => {
    display.textContent = "000000.0000";
    first = "";
    second = "";
    operator = "";
    firstStatus = false;
    secondStatus = false;
    operatorStatus = false;
    decimalStatus = false;
});

decimal.addEventListener("click", () => {
    if (operatorStatus === false && decimalStatus === false) { 
        display.textContent += "."; 
        first += "."
        decimalStatus = true;
    }
    if (operatorStatus === true && decimalStatus === false) {
        display.textContent += "."; 
        second += "."
        decimalStatus = true;
    }
});
