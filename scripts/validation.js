

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
inputEl.classList.add(inputErrorClass);
errorMessagesEl.textContent = inputEl.validationMessage;
errorMessagesEl.classList.add(errorClass);

};

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessagesEl.textContent = "";
    errorMessagesEl.classList.remove(errorClass);
    
    };

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
       return showInputError(formEl, inputEl, options);
    }  
        hideInputError(formEl, inputEl, options);
    
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass, }) {

//disableButton

// enableButton

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}
    if(hasInvalidInput(inputEls)) {
        submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }  
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
};

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
const inputEls = [...formEl.querySelectorAll(inputSelector)];
const submitButton = formEl.querySelector('.modal__save')
inputEls.forEach(inputEl => {
    inputEl.addEventListener("input", (e) => {
checkInputValidity(formEl, inputEl, options);
toggleButtonState(inputEls, submitButton)
    })
});
};

function enableValidation(options){
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
});

setEventListeners(formEl, options);
// look for all inputs inside of form
// loop through all inputs to see if all are valid
 // if input is not valid
   // grab the validation message 
   // add error class to the input
   // display error message
   // disable button until all forms are valid
   // reset error messages

    });
};


const config = { formSelector: ".modal__form",
inputSelector: ".modal__form-input",
submitButtonSelector: ".modal__button",
inactiveButtonClass: "modal__button_disabled",
inputErrorClass: "modal__input_type_error",
errorClass: "modal__error_visible"
};

enableValidation(config);