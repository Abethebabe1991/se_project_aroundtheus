// Function to close the modal


function handleKeyDown(event, modalSelector) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll(modalSelector);
        modals.forEach(modal => {
            if (modal.classList.contains('modal_opened')) {
                closeModal(modal); 
            }
        });
    }
}

function enableEscapeKeyClose(modalSelector) {
    document.addEventListener('esc', (event) => handleKeyDown(event, modalSelector));
}

enableEscapeKeyClose('.modal');

// function to show errors in the inputs:

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);

    if (errorMessagesEl) {
        inputEl.classList.add(inputErrorClass);
        errorMessagesEl.textContent = inputEl.validationMessage || ''; 
        errorMessagesEl.classList.add(errorClass);
    } else {
  
    }
}

// function to hide errors once validation is completed

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessagesEl = formEl.querySelector(`#${inputEl.id}-error`);
    
    if (errorMessagesEl) {
        inputEl.classList.remove(inputErrorClass);
        errorMessagesEl.textContent = "";
        errorMessagesEl.classList.remove(errorClass);
    } else {
 
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
        if (!inputEl.validity.valid) {
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
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    });
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
