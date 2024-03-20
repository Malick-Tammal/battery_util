import { battery } from "systeminformation";
import { exec } from "child_process";

// Defining execute function to exec ps script
const execute = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};

// Get battery details from ps script
const getBatteryData = () => {
  console.log("Collecting data...");

  // Execute ps script
  execute(
    "powershell -executionpolicy bypass -File ./battery_ps/get_battery_health.PS1",
    (output) => {
      arrangeData(output);
    }
  );

  // Arranging data (battery info) and logging it
  const arrangeData = (data) => {
    console.clear();
    const dataSplited = data.split("\n");

    // Arranging data
    const fileSavedPath = dataSplited[0];
    const designCapacity = dataSplited[3]
      .split(" ")
      .filter((item) => item != "");
    const fullChargeCapacity = dataSplited[4]
      .split(" ")
      .filter((item) => item != "");
    const batteryHealth = calcBatteryHealth(
      fullChargeCapacity[2].split("mWh")[0],
      designCapacity[2].split("mWh")[0]
    );
    const cycleCount = dataSplited[5].split(" ").filter((item) => item != "");
    const batteryID = dataSplited[6].split(" ").filter((item) => item != "");
    const serialNumber = dataSplited[7].split(" ").filter((item) => item != "");

    // Logging data
    console.log(fileSavedPath);
    console.log("");
    console.log(`Design Capacity : ${designCapacity[2]}`);
    console.log(`Full Charge Capacity : ${fullChargeCapacity[2]}`);
    console.log(`Battery Health : ${batteryHealth}%`);
    console.log(`Cycle Count : ${cycleCount[2]}`);
    console.log(`Battery ID : ${batteryID[2]} ${batteryID[3]}`);
    console.log(`Serial Number : ${serialNumber[2]}`);
    battery().then((data) => {
      console.log(`Battery Model : ${data.model}`);
    });
  };

  // Function to calculate battery health
  const calcBatteryHealth = (fChargeC, designC) => {
    let batteryHealth = Math.round((fChargeC / designC) * 100);
    return batteryHealth;
  };
};

// Calling main function
getBatteryData();
