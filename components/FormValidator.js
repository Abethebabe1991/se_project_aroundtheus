export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
      
        this._inputList = Array.from(this._formElement.querySelectorAll('input' + this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    // Private method to show error messages
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            inputElement.classList.add(this._inputErrorClass);
            errorElement.textContent = inputElement.validationMessage;
            errorElement.classList.add(this._errorClass);
        }
    }

    // Private method to hide error messages
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (errorElement) {
            inputElement.classList.remove(this._inputErrorClass);
            errorElement.textContent = '';
            errorElement.classList.remove(this._errorClass);
        }
    }

    // Private method to check the validity of an input field
    _validateInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Private method to toggle the submit button state
    _toggleButtonState() {
        const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
        if (hasInvalidInput) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    // Private method to disable the submit button
    _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }

    // Private method to enable the submit button
    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }

    // Private method to add event listeners to the form
    _addEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._toggleButtonState();
            });
        });
    }

    // Public method to enable form validation
    enableValidation() {
        this._addEventListeners();
    }

    // Public method to reset the form and its validation state
    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState(); // Reset button state
    }
}
