import Card from "../components/card.js";
import FormValidator from '../components/FormValidator.js';

// Initial card data
document.addEventListener("DOMContentLoaded", () => {
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

  const profileName = document.querySelector("#profile-name");
  const profileTitle = document.querySelector("#profile-description");
  const profileNameInput = document.querySelector("#name-input");
  const profileTitleInput = document.querySelector("#title-input");

  const addCardModal = document.querySelector("#add-card-modal");
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addNewCardButton = document.querySelector("#profile-add-button");
  const editProfileModal = document.querySelector("#edit-modal");

  const addCardFormElement = document.querySelector("#add-card-modal-form");
  const cardTitleInput = document.querySelector("#card-title-input");
  const cardUrlInput = document.querySelector("#card-url-input");
  const submitButton = addCardFormElement.querySelector('.modal__button');

  function toggleSubmitButtonState() {
    const isFormInvalid = cardTitleInput.value.trim() === '' || cardUrlInput.value.trim() === '';
    submitButton.disabled = isFormInvalid;
    submitButton.classList.toggle('modal__button_disabled', isFormInvalid);
  }

  addCardFormElement.addEventListener("input", toggleSubmitButtonState);

  addCardFormElement.addEventListener("submit", (event) => {
    if (cardTitleInput.value.trim() === '' || cardUrlInput.value.trim() === '') {
      event.preventDefault(); // Prevent submission if inputs are empty
      toggleSubmitButtonState();
      return;
    }

    handleAddCardFormSubmit(event);  // Call existing function to handle form submission

    // Disable and gray out the button after submission
    submitButton.disabled = true;
    submitButton.classList.add('modal__button_disabled');
  });

  initialCards.forEach((cardData) => renderCard(cardData, cardListEl));  // Rendering initial cards
});

const config = {
  formSelector: '.modal__form',
  inputSelector: '.modal__form-input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__form-input_error',
  errorClass: 'modal__error-visible'
};

const profileForm = document.querySelector('#edit-profile-modal-form');
const addCardForm = document.querySelector('#add-card-modal-form');

const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
