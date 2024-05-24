"use strict";

const util = require("./util");
const exec = require("child_process").exec;

// Powershell commend
const psCommend = `powercfg /batteryreport /XML /OUTPUT "./batteryreport.xml"; Start-Sleep 1; [xml]$b = Get-Content "./batteryreport.xml"; $b.BatteryReport.Batteries | ForEach-Object { ; [PSCustomObject]@{DesignCapacity = $_.Battery.DesignCapacity; FullChargeCapacity = $_.Battery.FullChargeCapacity; CycleCount = $_.Battery.CycleCount; Id = $_.Battery.id; SerialNumber = $_.Battery.SerialNumber } }`;

// Running a process to execute a powershell commend
const execute = (command, callback) => {
  exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
    callback(stdout, stderr);
  });
};

// Calculating battery health
const calcBatteryHealth = (fChargeC, designC) => {
  let batteryHealth = Math.round((fChargeC / designC) * 100);
  return batteryHealth;
};

// Arranging data
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

// Executing a powershell script and returning battery data ===\\
const batteryInfo = () => {
  return new Promise((resolve, reject) => {
    execute(psCommend, (stdout, stderr) => {
      if (
        util.getValue(stdout.split("\r\n"), "designCapacity", ":") !== "" &&
        util.getValue(stdout.split("\r\n"), "fullChargeCapacity", ":") !== ""
      ) {
        resolve(arrangeData(stdout));
      } else {
        reject(`Error occurred while executing Powershell script.\n ${stderr}`);
      }
    });
  });
};

// Exporting batteryData(function)
module.exports = batteryInfo;
