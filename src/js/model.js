// model basically all our business logic, how we store data, state of the application, how we fetch the data . How we handle  the data

import { API_URL, API_KEY, RESULTS_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';

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

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}${id}?key=${API_KEY}`;

    const data = await AJAX(url);

    let recipe = createRecipeObject(data);

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

    let data = await AJAX(url);

    const { recipes } = data.data;

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
  persistBookmark();
}

export function deleteBookMark(id) {
  let indexToDel = state.bookmarks.findIndex(rec => (rec.id = id));
  state.bookmarks.splice(indexToDel, 1);

  // set the currect recipe bookmark to false
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  persistBookmark();
}

const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

const loadBookmarks = function () {
  let bookmarks = JSON.parse(localStorage.getItem('bookmark'));
  if (bookmarks && bookmarks.length > 0) {
    state.bookmarks = bookmarks;
  }
  console.log(state.bookmarks);
};

loadBookmarks();

export async function uploadRecipe(data) {
  try {
    // 1: convert object into array of array (entries)
    let dataArr = Object.entries(data);

    // choosing only the ingridients array [[ing1], [ing2], [ing3]] , ['ingridient-1', '0.5, kg , rice']
    let filteredArr = dataArr.filter(
      ele => ele[0].startsWith('ingredient') && ele[1]
    );

    // making a complete ingrients array of object where each object contains {quantity, unit, descirption}
    const ingredients = filteredArr.map(ele => {
      const ingArr = ele[1].split(',');

      // if user speicified wrong information (format)
      if (ingArr.length != 3)
        throw new Error(
          'Please provide the information in the correct format..'
        );

      //  check if the quanity is null
      for (let i = 0; i < ingArr.length; i++) {
        if (i == 0 && ingArr[i] == '') ingArr[i] = null;
      }

      // destructure the array
      const [quantity, unit, description] = ingArr;
      return {
        quantity,
        unit,
        description,
      };
    });

    let recipe = {
      title: data.title,
      publisher: data.publisher,
      source_url: data.sourceUrl,
      image_url: data.image,
      ingredients: ingredients,
      servings: +data.servings,
      cooking_time: +data.cookingTime,
    };

    let url = `${API_URL.slice(0, -1)}?key=${API_KEY}`;


    let result = await AJAX(url, recipe);

    recipe = createRecipeObject(result);
    state.recipe = recipe;
    addBookmarks(recipe);

    console.log('new console ', state.recipe);
  } catch (e) {
    throw e;
  }
}
