// model basically all our business logic, how we store data, state of the application, how we fetch the data . How we handle  the data

import { API_URL, API_KEY } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  allRecipes: [],
};

export const loadRecipe = async function (id) {
  try {
    const url = API_URL + id;

    let { recipe } = await getJSON(url);

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };

    state.recipe = recipe;
  } catch (e) {
    throw e;
  }
};

export const getAllRecipes = async function (value) {
  try {
    const url = urlBuilder(API_URL, value, API_KEY);

    let { recipes } = await getJSON(url);
    console.log(recipes);

    state.allRecipes = recipes;
  } catch (e) {
    throw e;
  }
};

function urlBuilder(baseUrl, searchValue, keyValue) {
  return `${baseUrl}?search=${searchValue}&key=${keyValue}`;
}
