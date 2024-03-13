// model basically all our business logic, how we store data, state of the application, how we fetch the data . How we handle  the data

import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
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
