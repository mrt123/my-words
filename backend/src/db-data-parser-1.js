exports.parseWord = parseWordFromDatabaseRows;

function parseWordFromDatabaseRows(rows) {
  return {
    id: rows[0].word,
    metadata: 'from https://sourceforge.net/projects/mysqlenglishdictionary/files/englishdictionary.sql/download',
    lexicalEntries: parseLexicalEntriesFromRows(rows)
  }
}

function parseLexicalEntriesFromRows(rows) {

  var rowsWithRemappedWordTypes = rows.map((r)=>{
    return {
      id: r.id,
      word: r.word,
      wordtype: getWordTypeFromAbbreviation(r.wordtype),
      definition: r.definition
    }
  });

  var uniqueWordTypes = getUniqueWordTypesFromRows(rowsWithRemappedWordTypes);
  return uniqueWordTypes.map(function (wordType) {
    return {
      lexicalCategory: wordType,
      senses: getSensesFromRowsForWordType(rowsWithRemappedWordTypes, wordType)
    }
  });
}

function getUniqueValuesFromArray(rows) {
  function onlyUnique(row, index, self) {
    return self.indexOf(row) === index;
  }

  return rows.filter(onlyUnique);
}

function getUniqueWordTypesFromRows(rows) {
  function onlyUnique(row, index, self) {
    return self.indexOf(row) === index;
  }

  return rows.map(function (row) {
    return row.wordtype;
  }).filter(onlyUnique);    // use loadash?
}

function getSensesFromRowsForWordType(rows, wordType) {
  return rows.filter(function (row) {
    return row.wordtype === wordType;
  }).map(function (row) {
    return {
      id: row.id,
      definition: row.definition,
      examples: []
    }
  });
}

function getWordTypeFromAbbreviation(categoryAbbreviation) {
  if (categoryAbbreviation === 'v.') return 'verb';
  if (categoryAbbreviation === 'v. t.') return 'verb';
  if (categoryAbbreviation === 'v. i.') return 'verb';
  if (categoryAbbreviation === 'n.') return 'noun';
  if (categoryAbbreviation === 'a.') return 'adjective';
  else return categoryAbbreviation;
}