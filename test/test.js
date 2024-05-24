// test.js coming soon

const bu = require("../lib/index");

const getInfo = () => {
  bu.batteryInfo().then((data) => {
    console.log(data);

    setInterval(() => {
      bu.batteryState().then((data) => {
        console.log(data);
      });
    }, 1000);
  });
};
getInfo();
