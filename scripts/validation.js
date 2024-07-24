// Function to show errors in the inputs
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessagesEl) {
        inputEl.classList.add(inputErrorClass);
        errorMessagesEl.textContent = inputEl.validationMessage || '';
        errorMessagesEl.classList.add(errorClass);
    }
}

// Function to hide errors once validation is completed
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessagesEl) {
        inputEl.classList.remove(inputErrorClass);
        errorMessagesEl.textContent = "";
        errorMessagesEl.classList.remove(errorClass);
    }
}

// Validation function to check input fields validity
function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
}

// Disable and Enable buttons and toggling button state based on validity of input fields
function disableButton(submitButton, inactiveButtonClass) {
    if (submitButton) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    }
}

function enableButton(submitButton, inactiveButtonClass) {
    if (submitButton) {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;

    inputEls.forEach(inputEl => {
        // Needed to really be creative her cause I kept getting errors in the console. This is according to MDN a "Defensive Check" Reading up on it later
        if (inputEl && inputEl.validity && !inputEl.validity.valid) {
            foundInvalid = true;
        }
    });

    if (foundInvalid) {
        disableButton(submitButton, inactiveButtonClass);
    } else {
        enableButton(submitButton, inactiveButtonClass);
    }
}

function setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);


    inputEls.forEach(inputEl => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    });

    // Initial check to set the button state correctly on page load
    toggleButtonState(inputEls, submitButton, options);
}

// Validation code if above arguments are satisfied - also preventing browser default
function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        setEventListeners(formEl, options);
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__form-input_error",
    errorClass: "modal__error-visible"
};

enableValidation(config);
