import View from "./View";
import userIconUrl from "url:../../img/icons/icon-user.svg";

class PreviewView extends View {
    _parentElement = "";

    _generateMarkup() {
        const id = window.location.hash.slice(1);

        return `
      <li class="preview">
        <a
          class="preview__link ${
            this._data.id === id ? "preview__link--active" : ""
        }"
          href="#${this._data.id}"
        >
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
            this._data.key ? "" : "hidden"
        }">
              <img
                src="${userIconUrl}"
                alt="User icon"
                class="preview__user-icon"
              />
            </div>
          </div>
        </a>
      </li>
    `;
    }
}

export default new PreviewView();
