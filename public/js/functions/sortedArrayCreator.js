const sortedArrayCreator = async () => {
  const symbolArr = [];
  try {
    const data = await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo");
    const parsed = await data.json();
    const symbols = await parsed.symbols;
    symbols.forEach((symbol) => {
      if (symbol.contractType == "PERPETUAL") {
        symbolArr.push(symbol.pair);
      }
    });
    symbolArr.sort(function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    return symbolArr;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sortedArrayCreator;
