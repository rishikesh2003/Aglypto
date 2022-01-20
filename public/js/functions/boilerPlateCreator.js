const sortedArrayCreator = require("./sortedArrayCreator.js");

const boilerPlateCreator = async () => {
  const symbolArr = await sortedArrayCreator();
  for (let i = 0; i < symbolArr.length; i++) {
    const slash = document.createElement("span");
    slash.innerText = " / ";
    slash.style.fontWeight = "bold";

    const slash1 = slash.cloneNode(true);

    const column = document.createElement("div");
    column.classList.add(`column`);

    const name = document.createElement("p");
    name.classList.add("row");
    name.classList.add("first-el");
    name.innerText = symbolArr[i];
    name.style.color = "blue";
    name.style.cursor = "pointer";
    name.addEventListener("click", () => {
      window.location.href = `/charts/${name.innerText}`;
    });

    const price = document.createElement("p");
    price.classList.add("row");
    price.classList.add("row-small");
    price.classList.add(`price-${i}`);

    const change = document.createElement("p");
    change.classList.add("row");
    change.classList.add(`change-${i}`);
    change.classList.add("row-small");

    const coinVol = document.createElement("p");
    coinVol.classList.add("row");
    coinVol.classList.add(`coinVol-${i}`);
    coinVol.classList.add("row-small");

    const volStatus = document.createElement("p");
    volStatus.classList.add("row");
    volStatus.classList.add(`volStatus-${i}`);
    volStatus.classList.add("row-small");

    const coinVolPercent = document.createElement("p");
    coinVolPercent.classList.add("row");
    coinVolPercent.classList.add(`coinVolPercent-${i}`);
    coinVolPercent.classList.add("row-small");

    const Macd30m = document.createElement("p");
    Macd30m.classList.add("indi-row");
    Macd30m.classList.add("row");
    Macd30m.classList.add(`macd30m-${i}`);

    const Macd1h = document.createElement("p");
    Macd1h.classList.add("indi-row");
    Macd1h.classList.add("row");
    Macd1h.classList.add(`macd1h-${i}`);

    const ichi30m = document.createElement("p");
    ichi30m.classList.add("row");
    ichi30m.classList.add(`ichi30m-${i}`);
    ichi30m.classList.add("indi-row");

    const ichiLine30m = document.createElement("span");
    ichiLine30m.classList.add(`ichiline30m-${i}`);

    const ichiSpan30m = document.createElement("span");
    ichiSpan30m.classList.add(`ichispan30m-${i}`);

    ichi30m.appendChild(ichiLine30m);
    ichi30m.appendChild(slash);
    ichi30m.appendChild(ichiSpan30m);

    const ichi1h = document.createElement("p");
    ichi1h.classList.add("row");
    ichi1h.classList.add(`ichi1h-${i}`);
    ichi1h.classList.add("indi-row");

    const ichiLine1h = document.createElement("span");
    ichiLine1h.classList.add(`ichiline1h-${i}`);

    const ichiSpan1h = document.createElement("span");
    ichiSpan1h.classList.add(`ichispan1h-${i}`);

    ichi1h.appendChild(ichiLine1h);
    ichi1h.appendChild(slash1);
    ichi1h.appendChild(ichiSpan1h);

    const RSI30m = document.createElement("p");
    RSI30m.classList.add("indi-row");
    RSI30m.classList.add("row");
    RSI30m.classList.add(`rsi30m-${i}`);

    const RSI1h = document.createElement("p");
    RSI1h.classList.add("indi-row");
    RSI1h.classList.add("row");
    RSI1h.classList.add(`rsi1h-${i}`);

    column.appendChild(name);
    column.appendChild(price);
    column.appendChild(change);
    column.appendChild(coinVol);
    column.appendChild(volStatus);
    column.appendChild(coinVolPercent);
    column.appendChild(Macd30m);
    column.appendChild(ichi30m);
    column.appendChild(RSI30m);
    column.appendChild(Macd1h);
    column.appendChild(ichi1h);
    column.appendChild(RSI1h);

    document.querySelector(".table").appendChild(column);
  }
};

module.exports = boilerPlateCreator;
