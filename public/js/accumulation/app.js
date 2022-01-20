const importData = require("./functions/importData");
const boilerPlateCreator = require("./functions/boilerplateCreator");

const main = async () => {
  await boilerPlateCreator();
  await importData();
};

main();

// other scripts

document.querySelector("footer").innerText = `Copyright © ${new Date().getFullYear()} Memory : ${
  performance.memory.usedJSHeapSize / Math.pow(1000, 2)
} MB`;
