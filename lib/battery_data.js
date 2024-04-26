const util = require("./util");
const exec = require("child_process").exec;

// Function to run a process to execute a commend
const execute = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    callback(stdout, error);
  });
};
// Getting current directory path + assigning powershell commend
const path = '"' + __dirname + '"';
const psCommend = `powershell -executionpolicy bypass -File ${path}\\ps_script\\battery.PS1`;

// Function to calculate battery health
const calcBatteryHealth = (fChargeC, designC) => {
  let batteryHealth = Math.round((fChargeC / designC) * 100);
  return batteryHealth;
};

// Function to arrange data
const arrangeData = (data) => {
  const dataSplitted = data.split("\r\n");

  const fileSavedPath = dataSplitted[0];
  const measureUnit = "mWh";
  const designCapacity = util.getValue(dataSplitted, "designCapacity", ":");
  const fullChargeCapacity = util.getValue(
    dataSplitted,
    "fullChargeCapacity",
    ":"
  );
  const health = calcBatteryHealth(fullChargeCapacity, designCapacity);
  const cycleCount = util.getValue(dataSplitted, "cycleCount", ":");
  const id = util.getValue(dataSplitted, "id", ":");
  const serialNumber = util.getValue(dataSplitted, "serialNumber", ":");

  const allData = {
    fileSavedPath: fileSavedPath,
    measureUnit: measureUnit,
    designCapacity: Number(designCapacity),
    fullChargeCapacity: Number(fullChargeCapacity),
    health: health,
    cycleCount: Number(cycleCount),
    id: id,
    serialNumber: serialNumber,
  };

  return allData;
};

// Running a process and executing a powershell script (battery.PS1) ===\\
const batteryData = () => {
  return new Promise((resolve, reject) => {
    execute(psCommend, (output, err) => {
      if (
        output.includes("DesignCapacity") &&
        output.split("\r\n").length !== 11
      ) {
        resolve(arrangeData(output));
      } else {
        reject(`Error occurred while executing Powershell script.\n ${err}`);
      }
    });
  });
};

// exporting batteryData(function)
module.exports = batteryData;
