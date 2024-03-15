// importing file path

import icons from '../../img/icons.svg';

class SearchViews {
  #parentElement = document.querySelector('.results');
  #data;
  #form = document.querySelector('.search');
  #inputEl = document.querySelector('.search__field');

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterend', markup);
  }

  #generateMarkup() {
    return `${this.#data
      .map(recipe => {
        return ` <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
      })
      .join('')}`;
  }
  // clear the inputs
  #clearInput() {
    this.#inputEl.value = '';
  }

  getQuery() {
    const value = this.#inputEl.value;
    this.#clearInput();
    return value;
  }

  // handle the form submitting event
  handleEvent(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault(); // do not upload / refresh
      handler();
    });
  }
}

const searchObj = new SearchViews();

export default searchObj;
