const axios = require("axios");

const volDataGiver = async (symbol) => {
  let voltod30m = 0;
  let volprev30m = 0;
  let voltod1h = 0;
  let volprev1h = 0;
  let voltod4h = 0;
  let volprev4h = 0;
  let voltod1d = 0;
  let volprev1d = 0;

  const volData30m = await axios.get(
    `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=30m`
  );

  voltod30m = volData30m.data[volData30m.data.length - 1].buyVol;
  volprev30m = volData30m.data[volData30m.data.length - 2].buyVol;

  const volData1h = await axios.get(
    `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=1h`
  );

  voltod1h = volData1h.data[volData1h.data.length - 1].buyVol;
  volprev1h = volData1h.data[volData1h.data.length - 2].buyVol;

  const volData4h = await axios.get(
    `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=4h`
  );

  voltod4h = volData4h.data[volData4h.data.length - 1].buyVol;
  volprev4h = volData4h.data[volData4h.data.length - 2].buyVol;

  const volData1d = await axios.get(
    `https://fapi.binance.com/futures/data/takerlongshortRatio?symbol=${symbol}&period=1d`
  );

  voltod1d = volData1d.data[volData1d.data.length - 1].buyVol;
  volprev1d = volData1d.data[volData1d.data.length - 2].buyVol;

  return [
    {
      voltod: Number(voltod30m),
      volprev: Number(volprev30m),
    },
    {
      voltod: Number(voltod1h),
      volprev: Number(volprev1h),
    },
    {
      voltod: Number(voltod4h),
      volprev: Number(volprev4h),
    },
    {
      voltod: Number(voltod1d),
      volprev: Number(volprev1d),
    },
  ];
};

module.exports = volDataGiver;
