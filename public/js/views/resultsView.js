class ResultsView {
  _parentElement = document.querySelector(".results");

  render(data) {
    this._clear();
    this._parentElement.innerHTML = this._getHtml(data);
    this._parentElement.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", function () {
        header.style.height = "50vh";
        inputSearch.style.width = "200px";
        // recipeModal.style.visibility = "visible";
        // recipeModal.style.opacity = "1";
        this.classList.add("fill");
        // document.querySelector(".results").classList.add("grow");
      });
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _getHtml(data) {
    const html = data
      .map((recipe) => {
        return ` <a href=recipe/${recipe.id} class="card"  target="_blank" id="${recipe.id}">
          <div class="card-title">
            <p>${recipe.title}</p>
          </div>
          <img
            src="${recipe.image_url}"
            alt=""
          />
        </a>`;
      })
      .join("");
    return html;
  }
}

export default new ResultsView();
