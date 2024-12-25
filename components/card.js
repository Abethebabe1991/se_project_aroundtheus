export default class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }


    // Create the card element based on the template
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);
        return cardElement;
    }


    // Set up event listeners for like and delete actions
    _setEventListeners() {
        this._cardElement.querySelector('.card__like-button').addEventListener('click', this._handleLikeIcon.bind(this));
        this._cardElement.querySelector('.card__delete-button').addEventListener('click', this._handleDeleteIcon.bind(this));
        this._cardElement.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });
    }


    // Toggle the like button active state
    _handleLikeIcon() {
        this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
    }


    // Handle the deletion of the card
    _handleDeleteIcon() {
        this._cardElement.remove(); // Remove the card element from the DOM
        this._cardElement = null; // Clean up the reference
    }


    // Main method to return the card view with populated data
    getView() {
        this._cardElement = this._getTemplate();
        this._setEventListeners();


        this._cardElement.querySelector('.card__title').textContent = this._name;
        const cardImage = this._cardElement.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;


        return this._cardElement;
    }
}



