import icons from '../../img/icons.svg';

class BookMarkView {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;

  // whenever there is a bookmark added or deleted, render or update the book mark view

  render(bookmarkArr) {
    // i received an empty array so return

    let markup;

    if (Array.isArray(bookmarkArr) && bookmarkArr.length == 0) {
      markup = this._generateDefaultMarkup();
    } else {
      this._data = bookmarkArr;

      // create markup for the data
      markup = this._generateMarkup();
      console.log(markup);
    }

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    // for every recipe in bookmark array i want to create a list

    // TODO:

    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(bookmark) {
    let curId = window.location.hash.slice(1);

    return `<li class="preview">
    <a class="preview__link ${
      bookmark.id == curId ? 'preview__link--active' : ''
    }" href="#${bookmark.id}">
      <figure class="preview__fig">
        <img src="${bookmark.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">
          ${bookmark.title}
        </h4>
        <p class="preview__publisher">${bookmark.publisher}</p>
      </div>
    </a>
  </li> `;
  }

  _generateDefaultMarkup() {
    return `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`;
  }

  // implement your own update method
}

export default new BookMarkView(); // exporting object
