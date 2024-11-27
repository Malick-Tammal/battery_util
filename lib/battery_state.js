"use strict";

const execa = require("execa");

const isCharging = () =>
  execa
    .stdout("WMIC", ["Path", "Win32_Battery", "Get", "BatteryStatus"])
    .then((stdout) => {
      if (!stdout) {
        return Promise.reject(new Error("No battery could be found"));
      }
      return stdout.includes("2");
    });

const level = () =>
  execa
    .stdout("WMIC", [
      "Path",
      "Win32_Battery",
      "Get",
      "EstimatedChargeRemaining",
    ])
    .then((stdout) => {
      if (!stdout) {
        return Promise.reject(new Error("No battery could be found"));
      }

      stdout = parseFloat(stdout.trim().split("\n")[1]);
      return stdout;
    });

const batteryState = async () => {
  const obj = {
    isCharging,
    level,
  };
  await isCharging().then((data) => {
    obj.isCharging = data;
  });

  await level().then((data) => {
    obj.level = data;
  });

  return obj;
};

module.exports = batteryState;
