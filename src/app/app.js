const inputBill = document.getElementById("bill");
const inputCustomTip = document.getElementById("customTip");
const inputPeople = document.getElementById("countPeople");
const btnOptionTip = document.querySelectorAll(".btnOptionTip");

const btnReset = document.getElementById("btn-reset-result");
const errorMsg = document.getElementById("error-msg");

const totalTipElement = document.getElementById("total-tip");
const totalPersonElement = document.getElementById("total-person");

let tipSelected;

const inputsFilled = {
    bill: false,
    optionTip: false,
    customTip: false,
    countPeople: false,
};

function isInputEmpty(inputElement, inputId) {
    if (inputElement.tagName === "BUTTON") inputsFilled[inputId] = false;
    if (inputElement.value.length === 0) inputsFilled[inputId] = false;
}

function isInputsFilled([...inputsId]) {
    const isEmpty = inputsId.find((inputId) => inputsFilled[inputId] === false);

    if (isEmpty) return false;

    return true;
}

function setResult(tip, total) {
    totalTipElement.innerHTML = "$" + tip;
    totalPersonElement.innerHTML = "$" + total;
}

function setTotalAmount(tip) {
    let bill = inputBill.value === "" ? 0 : parseFloat(inputBill.value);
    let setTip = bill * tip;
    let totalBill = bill + setTip;
    let people = parseInt(inputPeople.value);

    let tipByPerson = (setTip / people).toFixed(2);
    let totalByPerson = (totalBill / people).toFixed(2);

    setResult(tipByPerson, totalByPerson);
}

function setActiveClass(element, className) {
    element.classList.add(`${className}--active`);
}

function removeActiveClass(element, className) {
    element.classList.remove(`${className}--active`);
}

inputBill.addEventListener("keyup", () => {
    if (isInputsFilled([countPeople.id, "optionTip"])) {
        let tip = document.querySelector(".btnOptionTip--active").dataset.tip;
        setTotalAmount(tip);
    }

    if (isInputsFilled([countPeople.id, "customTip"])) {
        let tip = parseFloat(inputCustomTip.value) / 100;
        setTotalAmount(tip);
    }

    inputsFilled.bill = true;
    isInputEmpty(inputBill, inputBill.id);
});

btnOptionTip.forEach((btnTip) => {
    btnTip.addEventListener("click", () => {
        if (!isInputsFilled([inputPeople.id])) return errorMsg.classList.add("main__msgError--show");

        if (tipSelected) removeActiveClass(tipSelected, "btnOptionTip");
        if (inputCustomTip.value !== "") removeActiveClass(inputCustomTip, "main__inputCustomTip");

        isInputEmpty(btnTip, "optionTip");
        setTotalAmount(btnTip.dataset.tip);
        setActiveClass(btnTip, "btnOptionTip");
        setActiveClass(btnReset, "main__resultsReset");
        tipSelected = btnTip;
        inputsFilled.optionTip = true;
    });
});

inputCustomTip.addEventListener("keyup", () => {
    let tip = parseFloat(inputCustomTip.value) / 100;
    if (isNaN(tip)) tip = 0;
    if (isInputsFilled([inputPeople.id])) setTotalAmount(tip);
    setActiveClass(btnReset, "main__resultsReset");
    isInputEmpty(inputCustomTip, inputCustomTip.id);
    inputsFilled.customTip = true;
});

inputCustomTip.addEventListener("focus", () => {
    if (tipSelected) removeActiveClass(tipSelected, "btnOptionTip");
    let tip = parseFloat(inputCustomTip.value) / 100;
    if (inputCustomTip.value !== "") setTotalAmount(tip);
});

inputCustomTip.addEventListener("focusout", () => {
    if (inputCustomTip.value.length > 0) return setActiveClass(inputCustomTip, "main__inputCustomTip");
    if (tipSelected) setActiveClass(tipSelected, "btnOptionTip");
    removeActiveClass(inputCustomTip, "main__inputCustomTip");
});

inputPeople.addEventListener("keyup", () => {
    if (inputPeople.value.charAt(0) === "0") return errorMsg.classList.add("main__msgError--show");

    if (errorMsg.classList.contains("main__msgError--show")) errorMsg.classList.remove("main__msgError--show");

    if (inputPeople.value !== "" && inputCustomTip.value !== "") {
        let tip = parseFloat(inputCustomTip.value) / 100;
        setTotalAmount(tip);
    }
    inputsFilled.countPeople = true;
    isInputEmpty(inputPeople, inputPeople.id);
});

btnReset.addEventListener("click", () => {
    setResult(0, 0);
    inputBill.value = null;
    inputPeople.value = null;
    inputCustomTip.value = null;

    Object.keys(inputsFilled).forEach((key) => {
        inputsFilled[key] = false;
    });

    if (tipSelected) removeActiveClass(tipSelected, "btnOptionTip");
    if (inputCustomTip.classList.contains("main__inputCustomTip--active")) removeActiveClass(inputCustomTip, "main__inputCustomTip");

    removeActiveClass(btnReset, "main__resultsReset");
});
