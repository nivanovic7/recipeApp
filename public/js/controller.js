import * as model from "./model.js";
import SearchView from "./views/searchView.js";
// import RecipeView from "./views/recipeView.js";
import ResultsView from "./views/resultsView.js";

const recipeController = async function () {
  const id = this.location.hash.slice(1);

  if (!id) return;
  console.log(id);
  await model.getRecipe(id);
  console.log(model.state);
  //   RecipeView.render(model.state.recipe);
};

const controlSearchResults = async function () {
  const query = SearchView.getQuery();
  await model.getResults(query);
  console.log(model.state.results);
  ResultsView.render(model.state.results);
  //   const string = model.state.recipe.ingredients
  //     .map((ing) => {
  //       console.log("Gl");
  //       return `${ing.quantity} ${ing.unit} ${ing.description}`;
  //     })
  //     .join("");
  //   console.log(model.state.recipe);
};
const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener("hashchange", recipeController);
window.addEventListener("load", recipeController);
