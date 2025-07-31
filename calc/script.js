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
        disp.textContent = parseFloat(ans.toFixed(6)).toString();;
    } catch (e) {
        disp.textContent = "ERROR";
    }
}

function clearDisplay() {
    disp.textContent = "000000";
    firstInput = true;
    disp.className = "display-disabled"
}
