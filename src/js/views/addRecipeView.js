import { mark } from 'regenerator-runtime';
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('form.upload');
  _overlay = document.querySelector('.overlay');
  _windowElement = document.querySelector('.add-recipe-window');
  _closingBtn = document.querySelector('.btn--close-modal');
  _openingBtn = document.querySelector('.nav__btn--add-recipe');
  _message = 'recipe added successfully';

  constructor() {
    super();
    this.addEventHandler();
    this.closeEventHandler();
  }

  addEventHandler() {
    this._openingBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  closeEventHandler() {
    this._closingBtn.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }

  formSubmissionEventHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];

      const data = Object.fromEntries(dataArr); // creating object from array of array. eacch inner array will be considered as key:value pairs

      handler(data); // data is just an object
    });
  }

  refactor() {
    const markup = ` <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST123" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST123" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST123" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>

    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('beforeend', markup);

    if (!this._overlay.classList.contains('hidden'))
      this._overlay.classList.add('hidden');
    if (!this._windowElement.classList.contains('hidden'))
      this._windowElement.classList.add('hidden');
  }
}

export default new AddRecipeView();
