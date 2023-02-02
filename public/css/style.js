const header = document.querySelector(".header");
const form = document.querySelector("form");
const inputSearch = document.querySelector(".search-form__input");
const buttonSubmit = document.querySelector(".search-form button");
const recipeModal = document.querySelector(".recipe__modal");
const card = document.querySelectorAll(".card");
const results = document.querySelectorAll(".results");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  header.style.height = "50vh";
  inputSearch.style.width = "200px";
});

inputSearch.addEventListener("focus", function () {
  header.style.height = "100vh";
  inputSearch.style.width = "450px";
});

card.forEach((card) => {
  console.log(this);
  card.addEventListener("click", function () {
    recipeModal.classList.add("show-modal");
    // results.classList.add("grow");
  });
});
