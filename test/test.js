// test.js coming soon

const bu = require("../lib/index");

bu.batteryInfo().then((data) => {
  console.log(data);
});
