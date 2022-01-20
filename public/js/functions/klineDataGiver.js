const axios = require("axios");

const klinedataGiver = async (symbol) => {
  // for 1h timeframe

  let closePrices1h = [];
  let timestamps1h = [];
  let highPrices1h = [];
  let lowPrices1h = [];
  let voltod = 0;
  let volprev = 0;

  const klineData1h = await axios.get(
    `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=1h`
  );

  klineData1h.data.forEach((klinedata) => {
    closePrices1h.push(Number(klinedata[4]));
    highPrices1h.push(Number(klinedata[2]));
    lowPrices1h.push(Number(klinedata[3]));
  });

  klineData1h.data.forEach((klinedata) => {
    timestamps1h.push({
      openTimeStamp: klinedata[0],
      closeTimeStamp: klinedata[6],
    });
  });

  // for 30m timeframe
  let closePrices30m = [];
  let timestamps30m = [];
  let highPrices30m = [];
  let lowPrices30m = [];

  const klineData30m = await axios.get(
    `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=30m`
  );

  klineData30m.data.forEach((klinedata) => {
    closePrices30m.push(Number(klinedata[4]));
    highPrices30m.push(Number(klinedata[2]));
    lowPrices30m.push(Number(klinedata[3]));
  });

  klineData30m.data.forEach((klinedata) => {
    timestamps30m.push({
      openTimeStamp: klinedata[0],
      closeTimeStamp: klinedata[6],
    });
  });

  const volData30m = await axios.get(
    `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=30m`
  );

  voltod = volData30m.data[volData30m.data.length - 1].buyVol;
  volprev = volData30m.data[volData30m.data.length - 2].buyVol;

  return [
    {
      timestamps: timestamps30m,
      closePrices: closePrices30m,
      highPrices: highPrices30m,
      lowPrices: lowPrices30m,
      voltod: Number(voltod),
      volprev: Number(volprev),
    },
    {
      timestamps: timestamps1h,
      closePrices: closePrices1h,
      highPrices: highPrices1h,
      lowPrices: lowPrices1h,
    },
  ];
};

module.exports = klinedataGiver;
