// model basically all our business logic, how we store data, state of the application, how we fetch the data . How we handle  the data

import { API_URL, API_KEY, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: null,
    result: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
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

    // if the recipe is already in bookmark array: make it as true else false
    if (state.bookmarks.some(rec => rec.id == id)) recipe.bookmarked = true;
    else recipe.bookmarked = false;

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

    state.search.result = recipes;
    state.search.query = value;
    state.search.page = 1;
  } catch (e) {
    throw e;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  // let curPage = 1;
  // let limit = 10;
  // let skip = (curPage - 1) * limit;

  // halfData = model.state.allRecipes.slice(skip);
  // data = halfData.slice(0, limit);
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  const data = state.search.result.slice(start, end);

  return data;
};

function urlBuilder(baseUrl, searchValue, keyValue) {
  return `${baseUrl}?search=${searchValue}&key=${keyValue}`;
}

// handling servings
export function handleServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  console.log(newServings);
  // set the new servings
  state.recipe.servings = newServings;
  console.log(state.recipe.servings);
}

// handle bookmarking

export function addBookmarks(recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
}

export function deleteBookMark(id) {
  let indexToDel = state.bookmarks.findIndex(rec => (rec.id = id));
  state.bookmarks.splice(indexToDel, 1);

  // set the currect recipe bookmark to false
  if (id == state.recipe.id) state.recipe.bookmarked = false;
 
}
