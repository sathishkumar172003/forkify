import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    // the task of render is to set the render not to generate markup, single reponsibility
    this._data = data;

    if (!data || (Array.isArray(data) && data.length == 0)) {
      this.renderError();
      return;
    }

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length == 0)) {
      // if i get undefined or empty array -> stop

      return;
    }

    // generate markup for the data that is being passed
    this._data = data;
    const markup = this._generateMarkup();

    // creating a virtual dom based on markup string

    const range = document.createRange();
    const virtualDom = range.createContextualFragment(markup); // js creates an object for every dom element

    // create a nodeList from the dom object
    let newElements = virtualDom.querySelectorAll('*'); // similar to array but not array

    // convert the nodeList to Array
    newElements = Array.from(newElements);

    // now take the existing dom and convert it into array
    let oldElements = this._parentElement.querySelectorAll('*');
    oldElements = Array.from(oldElements);

    // now compare both the elements
    oldElements.forEach((oldEl, i) => {
      const newEl = newElements[i];
      // for changing the value
      if (
        !oldEl.isEqualNode(newElements[i]) &&
        oldEl.firstChild?.nodeValue.trim() != ''
      ) {
        oldEl.textContent = newEl.textContent;
      }

      // changing attributes

      if (!oldEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          oldEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  // private methods

  _clear() {
    this._parentElement.innerHTML = '';
  }
  // public methods
  loadSnipper() {
    const markup = ` <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p> ${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p> ${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
