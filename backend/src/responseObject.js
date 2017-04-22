exports.wrapParsedData = function(rows, parsedData) {
  return {
    data: parsedData,
    meta: {
      isEmptyData: rows.length === 0,
      emptyDataMessage: 'No data found!'
    }
  }
};