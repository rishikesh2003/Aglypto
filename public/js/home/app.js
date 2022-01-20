const boilerPlateCreator = require("../functions/boilerPlateCreator.js");
const importData = require("../functions/importData");

const main = async () => {
  await boilerPlateCreator();
  await importData();
};

main();

// other scripts

document.querySelector("footer").innerText = `Copyright © ${new Date().getFullYear()} Memory : ${
  performance.memory.usedJSHeapSize / Math.pow(1000, 2)
} MB`;
