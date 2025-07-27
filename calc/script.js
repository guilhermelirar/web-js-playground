let firstInput = true;

function input(c) {
    let disp = document.getElementById("display");
    if (firstInput) {
        firstInput = false;
        disp.className = "display-enabled"
        disp.textContent = "";
    }

    document.getElementById("display").textContent += c
}