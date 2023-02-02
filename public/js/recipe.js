let data = {};

const getRecipe = async function () {
  try {
    const path = window.location.href.split("/");
    const id = path[path.length - 1];
    const req = await fetch(`http://localhost:3000/data/recipe/${id}`);
    const res = await req.json();
    data = res.data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("load", async function () {
  await getRecipe();
  console.log(data);
  const parentElement = this.document.querySelector(".content");
  console.log(parentElement);
  this.document.querySelector(".recipe-title").textContent = data.recipe.title;
  const html = `
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

  parentElement.innerHTML = html;
});
