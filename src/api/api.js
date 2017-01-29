import mockOxfordResponse from './mockOxfordAPI_ace';
import mockMyWords from './mockMyWords';
import mockMyUnknownWords from './mockMyUnknownWords.js';

export let fetchDefinition = _fetchDefinition;
export let fetchMyWords = _mockFetchMyWords;
export let markWordAsFavorite = _markWordAsFavorite;
export let fetchMyUnknownWords = _mockFetchMyUnknownWords;

function _fetchDefinition(word) {
  return _mockFetchDefinition(word)
    .then(resp => _parseResponseFromOxfordApi(resp));
}

function _markWordAsFavorite(wordData) {
  var newFavoriteValue = !wordData.favorite;

  // should take word ID and add/remove from myWords.
  // should return updated word data.

  // Mocked:
  return new Promise(function (resolve) {
    setTimeout(function () {
      wordData.favorite = newFavoriteValue;
      resolve(wordData);
    }, 1000)
  });
}

function _fetchDefinitionFromOxfordApi(word) {

  return fetch('/api/v1/entries/en/' + word, {
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
      id: sense.id,
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
