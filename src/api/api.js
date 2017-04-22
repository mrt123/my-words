import 'whatwg-fetch';

export function fetchDefinition(word) {
  return getResponseFromFetch(fetch('/api/words/' + word));
}

export function fetchFavoriteByWordId(wordId) {
  return getResponseFromFetch(fetch('/api/favorite/words/' + wordId));
}

export function toggleFavoriteByWordId(newFavValue, wordId) {
  return fetch("/api/favorite/words/",
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wordId: wordId,
        isFavorite: newFavValue
      })
    })
    .then((r)=> r.json());
}

export function fetchMyWordsIds() {
  return getResponseFromFetch(fetch('/api/favorite/words/'));
}

function getResponseFromFetch(fetchResult) {
  return fetchResult
    .then(function (respPromise) {
      return parseServerResponse(respPromise);
    })
    .catch(function (ex) {
      console.log('parsing failed', ex)
    });
}

function parseServerResponse(response) {
  if (response.status === 404) {
    return {
      meta: {
        isError: true,
        errorMsg: 'No connection to the server!'
      }
    }
  }
  else {
    return response.json()
  }
}