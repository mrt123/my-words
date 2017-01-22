import mockOxfordResponse from './mockOxfordAPI_ace';
import mockMyWords from './mockMyWords';

export default {
  fetchDefinition: function (word) {
    var self = this;
    return this._mockFetchDefinition(word)
      .then(self._parseResponseFromOxfordApi.bind(self));
  },

  fetchMyWords: function () {
    return this._mockFetchMyWords();
  },

  _mockFetchMyWords: function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(mockMyWords);
      }, 500);
    });
  },

  // use this to save request count on oxford API:
  _mockFetchDefinition: function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(mockOxfordResponse);
      }, 500);
    });
  },

  _fetchDefinitionFromOxfordApi: function (word) {

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
  },

  _parseResponseFromOxfordApi: function (resp) {
    var self = this;

    if (resp.status === 'NOT_FOUND') {
      return resp;
    }
    else {
      var newLexicalEntries = resp.results[0].lexicalEntries.map(function (oldLexEntry) {
        return {
          lexicalCategory: oldLexEntry.lexicalCategory,
          senses: self._parseSenseFromOxford(oldLexEntry.entries[0].senses)
        }
      });

      return {
        id: resp.results[0].id,
        metadata: resp.metadata,
        lexicalEntries: newLexicalEntries
      }
    }
  },

  _parseSenseFromOxford: function (oldSenses) {
    var self = this;
    return oldSenses.map(function (sense) {
      return {
        id: sense.id,
        definition: sense.definitions[0],
        examples: self._parseExamplesFromOxford(sense.examples)
      }
    })
  },

  _parseExamplesFromOxford: function (oxfordExamples) {

    if(oxfordExamples === undefined) {
      return [];
    }
    else {
      return oxfordExamples.map(function (example) {
        return example.text;
      })
    }
  }
}