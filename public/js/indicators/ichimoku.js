const Ichimoku = require("technicalindicators").IchimokuCloud;

function IchimokuIndicator(highPrices, lowPrices) {
  const ichimokuInput = {
    high: highPrices,
    low: lowPrices,
    conversionPeriod: 9,
    basePeriod: 26,
    spanPeriod: 52,
    displacement: 26,
  };
  const result = Ichimoku.calculate(ichimokuInput);
  const finalVal = result[result.length - 2];
  let finalContentLines = "";
  let finalColorLines = "";
  let finalContentSpan = "";
  let finalColorSpan = "";
  if (!finalVal) {
    finalContentLines = "NIL";
    finalColorLines = "black";
    finalContentSpan = "NIL";
    finalColorSpan = "black";
  } else {
    if (finalVal.conversion < finalVal.base) {
      finalContentLines = "SELL";
      finalColorLines = "red";
    } else {
      finalContentLines = "BUY";
      finalColorLines = "green";
    }
    if (finalVal.spanA < finalVal.spanB) {
      finalContentSpan = "SELL";
      finalColorSpan = "red";
    } else {
      finalContentSpan = "BUY";
      finalColorSpan = "green";
    }
  }

  const finalObj = {
    finalContentLines: finalContentLines,
    finalColorLines: finalColorLines,
    finalContentSpan: finalContentSpan,
    finalColorSpan: finalColorSpan,
  };

  return finalObj;
}

module.exports = IchimokuIndicator;
