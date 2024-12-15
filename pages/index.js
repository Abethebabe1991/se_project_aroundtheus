import Card from "../components/card.js";
import FormValidator from '../components/FormValidator.js';

//This is the initial card data that is cloned

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

  //These grab the appropriate data to be used in our code from the HTML

  const profileName = document.querySelector("#profile-name");
  const profileTitle = document.querySelector("#profile-description");
  const profileNameInput = document.querySelector("#name-input");
  const profileTitleInput = document.querySelector("#title-input");

  const addCardModal = document.querySelector("#add-card-modal");
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addNewCardButton = document.querySelector("#profile-add-button");
  const editProfileModal = document.querySelector("#edit-modal");

  const previewImageModalWindow = document.querySelector("#modal-preview-image");
  const previewModalImage = document.querySelector("#modal-image");
  const previewModalCaption = document.querySelector("#modal-caption");

  const profileFormElement = editProfileModal.querySelector("#edit-profile-modal-form");
  const addCardFormElement = addCardModal.querySelector("#add-card-modal-form");

  const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
  const cardUrlInput = addCardFormElement.querySelector("#url-input");

  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
  const cardListEl = document.querySelector(".cards__list");

  //Standalone openModal function and close function

  function openModal(modal) {
    modal.classList.add("modal_opened");

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeModal(modal);
      }
    };

    const handleExternalClick = (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    };

//Added logic to close the Modal boxes if clicked offscreen or esc is pressed

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleExternalClick);

    modal._handleEscClose = handleEscClose;
    modal._handleExternalClick = handleExternalClick;
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", modal._handleEscClose);
    document.removeEventListener("click", modal._handleExternalClick);
  }

//Loading card elements and prepending them to the list of cards to create all six cards

  function renderCard(card, cardListEl) {
    const cardElement = getCardElement(card);
    cardListEl.prepend(cardElement);
  }

  //When the image is clicked a preview appears

  function showPreview(card) {
    previewModalImage.src = card.link;
    previewModalImage.alt = card.name;
    previewModalCaption.textContent = card.name;
    openModal(previewImageModalWindow);
  }

  function getCardElement(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImageEl.style.backgroundImage = `url(${card.link})`;

    deleteButton.addEventListener("click", handleDeleteIcon);
    likeButton.addEventListener("click", handleLikeIcon);
    cardImageEl.addEventListener("click", () => {
      showPreview(card);
    });

    cardTitleEl.textContent = card.name;
    cardImageEl.src = card.link;
    cardImageEl.alt = card.name;

    return cardElement;
  }

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileTitle.textContent = profileTitleInput.value;
    closeModal(editProfileModal);
  }

  function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link }, cardListEl);
    addCardFormElement.reset();
    closeModal(addCardModal);
  }

  const handleLikeIcon = (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_active");
  };

  const handleDeleteIcon = (evt) => {
    evt.target.closest(".card").remove();
  };

  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileTitleInput.value = profileTitle.textContent;
    openModal(editProfileModal);
  });

  addNewCardButton.addEventListener("click", () => openModal(addCardModal));

  editProfileModal.querySelector(".modal__close").addEventListener("click", () => closeModal(editProfileModal));
  addCardModal.querySelector(".modal__close").addEventListener("click", () => closeModal(addCardModal));
  previewModalCloseButton.addEventListener("click", () => closeModal(previewImageModalWindow));

  profileFormElement.addEventListener("submit", handleProfileEditSubmit);
  addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

  initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
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
