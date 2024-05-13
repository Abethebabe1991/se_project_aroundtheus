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
  
// Elements
const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileCloseButton = document.querySelector('#modal-close-button');
const profileName = document.querySelector('#profile-name');
const profileTitle = document.querySelector('#profile-title');
const profileNameInput = document.querySelector('#name-input');
const profileTitleInput = document.querySelector('#title-input');
const profileFormElement = document.querySelector('#modal-form');
const profileEditForm = document.querySelector('#modal-form');

// Functions

function closePopup() {
  profileEditModal.classList.remove('modal__opened')
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closePopup();
}
// Event Listeners

profileEditButton.addEventListener('click', () => {
profileNameInput.value = profileName.textContent;
profileTitleInput.value = profileTitle.textContent;

  profileEditModal.classList.add('modal__opened')
});

profileCloseButton.addEventListener('click', closePopup());

profileEditForm.addEventListener('submit', handleProfileEditSubmit);
