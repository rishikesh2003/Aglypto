const sortedArrayCreator = require("../../functions/sortedArrayCreator.js");
const volDataGiver = require("./volDataGiver.js");
const formatNumber = require("../../functions/formatNumber.js");

const importData = async () => {
  const symbolArr = await sortedArrayCreator();
  for (let i = 0; i < symbolArr.length; i++) {
    const ws = new WebSocket(`wss://fstream.binance.com/ws/${symbolArr[i].toLowerCase()}@ticker`);

    let [Data30m, Data1h, Data4h, Data1d] = await volDataGiver(symbolArr[i]);
    setInterval(async () => {
      [Data30m, Data1h, Data4h, Data1d] = await volDataGiver(symbolArr[i]);
    }, 60000);
    ws.onmessage = async (msg) => {
      const data = JSON.parse(msg.data);
      document.querySelector(`.price-${i}`).innerText = data.c;

      let circle30m = "";
      if (Data30m.voltod < Data30m.volprev) {
        circle30m = "🔴";
        const dFactor = Data30m.volprev - Data30m.voltod;
        const finalResult = (dFactor / Data30m.volprev) * 100;
        const percent = "-" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent30m-${i}`).innerText = percent;
        document.querySelector(`.volPercent30m-${i}`).style.color = "red";
      } else {
        circle30m = "🟢";
        const dFactor = Data30m.voltod - Data30m.volprev;
        const finalResult = (dFactor / Data30m.voltod) * 100;
        const percent = "+" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent30m-${i}`).innerText = percent;
        document.querySelector(`.volPercent30m-${i}`).style.color = "green";
      }
      document.querySelector(`.coinVol30m-${i}`).innerText = formatNumber(Data30m.voltod);
      document.querySelector(`.volStatus30m-${i}`).innerText = circle30m;

      let circle1h = "";
      if (Data1h.voltod < Data1h.volprev) {
        circle1h = "🔴";
        const dFactor = Data1h.volprev - Data1h.voltod;
        const finalResult = (dFactor / Data1h.volprev) * 100;
        const percent = "-" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent1h-${i}`).innerText = percent;
        document.querySelector(`.volPercent1h-${i}`).style.color = "red";
      } else {
        circle1h = "🟢";
        const dFactor = Data1h.voltod - Data1h.volprev;
        const finalResult = (dFactor / Data1h.voltod) * 100;
        const percent = "+" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent1h-${i}`).innerText = percent;
        document.querySelector(`.volPercent1h-${i}`).style.color = "green";
      }
      document.querySelector(`.coinVol1h-${i}`).innerText = formatNumber(Data1h.voltod);
      document.querySelector(`.volStatus1h-${i}`).innerText = circle1h;

      let circle4h = "";
      if (Data4h.voltod < Data4h.volprev) {
        circle4h = "🔴";
        const dFactor = Data4h.volprev - Data4h.voltod;
        const finalResult = (dFactor / Data4h.volprev) * 100;
        const percent = "-" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent4h-${i}`).innerText = percent;
        document.querySelector(`.volPercent4h-${i}`).style.color = "red";
      } else {
        circle4h = "🟢";
        const dFactor = Data4h.voltod - Data4h.volprev;
        const finalResult = (dFactor / Data4h.voltod) * 100;
        const percent = "+" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent4h-${i}`).innerText = percent;
        document.querySelector(`.volPercent4h-${i}`).style.color = "green";
      }
      document.querySelector(`.coinVol4h-${i}`).innerText = formatNumber(Data4h.voltod);
      document.querySelector(`.volStatus4h-${i}`).innerText = circle4h;

      let circle1d = "";
      if (Data1d.voltod < Data1d.volprev) {
        circle1d = "🔴";
        const dFactor = Data1d.volprev - Data1d.voltod;
        const finalResult = (dFactor / Data1d.volprev) * 100;
        const percent = "-" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent1d-${i}`).innerText = percent;
        document.querySelector(`.volPercent1d-${i}`).style.color = "red";
      } else {
        circle1d = "🟢";
        const dFactor = Data1d.voltod - Data1d.volprev;
        const finalResult = (dFactor / Data1d.voltod) * 100;
        const percent = "+" + String(finalResult.toFixed(3)) + "%";
        document.querySelector(`.volPercent1d-${i}`).innerText = percent;
        document.querySelector(`.volPercent1d-${i}`).style.color = "green";
      }
      document.querySelector(`.coinVol1d-${i}`).innerText = formatNumber(Data1d.voltod);
      document.querySelector(`.volStatus1d-${i}`).innerText = circle1d;

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
