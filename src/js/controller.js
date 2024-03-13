// built in
import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async await

// custom modules

import * as model from './model.js';
import recipeObj from './views/recipeViews.js';

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

const init = function () {
  recipeObj.eventHandler(getSingleRecipe);
};

init();
