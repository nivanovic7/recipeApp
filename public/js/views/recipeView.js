class RecipeView {
  _parentElement = this.document.querySelector(".content");

  render(data) {
    this._clear();
    this.document.querySelector(".recipe-title").textContent =
      data.recipe.title;
    this._parentElement.innerHTML = this._getHtml(data);
    this._parentElement
      .querySelector(".close__btn")
      .addEventListener("click", function () {
        recipeModal.style.visibility = "hidden";
        document.querySelector(".results").classList.remove("grow");
      });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _getHtml(data) {
    return `
    <div class="side">
      <div class="img-wrap">
        <img
          src="${data.recipe.imageUrl}"
          alt="img"
        />
      </div>
      <div class="nutrition">
        <h3>Nutrition</h3>
        <ul>
         ${data.nutrients
           .map((nutrient) => {
             return `<li>${nutrient.title}: ${nutrient.value}</li>`;
           })
           .join("")}
        </ul>
      </div>
    </div>
    <div class="side">
      <div class="ingredients">
        <h2>Ingredients</h2>
        <ul>
         ${data.recipe.ingredients
           .map((ing) => {
             return `<li>${ing.quantity || ""} ${ing.unit || ""} ${
               ing.description
             }</li>`;
           })
           .join("")}
        </ul>
      </div>

      <div class="directions>
      <h3>Directions</h3>
      <p>This recipe was carefully designed and tested by ${
        data.recipe.publisher
      }. Please check out directions at their <a href="${
      data.recipe.sourceUrl
    }">website</a>.

      </p>
       </div>
  </div>`;
  }
}

export default new RecipeView();
