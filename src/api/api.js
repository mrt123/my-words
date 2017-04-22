import 'whatwg-fetch';

// must handle 500 & 404 in case if backend fails to handle it!
export function fetchDefinition(word) {
  return fetch('/api/words/' + word)
    .then(function (respPromise) {

      if (respPromise.status === 404) {
        return {
          meta: {
            isError: true,
            errorMsg: 'No connection to the server!'
          }
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

export function fetchFavoriteByWordId(wordId) {
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