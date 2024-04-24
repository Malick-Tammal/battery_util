const util = require("../lib/util");
const exec = require("child_process").exec;

// Function to run a process to execute a commend
const execute = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    callback(stdout, error);
  });
};

const psCommend =
  "powershell -executionpolicy bypass -File ./test/ps_script/battery.PS1";

// Get battery details from ps script
const getBatteryData = () => {
  console.log("Gathering Data ...");

  // Execute ps script
  execute(psCommend, (output, error) => {
    if (output.includes("DesignCapacity")) {
      arrangeData(output);
    } else {
      console.log(
        `Error occurred while executing Powershell script.\n ${error}`
      );
    }
  });

  // Arranging data (battery info) and logging it
  const arrangeData = (data) => {
    console.clear();

    const dataSplitted = data.split("\r\n");

    const fileSavedPath = dataSplitted[0];
    const measureUnit = "mWh";
    const designCapacity = util.getValue(dataSplitted, "designCapacity", ":");
    const fullChargeCapacity = util.getValue(
      dataSplitted,
      "fullChargeCapacity",
      ":"
    );
    const cycleCount = util.getValue(dataSplitted, "cycleCount", ":");
    const batteryId = util.getValue(dataSplitted, "id", ":");
    const serialNumber = util.getValue(dataSplitted, "serialNumber", ":");

    const allData = {
      fileSavedPath: fileSavedPath,
      measureUnit: measureUnit,
      designCapacity: designCapacity,
      fullChargeCapacity: fullChargeCapacity,
      cycleCount: cycleCount,
      batteryId: batteryId,
      serialNumber: serialNumber,
    };

    // Logging data
    console.log("============================================");
    console.log("============================================");
    console.log("================ BATTERY_JS ================");
    console.log("============================================");
    console.log("============================================\n");

    console.log("--------------------------------------------");
    console.log(allData);
    console.log("============================================");
  };

  // Function to calculate battery health
  const calcBatteryHealth = (fChargeC, designC) => {
    let batteryHealth = Math.round((fChargeC / designC) * 100);
    return batteryHealth;
  };
};

getBatteryData();
