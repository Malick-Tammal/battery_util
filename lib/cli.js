"use strict";

const bu = require("../lib/index");

console.clear();
console.log("Gathering Data ...");

const getInfo = () => {
  bu.batteryInfo().then((data) => {
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

    setInterval(() => {
      bu.batteryState().then((data) => {
        console.log(data);
      });
    }, 1000);
  });
};

getInfo();
