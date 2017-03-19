import mockMyUnknownWords from './mockMyUnknownWords.js';
import 'whatwg-fetch';

export let fetchDefinition = _fetchDefinition;
export let fetchMyWords = _fetchMyWords;
export let fetchFavoriteByWordId = _fetchFavoriteByWordId;
export let toggleWordFavorite = setFavoriteEntry;
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

function _fetchFavoriteByWordId(wordId) {
  return fetch('/api/favorite/words/' + wordId)
    .then(function (respPromise) {

      if (respPromise.status === 404) {
        return {
          status: 'NOT_FOUND'
        }
      }
      else {
        return respPromise.json(); // TODO: include error report in same format on backend!
      }
    })
    .catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

function setFavoriteEntry(wordData) {

  return fetch("/api/favorite/words/",
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: wordData.wordId,
        favorite: !wordData.favorite
      })
    })
    .then((r)=> r.json());
}

function _fetchMyWords() {
  return fetch('/api/favorite/words/')
    .then(function (respPromise) {

      if (respPromise.status === 404) {
        return {
          status: 'NOT_FOUND'
        }
      }
      else {
        return respPromise.json();
      }
    })
    .catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

function _mockFetchMyUnknownWords() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(mockMyUnknownWords);
    }, 500);
  });
}
