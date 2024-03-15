// built in
import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async await

// custom modules

import * as model from './model.js';
import recipeObj from './views/recipeViews.js';
import searchObj from './views/searchViews.js';

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

// https://forkify-api.herokuapp.com/v2

const getSingleRecipe = async function () {
  let id = window.location.hash;
  if (!id) return;

  recipeObj.loadSnipper();
  id = id.slice(1);

  try {
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);

    recipeObj.render(recipe);
  } catch (err) {
    // handle the error
    console.log(err);
    recipeObj.renderError();
  }
};

const loadAllRecipes = async function () {
  try {
    value = searchObj.getQuery();
    await model.getAllRecipes(value);
    searchObj.render(model.state.allRecipes.slice(0, 10));
  } catch (e) {
    alert(e);
  }
};

const init = function () {
  recipeObj.eventHandler(getSingleRecipe);
  searchObj.handleEvent(loadAllRecipes);
};

init();
