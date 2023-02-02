require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const app = express();

const data = {};

const addUpNutrients = function (data) {
  const nutrients = {};
  data.forEach((item) => {
    for (const nutrient in item) {
      if (nutrient !== "name" && nutrient !== "serving_size_g") {
        nutrients.hasOwnProperty(nutrient)
          ? (nutrients[nutrient] = +nutrients[nutrient] + +item[nutrient])
          : (nutrients[nutrient] = item[nutrient]);
      }
    }
  });
  return convertToArray(nutrients);
};

axios.defaults.headers["X-API-KEY"] = process.env.NUTRITION_API_KEY;
const convertToArray = function (data) {
  const nutrients = [];
  for (const title in data) {
    nutrients.push({ title: title, value: data[title] });
  }
  return nutrients;
};

const getNutrition = async function (
  query = "A pizza wheel for cutting the cheesecake not required but easier to deal with than a knife"
) {
  try {
    await axios
      .get(`${process.env.NUTRITION_API}/?query=${query}`)
      .then((res) => {
        data.nutrients = addUpNutrients(res.data.items);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log("GET BUTRIENTS  ERORR");
    console.log(err);
  }
};

const getRecipe = async function (id) {
  try {
    await axios
      .get(`${process.env.API_URL}/${id}?key=${process.env.API_KEY}`)
      .then((res) => {
        const { recipe } = res.data.data;
        data.recipe = {
          cookingTime: recipe.cooking_time,
          id: recipe.id,
          ingredients: recipe.ingredients,
          publisher: recipe.publisher,
          servings: recipe.servings,
          title: recipe.title,
          imageUrl: recipe.image_url,
          sourceUrl: recipe.source_url,
        };
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log("GET RECIPE  ERROR");
    console.log(err);
  }
};

const getAll = async function (query) {
  try {
    await axios
      .get(`${process.env.API_URL}?search=${query}?key=${process.env.API_KEY}`)
      .then((res) => {
        data.results = res.data;
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log("GET REC ERROR");
    console.log(err);
  }
};

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/recipe/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "/recipe.html"));
});

app.get("/data/all/:id", async function (req, res) {
  try {
    const query = req.params.id;
    await getAll(query);
    // res.setHeader("Content-Type", "application/json");
    res.json(data.results);
  } catch (err) {
    console.log("RESPONSE ERROR");
    console.log(err);
  }
});

app.get("/data/recipe/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await getNutrition();
    await getRecipe(id);
    // res.setHeader("Content-Type", "application/json");
    res.send({ data });
  } catch (err) {
    console.log("RESPONSE ERROR");
    console.log(err);
  }
});

// app.get("/about", (req, res) => {
//   res.send("About");
// });

// app.get("/about/:id", (req, res) => {
//   console.log(req.params.id);
//   res.send(req.params.id);
// });

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
