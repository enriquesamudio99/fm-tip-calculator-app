const billInput = document.querySelector("#bill");
const numberPeople = document.querySelector("#numberPeople");
const tipsBtns = document.querySelectorAll('.tip');
const customTip = document.querySelector("#customTip");
const btnReset = document.querySelector('#btnReset');
const tipAmountPrice = document.querySelector('.tip-amount + .price');
const totalPrice = document.querySelector('.total + .price');

const billObj = {
    bill: 0,
    numberPeople: 0,
    tip: 0
}

document.addEventListener("DOMContentLoaded", () => {

    initApp();

});

function initApp() {

    billInput.value = "";
    numberPeople.value = "";
    btnReset.disabled = true;

    billInput.addEventListener("input", validateBillInput);
    billInput.addEventListener("blur", validateBillInput);
    numberPeople.addEventListener("input", validateNumberPeopleInput);
    numberPeople.addEventListener("blur", validateNumberPeopleInput);

    tipsBtns.forEach(tipBtn => {
        
        if (tipBtn !== customTip) {
            tipBtn.addEventListener("click", validateTip);
        } else {
            tipBtn.addEventListener("click", validateTip);
            tipBtn.addEventListener("input", validateTip);
            tipBtn.addEventListener("blur", validateTip);
        }

    });

    btnReset.addEventListener("click", resetBill);

}

function validateBillInput(e) {

    const billValue = parseFloat(e.target.value);
    const invalidFeedback = e.target.nextElementSibling;
    e.target.parentElement.classList.remove("is-valid");

    if(billValue == "") {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Can't be Empty";
        billObj.bill = 0;
        calculateBill();
        return;
    }

    if(billValue == 0) {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Can't be Zero";
        billObj.bill = 0;
        calculateBill();
        return;
    } 

    if(billValue < 0) {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Invalid Number";
        billObj.bill = 0;
        calculateBill();
        return;
    } 

    if (e.target.parentElement.classList.contains("is-invalid")) {
        e.target.parentElement.classList.remove("is-invalid");
    }

    e.target.parentElement.classList.add("is-valid");
    billObj.bill = billValue.toFixed(2);
    calculateBill();

}

function validateNumberPeopleInput(e) {

    const numberPeople = parseFloat(e.target.value);
    const invalidFeedback = e.target.nextElementSibling;
    e.target.parentElement.classList.remove("is-valid");

    if(numberPeople == "") {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Can't be Empty";
        billObj.numberPeople = 0;
        calculateBill();
        return;
    }

    if(numberPeople == 0) {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Can't be Zero";
        billObj.numberPeople = 0;
        calculateBill();
        return;
    } 

    if(numberPeople < 0) {
        e.target.parentElement.classList.add("is-invalid");
        invalidFeedback.textContent = "Invalid Number";
        billObj.numberPeople = 0;
        calculateBill();
        return;
    } 

    if (e.target.parentElement.classList.contains("is-invalid")) {
        e.target.parentElement.classList.remove("is-invalid");
    }

    e.target.parentElement.classList.add("is-valid");
    billObj.numberPeople = numberPeople.toFixed(0);
    calculateBill();


}

function validateTip(e) {

    // Remove previous selected tip
    tipsBtns.forEach(tipBtn => {
        
        tipBtn.classList.remove("selected");

    });

    e.target.classList.add("selected");

    const tipValue = parseInt(e.target.value).toFixed(0);

    if (e.target === customTip && e.type === "click") {

        billObj.tip = 0;
        calculateBill();
        return;

    }

    if (e.target === customTip && e.type !== "click") {

        if (isNaN(tipValue)) {
            e.target.classList.add("invalid");
            e.target.classList.remove("selected");
            billObj.tip = 0;
            calculateBill();
            return;
        }


        if (tipValue < 1) {
            e.target.classList.add("invalid");
            e.target.classList.remove("selected");
            billObj.tip = 0;
            calculateBill();
            return;
        }

        e.target.classList.remove("invalid");
        billObj.tip = tipValue;
        calculateBill();

        return;

    } 



    customTip.classList.remove("invalid");
    customTip.value = "";

    billObj.tip = tipValue;
    calculateBill();

}

function calculateBill() {

    if (Object.values(billObj).includes(0)) {
        tipAmountPrice.textContent = "$0.00";
        totalPrice.textContent = "$0.00";
        btnReset.disabled = true;
        return;
    }  

    const { bill, numberPeople, tip } = billObj;

    const tipTotal = parseFloat(((bill * tip) / 100).toFixed(2));
    const tipPerPerson = parseFloat((tipTotal / numberPeople).toFixed(2));
    const total = parseFloat(bill) + tipTotal;
    const totalPerPerson = (total / numberPeople).toFixed(2);
    
    btnReset.disabled = false;
    tipAmountPrice.textContent = `$${tipPerPerson}`;
    totalPrice.textContent = `$${totalPerPerson}`;

}

function resetBill() {

    billInput.value = "";
    numberPeople.value = "";

    billInput.parentElement.classList.remove("is-valid");
    numberPeople.parentElement.classList.remove("is-valid");
    billInput.parentElement.classList.remove("is-invalid");
    numberPeople.parentElement.classList.remove("is-invalid");

    tipsBtns.forEach(tipBtn => {
        
        tipBtn.classList.remove("selected");

    });

    billObj.bill = 0;
    billObj.numberPeople = 0;
    billObj.tip = 0;

    calculateBill();

    btnReset.disabled = true;

}