const sortedArrayCreator = require("./sortedArrayCreator.js");
const RSI = require("../indicators/rsi.js");
const MACD = require("../indicators/macd.js");
const KUMO = require("../indicators/ichimoku.js");
const klinedataGiver = require("./klineDataGiver.js");
const formatNumber = require("./formatNumber.js");

const importData = async () => {
  const symbolArr = await sortedArrayCreator();
  for (let i = 0; i < symbolArr.length; i++) {
    const ws = new WebSocket(`wss://fstream.binance.com/ws/${symbolArr[i].toLowerCase()}@ticker`);
    let [Data30m, Data1h] = await klinedataGiver(symbolArr[i]);
    setInterval(async () => {
      [Data30m, Data1h] = await klinedataGiver(symbolArr[i]);
    }, 60000);

    document.querySelector(`.macd1h-${i}`).style.fontWeight = "bold";
    document.querySelector(`.macd30m-${i}`).style.fontWeight = "bold";

    ws.onmessage = async (msg) => {
      let closePrices30m = Data30m.closePrices;
      let closePrices1h = Data1h.closePrices;
      let highPrices30m = Data30m.highPrices;
      let highPrices1h = Data1h.highPrices;
      let lowPrices30m = Data30m.lowPrices;
      let lowPrices1h = Data1h.lowPrices;

      const data = JSON.parse(msg.data);
      document.querySelector(`.price-${i}`).innerText = data.c;
      let circle = "";

      if (Data30m.voltod < Data30m.volprev) {
        circle = "🔴";
        const dFactor = Data30m.volprev - Data30m.voltod;
        const finalResult = (dFactor / Data30m.volprev) * 100;
        const percent = "-" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.coinVolPercent-${i}`).innerText = percent;
        document.querySelector(`.coinVolPercent-${i}`).style.color = "red";
      } else {
        circle = "🟢";
        const dFactor = Data30m.voltod - Data30m.volprev;
        const finalResult = (dFactor / Data30m.voltod) * 100;
        const percent = "+" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.coinVolPercent-${i}`).innerText = percent;
        document.querySelector(`.coinVolPercent-${i}`).style.color = "green";
      }
      document.querySelector(`.coinVol-${i}`).innerText = formatNumber(Data30m.voltod);
      document.querySelector(`.volStatus-${i}`).innerText = circle;
      closePrices1h.pop();
      closePrices1h.push(data.c);

      closePrices30m.pop();
      closePrices30m.push(data.c);

      lowPrices1h.pop();
      lowPrices1h.push(data.l);

      lowPrices30m.pop();
      lowPrices30m.push(data.l);

      highPrices1h.pop();
      highPrices1h.push(data.h);

      highPrices30m.pop();
      highPrices30m.push(data.h);

      const rsi1h = RSI(closePrices1h);
      const rsi30m = RSI(closePrices30m);

      const macd1h = MACD(closePrices1h, "1h");
      const macd30m = MACD(closePrices30m, "30m");

      const ichi1h = KUMO(highPrices1h, lowPrices1h);
      const ichi30m = KUMO(highPrices30m, lowPrices30m);

      // rsi

      document.querySelector(`.rsi1h-${i}`).innerText = rsi1h.result;
      document.querySelector(`.rsi1h-${i}`).style.color = rsi1h.color;

      document.querySelector(`.rsi30m-${i}`).innerText = rsi30m.result;
      document.querySelector(`.rsi30m-${i}`).style.color = rsi30m.color;

      // macd

      document.querySelector(`.macd1h-${i}`).innerText = macd1h.content;
      document.querySelector(`.macd1h-${i}`).style.color = macd1h.color;
      document.querySelector(`.macd1h-${i}`).title = macd1h.time;

      document.querySelector(`.macd30m-${i}`).innerText = macd30m.content;
      document.querySelector(`.macd30m-${i}`).style.color = macd30m.color;
      document.querySelector(`.macd30m-${i}`).title = macd1h.time;

      // ichimoku cloud

      document.querySelector(`.ichiline1h-${i}`).innerText = ichi1h.finalContentLines;
      document.querySelector(`.ichiline1h-${i}`).style.color = ichi1h.finalColorLines;
      document.querySelector(`.ichispan1h-${i}`).innerText = ichi1h.finalContentSpan;
      document.querySelector(`.ichispan1h-${i}`).style.color = ichi1h.finalColorSpan;

      document.querySelector(`.ichiline30m-${i}`).innerText = ichi30m.finalContentLines;
      document.querySelector(`.ichiline30m-${i}`).style.color = ichi30m.finalColorLines;
      document.querySelector(`.ichispan30m-${i}`).innerText = ichi30m.finalContentSpan;
      document.querySelector(`.ichispan30m-${i}`).style.color = ichi30m.finalColorSpan;

      if (data.P[0] === "-") {
        document.querySelector(`.change-${i}`).style.color = "red";
        document.querySelector(`.change-${i}`).innerText = data.P + "%";
      } else {
        document.querySelector(`.change-${i}`).style.color = "green";
        document.querySelector(`.change-${i}`).innerText = "+" + data.P + "%";
      }
    };
  }
};

module.exports = importData;
