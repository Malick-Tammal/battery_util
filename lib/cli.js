const batteryData = require("./battery_data");

console.log("Gathering Data ...");

batteryData()
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
