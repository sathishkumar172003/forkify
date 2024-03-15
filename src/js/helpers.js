// contains all the helper functions such as timeout , fetching from url etc

import { TIMEOUT_SEC } from './config.js';

export const getJSON = async function (url) {
  try {
    // checkweather you can fetch result withing specified time if not then throw error

    let response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    console.log(response);

    let data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    // if there is no error , send json data

    return data.data;
  } catch (e) {
    throw e;
  }
};

// time out functions

function timeout(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error(`request took too long! Timeout after ${sec} seconds `));
    }, sec * 1000);
  });
}
