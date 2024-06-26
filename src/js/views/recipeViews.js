import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';

import View from './View.js';

class RecipeViews extends View {
  _parentElement = document.querySelector('.recipe');
  _servingBtnContainer;

  _errorMessage = 'We could not find that recipe. Please try again';
  _message = '';

  _generateMarkup() {
    return ` <figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings" data-servings="${
          this._data.servings - 1
        } ">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-servings="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated  ${this._data.key ? '' : 'hidden'}  ">
    
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients.map(this._generateMarkupIngrediants).join(' ')}
      

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _generateMarkupIngrediants(ing) {
    return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
  }

  eventHandler(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  servingsEventHandler(handler) {
    // event delegation

    this._servingBtnContainer = document.querySelector('.recipe__info-buttons');
    this._servingBtnContainer.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');

      if (!btn) return; // guard clause

      const { servings } = btn.dataset;

      if (+servings > 0) handler(+servings);
    });
  }

  bookMarkEventHandler(handler) {
    // listens for an click event on bookmark button
    // click -> take the closest -> find use element  -> change the href attribute

    const btn = this._parentElement.querySelector('.btn--round');

    btn.addEventListener(
      'click',
      function (e) {
        let parentBtn = e.target.closest('.btn--round');

        const useEl = parentBtn.querySelector('use');

        //useEl.setAttribute('href', useEl.getAttribute('href') + '-fill');

        // passing my current recipe to the callback function
        handler(this._data);
      }.bind(this)
    );
  }
}

const recipeObj = new RecipeViews();
export default recipeObj;
