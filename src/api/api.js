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
    .then(parseServerResponse)
    .catch((parsingError) => {
      return getErrorForMessage(parsingError.message);
    });
}

function parseServerResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return getErrorForMessage(response.status);
  }
}

function getErrorForMessage(message) {
  return {
    meta: {
      isError: true,
      errorMsg: 'Error: ' + message
    }
  }
}