const RSI = require("technicalindicators").RSI;

function RSIIndicator(closePrices) {
  const inputRSI = {
    values: closePrices,
    period: 14,
  };
  const rsi = RSI.calculate(inputRSI);
  let finalVal = rsi[rsi.length - 1];
  let finalColor = "blue";
  if (finalVal > 70) {
    finalColor = "red";
  } else if (finalVal < 30) {
    finalColor = "green";
  }

  if (!finalVal) {
    finalVal = "-";
    finalColor = "black";
  }

  const finalObj = {
    result: finalVal,
    color: finalColor,
  };
  return finalObj;
}

module.exports = RSIIndicator;
