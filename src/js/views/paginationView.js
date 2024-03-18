import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // pagination related logic
    console.log(this._data.page);
    // TASK 1: Determine number of buttons
    const numOfPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    // TASK 2: Cases to determine what buttons should be displayed

    // CASE 1: I am in First Page and There are other Pages .

    if (this._data.page == 1 && numOfPages > 1) {
      return ` 
  <button class="btn--inline pagination__btn--next" data-page='${
    this._data.page + 1
  }'>
    <span >Page ${this._data.page + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;
    }

    // CASE 2: I am in some other page and there are pages to the left and right
    if (this._data.page < numOfPages) {
      return ` <button class="btn--inline pagination__btn--prev" data-page='${
        this._data.page - 1
      }'>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span >Page ${this._data.page - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-page='${
      this._data.page + 1
    }'>
      <span >Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }

    // CASE 3: I am in last page and there are some pages to the left and no pages in the right
    if (this._data.page == numOfPages && numOfPages > 1) {
      return ` <button class="btn--inline pagination__btn--prev" data-page='${
        this._data.page - 1
      }'>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span >Page ${this._data.page - 1}</span>
    </button>
  `;
    }

    // CASE 4: There is only page to be displayed
    return ' ';
  }

  handleEventClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const pageNum = Number(btn.dataset.page);

      handler(pageNum);
    });
  }
}

export default new PaginationView();
