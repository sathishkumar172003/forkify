// built in
import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async await

// custom modules

import * as model from './model.js';
import recipeObj from './views/recipeViews.js';
import searchObj from './views/searchViews.js';
import resultObj from './views/resultView.js';
import paginationObj from './views/paginationView.js';

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
    recipeObj.servingsEventHandler(controlServings);
  } catch (err) {
    // handle the error
    console.log(err);
    recipeObj.renderError();
  }
};

const loadAllRecipes = async function () {
  try {
    resultObj.loadSnipper();
    value = searchObj.getQuery();
    await model.getAllRecipes(value);

    data = model.getSearchResultsPage();

    resultObj.render(data);
    paginationObj.render(model.state.search);
  } catch (e) {
    alert(e);
  }
};

// handling the pagination button changing
function controlPagination(page) {
  data = model.getSearchResultsPage(page);
  resultObj.render(data);
  paginationObj.render(model.state.search);
}

// handling the servings changes
function controlServings(newServings) {
  model.handleServings(newServings);

  const { recipe } = model.state;
  console.log(recipe);

  recipeObj.render(recipe);
  recipeObj.servingsEventHandler(controlServings);
}

const init = function () {
  recipeObj.eventHandler(getSingleRecipe);
  searchObj.handleEvent(loadAllRecipes);
  paginationObj.handleEventClick(controlPagination);
};

init();
