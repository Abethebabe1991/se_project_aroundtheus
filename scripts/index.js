/* -------------------------------------------------------------------------- */
/*                                  Card Data                                 */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Profile
const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#edit-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");

const profileName = document.querySelector("#profile-name");
const profileTitle = document.querySelector("#profile-title");
const profileNameInput = document.querySelector("#name-input");
const profileTitleInput = document.querySelector("#title-input");

// Buttons
const addCardModal = document.querySelector('#add-card-modal')
const addNewCardCloseButton = addCardModal.querySelector(".modal__close")
const addNewCardButton = document.querySelector("#profile-add-button");

const profileFormElement = document.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form")

//card data
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = document.querySelector('.modal__input_type_url');


const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");



 /* -------------------------------------------------------------------------- */
 /*                                  Functions                                 */
 /* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
};

function openModal(modal) {
   modal.classList.add("modal_opened");
 };

function closeModal(modal) {
  modal.classList.remove("modal_opened");
};

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => { 
    likeButton.classList.toggle('.card__like-button_active');
      });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
};

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(editProfileModal);
};

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
 renderCard({name, link }, cardListEl);
closeModal(addCardModal);
};



/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editProfileModal.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => openModal(editProfileModal));

profileModalCloseButton.addEventListener("click", () =>  {
  profileNameInput.value = profileNameInput.textContent;
  profileTitleInput.value = profileTitleInput.textContent;
  closeModal(editProfileModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addNewCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

editProfileModal.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
