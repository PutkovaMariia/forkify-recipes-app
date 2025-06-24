import View from "./View";
import { formatFraction } from "../helpers";

import bookmarkIconUrl       from "url:../../img/icons/icon-bookmark-light.svg";
import bookmarkFillIconUrl   from "url:../../img/icons/icon-bookmark-fill-light.svg";
import clockIconUrl          from "url:../../img/icons/icon-clock.svg";
import usersIconUrl          from "url:../../img/icons/icon-users.svg";
import minusIconUrl          from "url:../../img/icons/icon-minus-circle.svg";
import plusIconUrl           from "url:../../img/icons/icon-plus-circle.svg";
import userIconUrl           from "url:../../img/icons/icon-user.svg";
import arrowRightIconUrl     from "url:../../img/icons/icon-arrow-right-light.svg";
import checkIconUrl          from "url:../../img/icons/icon-check.svg";

class RecipeView extends View {
    _parentElement = document.querySelector(".recipe");
    _errorMessage = "We could not find that recipe. Please try another one!";
    _message = "";

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((ev) =>
            window.addEventListener(ev, handler)
        );
    }
    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--update-servings");
            if (!btn) return;
            const { updateTo } = btn.dataset;
            if (+updateTo > 0) handler(+updateTo);
        });
    }
    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--bookmark");
            if (!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        const iconUrl = this._data.bookmarked
            ? bookmarkFillIconUrl
            : bookmarkIconUrl;

        return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title"><span>${this._data.title}</span></h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <img src="${clockIconUrl}" alt="Clock" class="recipe__info-icon" />
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <img src="${usersIconUrl}" alt="Users" class="recipe__info-icon" />
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings -
        1}">
              <img src="${minusIconUrl}" alt="Decrease servings" />
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings +
        1}">
              <img src="${plusIconUrl}" alt="Increase servings" />
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
          <img src="${userIconUrl}" alt="User generated recipe" />
        </div>

        <button class="btn--round btn--bookmark">
          <img
            src="${iconUrl}"
            alt="${this._data.bookmarked ? "Bookmarked" : "Bookmark"}"
            class="bookmark__icon"
          />
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map((ing) => this._generateMarkupIngredient(ing))
            .join("")}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
          <span>Directions</span>
          <img src="${arrowRightIconUrl}" alt="Go to directions" class="search__icon" />
        </a>
      </div>
    `;
    }

    _generateMarkupIngredient(ing) {
        return `
      <li class="recipe__ingredient">
        <img src="${checkIconUrl}" alt="Ingredient check" class="recipe__icon" />
        <div class="recipe__quantity">${
            ing.quantity ? formatFraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
    }
}

export default new RecipeView();
