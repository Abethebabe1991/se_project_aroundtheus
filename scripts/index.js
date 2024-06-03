document.addEventListener("DOMContentLoaded", () => {
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

  // Profile Data
  const profileName = document.querySelector("#profile-name");
  const profileTitle = document.querySelector("#profile-title");
  const profileNameInput = document.querySelector("#name-input");
  const profileTitleInput = document.querySelector("#title-input");

  // Buttons
  const addCardModal = document.querySelector("#add-card-modal");
  const addNewCardCloseButton = addCardModal.querySelector(".modal__close");
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addNewCardButton = document.querySelector("#profile-add-button");
  const editProfileModal = document.querySelector("#edit-modal");
  const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
  const previewImageModalWindow = document.querySelector(".modal__preview-image");
  const previewModalImage = document.querySelector(".modal__image");
  const previewModalCloseButton = document.querySelector(".modal__preview-image .modal__close");
  const previewModalCaption = document.querySelector(".modal__caption");

  // Profile Modal and Add Card Modal
  const profileFormElement = editProfileModal.querySelector("#edit-profile-modal-form");
  const addCardFormElement = addCardModal.querySelector("#add-card-modal-form");

  // Card data
  const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
  const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
  const cardListEl = document.querySelector(".cards__list");

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  // Open and Close functions
  function openModal(modal) {
    modal.classList.add("modal_opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
  }

  // Card Generating Function
  function renderCard(card, cardListEl) {
    const cardElement = getCardElement(card);
    cardListEl.prepend(cardElement);
  }

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

    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    cardImageEl.addEventListener("click", () => {
      showPreview(card);
    });

    cardTitleEl.textContent = card.name;
    cardImageEl.src = card.link;
    cardImageEl.alt = card.name;

    return cardElement;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Event Handlers                               */
  /* -------------------------------------------------------------------------- */

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
    cardTitleInput.value = ""; // Clear the title input
    cardUrlInput.value = "";   // Clear the URL input
    closeModal(addCardModal);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent; 
    profileTitleInput.value = profileTitle.textContent; 
    openModal(editProfileModal);
  });

  profileModalCloseButton.addEventListener("click", () => {
    closeModal(editProfileModal);
  });

  addNewCardButton.addEventListener("click", () => {
    cardTitleInput.value = "";
    cardUrlInput.value = ""; 
    openModal(addCardModal);
  });

  addNewCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

  previewModalCloseButton.addEventListener("click", () => closeModal(previewImageModalWindow));

  profileFormElement.addEventListener("submit", handleProfileEditSubmit);
  addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

  initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
});
