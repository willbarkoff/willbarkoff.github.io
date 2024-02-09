console.log("Loaded fixedpoint.js")

// Number is the current fixed point number in the calculator
let number = 0n;

const bitsBeforeDecimalField = document.querySelector(".bits-before-decimal-field");
const bitsAfterDecimalField = document.querySelector(".bits-after-decimal-field");
const signedSelect = document.querySelector(".signed-select");
const aboutRepresentaiton = document.querySelector(".about-representation")

const calculator = document.querySelector(".calculator")

const fixedPointField = document.querySelector(".fixed-point-field")
const unsignedFixedPointField = document.querySelector(".unsigned-fixed-point-field")
const floatingPointField = document.querySelector(".floating-point-field")
const hexFieldNormal = document.querySelector(".hex-normal");
const octalFieldNormal = document.querySelector(".octal-normal")
const binaryFieldNormal = document.querySelector(".binary-normal")
const hexFieldVerilog = document.querySelector(".hex-verilog");
const octalFieldVerilog = document.querySelector(".octal-verilog")
const binaryFieldVerilog = document.querySelector(".binary-verilog")

const visualizationRow1 = document.querySelector(".visualization-1")
const visualizationRow2 = document.querySelector(".visualization-2")

const generatePowerOfTwoHTML = (power) => {
    const base = document.createElement("span");
    const sup = document.createElement("sup");
    sup.textContent = power;
    base.textContent = "2";
    base.appendChild(sup)
    return base;
}

const addVisulizationBox = (row, content, isDecimal) => {
    const td = document.createElement("td");
    td.appendChild(content);

    if (isDecimal) {
        td.style.borderRight = "3px solid red";
    }

    row.appendChild(td);
}

const clearVisulization = () => {
    visualizationRow1.innerHTML = "";
    visualizationRow2.innerHTML = "";
}

const getBitValue = (number, index) => {
    return (number & (BigInt(1) << BigInt(index))) !== 0n ? 1n : 0n;
}

let floatToFix = new Error("floatToFix is undefined: calculator has not be initalized");
let fixToFloat = new Error("fixToFloat is undefined: calculator has not be initalized");
let unsignFix = new Error("unsignFix is undefined: calculator has not be initalized");
let signFix = new Error("signFix is undefined: calculator has not be initalized");

const update = () => {
    const bitsBefore = parseInt(bitsBeforeDecimalField.value);
    const bitsAfter = parseInt(bitsAfterDecimalField.value);
    const signed = signedSelect.value == "Signed";

    if (isNaN(bitsBefore) || isNaN(bitsAfter) || bitsBefore < 0 || bitsAfter < 0 || bitsBefore + bitsAfter < 1) {
        calculator.classList.add("is-hidden");
        aboutRepresentaiton.classList.add("is-hidden")
        return;
    }

    // We have a valid configuration

    floatToFix = (float) => {
        return BigInt(float * 2 ** bitsAfter)
    }

    fixToFloat = (fix) => {
        fix = BigInt(fix);
        return Number(BigInt.asIntN(bitsBefore + bitsAfter + 1, fix)) / 2 ** bitsAfter;
    }

    unsignFix = (fix) => {
        return BigInt.asUintN(bitsBefore + bitsAfter + 1, fix);
    }

    signFix = (fix) => {
        return BigInt.asIntN(bitsBefore + bitsAfter + 1, fix);
    }

    const maxValue = fixToFloat(Math.pow(2, bitsBefore + bitsAfter - (signed ? 1 : 0)) - 1)
    const minValue = fixToFloat(signed ? -1 * Math.pow(2, bitsBefore + bitsAfter - 1): 0);

    console.log(bitsBefore, bitsAfter, signed)

    const resolution = fixToFloat(1);
    const totalBits = bitsBefore + bitsAfter + (signed ? 1 : 0)

    aboutRepresentaiton.textContent = `${signed ? "A signed" : "An unsigned"} ${bitsBefore}.${bitsAfter} representation can express numbers between ${minValue} and ${maxValue} with a resolution of ${resolution} and requires ${totalBits} bits to represent.`

    document.querySelectorAll(".bits-before").forEach(el => el.textContent = bitsBefore);
    document.querySelectorAll(".bits-after").forEach(el => el.textContent = bitsAfter);

    clearVisulization();

    if (signed) {
        let signBox = document.createElement("span");
        signBox.textContent = "S";
        addVisulizationBox(visualizationRow1, signBox);
    }

    for (let i = bitsBefore - (signed ? 2 : 1); i >= 0; i--) {
        addVisulizationBox(visualizationRow1, generatePowerOfTwoHTML(i), i == 0);
    }

    for (let i = -1; i >= -bitsAfter; i--) {
        addVisulizationBox(visualizationRow1, generatePowerOfTwoHTML(i));
    }

    // Fill in calculator
    if (fixedPointField != document.activeElement) {fixedPointField.value = number;}
    if (floatingPointField != document.activeElement) {floatingPointField.value = fixToFloat(number);}
    if (unsignedFixedPointField != document.activeElement) {unsignedFixedPointField.value = unsignFix(number);}

    hexFieldNormal.value = "0x" + unsignFix(number).toString(16);
    octalFieldNormal.value = "0o" + unsignFix(number).toString(8);
    binaryFieldNormal.value = "0b" + unsignFix(number).toString(2);


    hexFieldVerilog.value = totalBits + "'h" + unsignFix(number).toString(16);
    octalFieldVerilog.value = totalBits + "'o" + unsignFix(number).toString(8);
    binaryFieldVerilog.value = totalBits + "'b" + unsignFix(number).toString(2);

    for (let i = bitsBefore + bitsAfter - 1; i >= 0; i--) {
        let el = document.createElement("span");
        el.textContent = getBitValue(number, i)
        addVisulizationBox(visualizationRow2, el, i == bitsAfter)
    }

    // Unhide everything
    calculator.classList.remove("is-hidden");
    aboutRepresentaiton.classList.remove("is-hidden")
}

bitsBeforeDecimalField.addEventListener("keyup", update);
bitsAfterDecimalField.addEventListener("keyup", update);
fixedPointField.addEventListener("keyup", ev => { number = BigInt(ev.target.value); update(); })
floatingPointField.addEventListener("keyup", ev => { number = BigInt(floatToFix(ev.target.value)); update(); })
signedSelect.addEventListener("click", update);