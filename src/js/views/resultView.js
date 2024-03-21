import icons from '../../img/icons.svg';
import View from './View.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find any result for your query';
  _message;

  _generateMarkup() {
    console.log(this._data);



    // if any of the id of the recipe is equals to the hash of the url=>the user is currently viewing that recipe. so make it selected
    
    const curId = window.location.hash.slice(1)
    
    


    return this._data
      .map(recipe => {
        return ` <li class="preview">
            <a class="preview__link ${curId == recipe.id ? 'preview__link--active' : ''}" href="#${recipe.id}">
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
      .join('');
  }
}

const resultObj = new ResultView();
export default resultObj;
