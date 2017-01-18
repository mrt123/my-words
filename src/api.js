import mockOxfordResponse from './mockOxfordAPI_ace';

export default {
  fetchDefinition: function (word) {
    var self = this;
    return this._fetchDefinitionFromOxfordApi(word)
      .then(self._parseResponseFromOxfordApi.bind(self));
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
            results: []
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

    if (resp.results.length === 0) {
      return {
        metadata: '',
        lexicalEntries: []
      };
    }
    else {
      var newLexicalEntries = resp.results[0].lexicalEntries.map(function (oldLexEntry) {
        return {
          lexicalCategory: oldLexEntry.lexicalCategory,
          senses: self._parseSense(oldLexEntry.entries[0].senses)
        }
      });

      return {
        metadata: resp.metadata,
        lexicalEntries: newLexicalEntries
      }
    }
  },

  _parseSense: function (oldSenses) {
    return oldSenses.map(function (sense) {
      return {
        id: sense.id,
        definition: sense.definitions[0]
      }
    })
  }
}