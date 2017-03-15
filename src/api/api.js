import mockOxfordResponse from './mockOxfordAPI_ace';
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

function _fetchDefinitionFromOxfordApi(word) {

  return fetch('/oxfordApi/v1/entries/en/' + word, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "app_id": "678dcf1a",
      "app_key": "e72043d87ba44b00ec500fa96e6dc20b"
    }
  })
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

// use this to save request count on oxford API:
function _mockFetchDefinition() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(mockOxfordResponse);
    }, 500);
  });
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

function _parseResponseFromOxfordApi(resp) {
  if (resp.status === 'NOT_FOUND') {
    return resp;
  }
  else {
    var newLexicalEntries = resp.results[0].lexicalEntries.map(function (oldLexEntry) {
      return {
        lexicalCategory: oldLexEntry.lexicalCategory,
        senses: _parseSenseFromOxford(oldLexEntry.entries[0].senses)
      }
    });

    return {
      id: resp.results[0].id,
      metadata: resp.metadata,
      lexicalEntries: newLexicalEntries
    }
  }
}

function _parseSenseFromOxford(oldSenses) {
  return oldSenses.map(function (sense) {
    return {
      id: sense.id,   // TODO:  might remove this id and instead use compound key (word + definition)
      definition: sense.definitions[0],
      examples: _parseExamplesFromOxford(sense.examples)
    }
  })
}

function _parseExamplesFromOxford(oxfordExamples) {

  if (oxfordExamples === undefined) {
    return [];
  }
  else {
    return oxfordExamples.map(function (example) {
      return example.text;
    })
  }
}
