import 'whatwg-fetch';
const API_HOST = getApiHost();

export function fetchUser() {
  return getResponseFromFetch(fetchWithCredentials(API_HOST + '/api/users/me'));
}

export function fetchDefinition(word) {
  return getResponseFromFetch(fetchWithCredentials(API_HOST + '/api/words/' + word));
}

export function fetchFavoriteByWordId(wordId) {
  return getResponseFromFetch(fetchWithCredentials(API_HOST + '/api/favorite/words/' + wordId));
}

export function toggleFavoriteByWordId(newFavValue, wordId) {
  return fetchWithCredentials(API_HOST + "/api/favorite/words/",
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
  return getResponseFromFetch(fetchWithCredentials(API_HOST + '/api/favorite/words/'));
}

function fetchWithCredentials(resourceUrl, opts = {}) {
  var optsWithCredentials = Object.assign(opts, {
    credentials: 'include'
  });
  return fetch(resourceUrl, optsWithCredentials);
}

function getResponseFromFetch(fetchResult) {
  return fetchResult
    .then(takeAuthAction)
    .then(parseServerResponse)
    .catch((parsingError) => {
      return getErrorForMessage(parsingError.message);
    });
}

function takeAuthAction(response) {
  if(response.status === 401) {
    document.cookie = "logged=false";
    location.href = '/login';
  }
  return response;
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

export function getApiHost() {
  if(process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_WORDS_API_HOST;
  }
  else {
    return 'http://localhost:1337';
  }
}