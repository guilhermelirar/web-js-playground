// let {evaluateExpression} = require('./evaluation')

let firstInput = true;

let disp = document.getElementById("display");

function input(c) {

    if (firstInput) {
        firstInput = false;
        disp.className = "display-enabled"
        disp.textContent = "";
    }

    disp.textContent += c
}

function equal() {
    try {
        const ans = evaluateExpression(disp.textContent);
        disp.textContent = ans;
    } catch (e) {
        disp.textContent = e;
    }
}

function clearDisplay() {
    disp.textContent = "000000";
    firstInput = true;
    disp.className = "display-disabled"
}
