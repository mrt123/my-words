exports.parseWord = _parseWordFromDatabaseRows;

function _parseWordFromDatabaseRows(rows) {
  return {
    id: rows[0].word,
    metadata: 'from https://sourceforge.net/projects/mysqlenglishdictionary/files/englishdictionary.sql/download',
    lexicalEntries: _parseLexicalEntriesFromRows(rows)
  }
}

function _parseLexicalEntriesFromRows(rows) {

  var rowsWithRemappedWordTypes = rows.map((r)=>{
    return {
      word: r.word,
      wordtype: _getLexicalCategoryFromAbbreviation(r.wordtype),
      definition: r.definition
    }
  });

  var uniqueWordTypes = getWordTypesFromRows(rowsWithRemappedWordTypes);
  console.log(getUniqueValuesFromArray(uniqueWordTypes));
  return uniqueWordTypes.map(function (wordType) {
    return {
      lexicalCategory: wordType,
      senses: _getSensesFromRowsForLexicalCategory(rowsWithRemappedWordTypes, wordType)
    }
  });
}

function getUniqueValuesFromArray(rows) {
  function onlyUnique(row, index, self) {
    return self.indexOf(row) === index;
  }

  return rows.filter(onlyUnique);
}

function getWordTypesFromRows(rows) {
  function onlyUnique(row, index, self) {
    return self.indexOf(row) === index;
  }

  return rows.map(function (row) {
    return row.wordtype;
  }).filter(onlyUnique);    // use loadash?
}

function _getSensesFromRowsForLexicalCategory(rows, category) {
  return rows.filter(function (row) {
    return row.wordtype === category;
  }).map(function (row) {
    return {
      definition: row.definition,
      examples: []
    }
  });
}

function _getLexicalCategoryFromAbbreviation(categoryAbbreviation) {
  if (categoryAbbreviation === 'v.') return 'verb';
  if (categoryAbbreviation === 'v. t.') return 'verb';
  if (categoryAbbreviation === 'v. i.') return 'verb';
  if (categoryAbbreviation === 'n.') return 'noun';
  if (categoryAbbreviation === 'a.') return 'adjective';
}