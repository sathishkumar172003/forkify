// built in
import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async await

// custom modules

import * as model from './model.js';
import { MODEL_TIMEOUT_SEC } from './config.js';

import recipeObj from './views/recipeViews.js';
import searchObj from './views/searchViews.js';
import resultObj from './views/resultView.js';
import paginationObj from './views/paginationView.js';
import bookmarkObj from './views/bookMarkView.js';
import addRecipeObj from './views/addRecipeView.js';

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
    recipeObj.bookMarkEventHandler(controlBookMarks);

    data = model.getSearchResultsPage();

    resultObj.update(data);
    bookmarkObj.render(model.state.bookmarks);
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

  recipeObj.update(recipe);
}

function controlBookMarks(recipe) {
  if (model.state.recipe.bookmarked) model.deleteBookMark(recipe.id);
  else model.addBookmarks(recipe);

  recipeObj.update(model.state.recipe);
  bookmarkObj.render(model.state.bookmarks);
}

async function controlForms(data) {
  try {
    addRecipeObj.loadSnipper();

    await model.uploadRecipe(data);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // render it to the success message

    addRecipeObj.renderMessage();
    // have a time out

    recipeObj.render(model.state.recipe);

    bookmarkObj.render(model.state.bookmarks);

    setTimeout(function () {
      addRecipeObj.refactor();
    }, MODEL_TIMEOUT_SEC * 1000);
  } catch (e) {
    addRecipeObj.renderError(e.message);
    setTimeout(function () {
      addRecipeObj.refactor();
    }, MODEL_TIMEOUT_SEC * 1000);
  }
}

const init = function () {
  bookmarkObj.render(model.state.bookmarks);
  addRecipeObj.formSubmissionEventHandler(controlForms);
  recipeObj.eventHandler(getSingleRecipe);
  searchObj.handleEvent(loadAllRecipes);
  paginationObj.handleEventClick(controlPagination);
  recipeObj.bookMarkEventHandler(controlBookMarks);
};

init();
