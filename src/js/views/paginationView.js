import View from "./View";
import arrowRightIconUrl from "url:../../img/icons/icon-arrow-right-primary.svg";
import arrowLeftIconUrl  from "url:../../img/icons/icon-arrow-left-primary.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <img src="${arrowRightIconUrl}" alt="Go to next page" class="search__icon" />
        </button>
      `;
        }

        // Last page
        if (curPage === numPages && numPages > 1) {
            return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <img src="${arrowLeftIconUrl}" alt="Go to previous page" class="search__icon" />
          <span>Page ${curPage - 1}</span>
        </button>
      `;
        }

        // Any middle page
        if (curPage < numPages) {
            return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <img src="${arrowLeftIconUrl}" alt="Go to previous page" class="search__icon" />
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <img src="${arrowRightIconUrl}" alt="Go to next page" class="search__icon" />
        </button>
      `;
        }

        // Only one page
        return "";
    }
}

export default new PaginationView();
