import View from './View.js';

class SearchViews extends View {
  _parentElement = document.querySelector('.search');
  _inputEl = document.querySelector('.search__field');

  _clearInput() {
    this._inputEl.value = '';
  }

  getQuery() {
    const value = this._inputEl.value;
    this._clearInput();
    return value;
  }

  handleEvent(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // do not upload / refresh
      handler();
    });
  }
}

const searchObj = new SearchViews();

export default searchObj;
