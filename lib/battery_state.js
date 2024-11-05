"use strict";

const exec = require("child_process").exec;
const util = require("./util");

const commend =
  "Get-CimInstance Win32_Battery | select BatteryStatus , EstimatedChargeRemaining | fl";

// battery number / @(Get-CimInstance -ClassName Win32_Battery).Count

const execute = (command, callback) => {
  exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
    callback(stdout, stderr);
  });
};

// Converting number to boolean
// +
// Checking last state to return same velue

// Last state count (lsc)
let lsc;

const convertNumToBool = (num) => {
  if (num === 1) {
    lsc = num;
    return false;
  } else if (num === 2) {
    lsc = num;
    return true;
  } else if (num === 0) {
    if (lsc === 1) {
      return false;
    } else {
      return true;
    }
  } else {
    return "We can't determine";
  }
};

const batteryState = () => {
  return new Promise((resolve, reject) => {
    execute(commend, (stdout, stderr) => {
      const dataSplitted = stdout.split("\r\n");

      const level = Number(
        util.getValue(dataSplitted, "EstimatedChargeRemaining", ":")
      );

      const isCharging = convertNumToBool(
        Number(util.getValue(dataSplitted, "BatteryStatus", ":"))
      );

      if (isCharging !== "We can't determine") {
        resolve({
          level: level,
          isCharging: isCharging,
        });
      } else {
        reject(`Error : ${stderr}`);
      }
    });
  });
};

module.exports = batteryState;
