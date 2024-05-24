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

const convertNumToBool = (num) => {
  if (num === 1) {
    return false;
  } else if (num === 2) {
    return true;
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
