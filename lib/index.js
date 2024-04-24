const util = require("./util");
const exec = require("child_process").exec;

// Function to run a process to execute a commend
const execute = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    callback(stdout, error);
  });
};

const path = '"' + __dirname + '"';
const psCommend = `powershell -executionpolicy bypass -File ${path}\\ps_script\\battery.PS1`;

// Running a process and executing a powershell script (Battery info) ===\\
const battery = new Promise((resolve, reject) => {
  execute(psCommend, (output, error) => {
    if (output.includes("DesignCapacity")) {
      const dataSplitted = output.split("\r\n");

      const fileSavedPath = dataSplitted[0];
      const measureUnit = "mWh";
      const designCapacity = util.getValue(dataSplitted, "designCapacity", ":");
      const fullChargeCapacity = util.getValue(
        dataSplitted,
        "fullChargeCapacity",
        ":"
      );
      const health = `${calcBatteryHealth(
        fullChargeCapacity,
        designCapacity
      )}%`;
      const cycleCount = util.getValue(dataSplitted, "cycleCount", ":");
      const batteryId = util.getValue(dataSplitted, "id", ":");
      const serialNumber = util.getValue(dataSplitted, "serialNumber", ":");

      const allData = {
        fileSavedPath: fileSavedPath,
        measureUnit: measureUnit,
        designCapacity: designCapacity,
        fullChargeCapacity: fullChargeCapacity,
        health: health,
        cycleCount: cycleCount,
        batteryId: batteryId,
        serialNumber: serialNumber,
      };

      resolve(allData);
    } else {
      reject(`Error occurred while executing Powershell script.\n ${error}`);
    }
  });
});

module.exports = battery;
