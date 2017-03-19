import mockMyWords from './mockMyWords';
import mockMyUnknownWords from './mockMyUnknownWords.js';
import 'whatwg-fetch';

export let fetchDefinition = _fetchDefinition;
export let fetchMyWords = _mockFetchMyWords;
export let toggleWordFavorite = _toggleWordFavorite;
export let fetchMyUnknownWords = _mockFetchMyUnknownWords;

function _fetchDefinition(word) {
  return fetch('/api/words/' + word)
    .then(function (respPromise) {

      if (respPromise.status === 404) {
        return {
          status: 'NOT_FOUND'
        }
      }
      else {
        return respPromise.json()
      }
    })
    .catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

function _toggleWordFavorite(wordData) {
  var newFavoriteValue = !wordData.favorite;

  //  take word ID and favorite value
  //  return favorite value.

  return fetch("/api/favorites/",
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: wordData.id,
        favorite: newFavoriteValue
      })
    })
    .then((r)=> r.json());
}

function _mockFetchMyWords() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(mockMyWords);
    }, 1000);
  });
}

function _mockFetchMyUnknownWords() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(mockMyUnknownWords);
    }, 500);
  });
}
