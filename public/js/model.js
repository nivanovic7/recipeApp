export const state = {
  results: {},
  query: "",
  recipe: {},
};

export const getResults = async function (query) {
  const req = await fetch(`http://localhost:3000/data/all/${query}`);
  const { data } = await req.json();
  state.results = data.recipes;
  state.query = query;
};

export const getRecipe = async function (id) {
  try {
    const req = await fetch(`http://localhost:3000/data/recipe/${id}`);
    const res = await req.json();
    state.recipe = res.data;
  } catch (err) {
    console.log(err);
  }
};
