// contains all the helper functions such as timeout , fetching from url etc

import { TIMEOUT_SEC } from './config.js';

// rejects the promise  after specified time
function timeout(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error(`request took too long! Timeout after ${sec} seconds `));
    }, sec * 1000);
  });
}

export async function AJAX(url, uploadData = undefined) {
  try {
    // returns the network call promise
    const networkCall = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // check if the promise resolves within specified time or throw error (network failure)
    const response = await Promise.race([networkCall, timeout(TIMEOUT_SEC)]);

    // extract data from it
    const data = await response.json();

    // throw error if the request is failed
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);

    return data;
  } catch (e) {
    throw e;
  }
}

/** 


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



export const sendJson = async function (url, data) {
  try {
    const fetchAPI = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let response = await Promise.race([fetchAPI, timeout(TIMEOUT_SEC)]);
    console.log(response);
    let result = await response.json();
    console.log(result);

    if (!response.ok) throw new Error(`${result.message} ${response.status}`);
    return result.data.recipe;
  } catch (e) {
    throw e;
  }
};

*/
