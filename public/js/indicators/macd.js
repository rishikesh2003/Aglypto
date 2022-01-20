const MACD = require("technicalindicators").MACD;

function MACDIndicator(closePrices, interval) {
  const macdInput = {
    values: closePrices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  };
  const result = MACD.calculate(macdInput);

  const signalsArr = [];

  result.forEach((finalVal) => {
    if (!finalVal) {
      finalContent = "NIL";
    } else {
      if (finalVal.MACD < finalVal.signal) {
        signalsArr.push("SELL");
      } else if (finalVal.MACD > finalVal.signal) {
        signalsArr.push("BUY");
      }
    }
  });

  const orderedSignals = signalsArr.reverse();
  let time = "";
  const signals = {
    signal: "",
    index: 0,
  };

  orderedSignals.forEach((signal, i) => {
    if (i !== orderedSignals.length - 1) {
      if (signals.signal === "") {
        if (orderedSignals[i] !== orderedSignals[i + 1]) {
          signals.signal = orderedSignals[i + 1];
          signals.index = i;
        }
      }
    }
  });

  const finalVal = result[result.length - 1];
  let finalContent = "";
  let finalColor = "";

  if (!finalVal) {
    finalContent = "NIL";
    finalColor = "black";
  } else {
    if (finalVal.MACD < finalVal.signal) {
      finalContent = "SELL";
      finalColor = "red";
    } else if (finalVal.MACD > finalVal.signal) {
      finalContent = "BUY";
      finalColor = "green";
    }
  }

  const finalObj = {
    content: finalContent,
    color: finalColor,
  };

  return finalObj;
}

module.exports = MACDIndicator;
