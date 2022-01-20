const sortedArrayCreator = require("../../functions/sortedArrayCreator");

const boilerPlateCreator = async () => {
  const symbolArr = await sortedArrayCreator();
  for (let i = 0; i < symbolArr.length; i++) {
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

    const coinVol30m = document.createElement("p");
    coinVol30m.classList.add("row");
    coinVol30m.classList.add(`coinVol30m-${i}`);
    coinVol30m.classList.add("row-small");

    const volStatus30m = document.createElement("p");
    volStatus30m.classList.add("row");
    volStatus30m.classList.add(`volStatus30m-${i}`);
    volStatus30m.classList.add("row-small");

    const volPercent30m = document.createElement("p");
    volPercent30m.classList.add("row");
    volPercent30m.classList.add(`volPercent30m-${i}`);
    volPercent30m.classList.add("row-small");

    const coinVol1h = document.createElement("p");
    coinVol1h.classList.add("row");
    coinVol1h.classList.add(`coinVol1h-${i}`);
    coinVol1h.classList.add("row-small");

    const volStatus1h = document.createElement("p");
    volStatus1h.classList.add("row");
    volStatus1h.classList.add(`volStatus1h-${i}`);
    volStatus1h.classList.add("row-small");

    const volPercent1h = document.createElement("p");
    volPercent1h.classList.add("row");
    volPercent1h.classList.add(`volPercent1h-${i}`);
    volPercent1h.classList.add("row-small");

    const coinVol4h = document.createElement("p");
    coinVol4h.classList.add("row");
    coinVol4h.classList.add(`coinVol4h-${i}`);
    coinVol4h.classList.add("row-small");

    const volStatus4h = document.createElement("p");
    volStatus4h.classList.add("row");
    volStatus4h.classList.add(`volStatus4h-${i}`);
    volStatus4h.classList.add("row-small");

    const volPercent4h = document.createElement("p");
    volPercent4h.classList.add("row");
    volPercent4h.classList.add(`volPercent4h-${i}`);
    volPercent4h.classList.add("row-small");

    const coinVol1d = document.createElement("p");
    coinVol1d.classList.add("row");
    coinVol1d.classList.add(`coinVol1d-${i}`);
    coinVol1d.classList.add("row-small");

    const volStatus1d = document.createElement("p");
    volStatus1d.classList.add("row");
    volStatus1d.classList.add(`volStatus1d-${i}`);
    volStatus1d.classList.add("row-small");

    const volPercent1d = document.createElement("p");
    volPercent1d.classList.add("row");
    volPercent1d.classList.add(`volPercent1d-${i}`);
    volPercent1d.classList.add("row-small");

    column.appendChild(name);
    column.appendChild(price);
    column.appendChild(change);
    column.appendChild(coinVol1d);
    column.appendChild(volStatus1d);
    column.appendChild(volPercent1d);
    column.appendChild(coinVol4h);
    column.appendChild(volStatus4h);
    column.appendChild(volPercent4h);
    column.appendChild(coinVol1h);
    column.appendChild(volStatus1h);
    column.appendChild(volPercent1h);
    column.appendChild(coinVol30m);
    column.appendChild(volStatus30m);
    column.appendChild(volPercent30m);

    document.querySelector(".table").appendChild(column);
  }
};

module.exports = boilerPlateCreator;
