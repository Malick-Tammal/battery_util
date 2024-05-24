"use strict";

const batteryInfo = require("./battery_info");

console.log("Gathering Data ...");

batteryInfo()
  .then((data) => {
    console.clear();

    // Logging data
    console.log("============================================");
    console.log("============================================");
    console.log("================ BATTERY_JS ================");
    console.log("============================================");
    console.log("============================================\n");

    console.log("--------------------------------------------");
    console.log(data);
    console.log("============================================");
  })
  .catch((err) => {
    console.log(err);
  });
