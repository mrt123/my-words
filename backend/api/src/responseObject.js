exports.wrapParsedWordData = function(rows, parsedData) {
  return {
    data: parsedData,
    meta: {
      isError: rows.length === 0,
      errorMsg: 'No data found!'
    }
  }
};

exports.wrapError = function(errorMsg) {
  return {
    data: {},
    meta: {
      isError: true,
      errorMsg: errorMsg
    }
  }
};