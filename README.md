<h1 align="center">🔋battery_util</h1>

<p align="center">
  <a href="https://github.com/Malick-Tammal/battery_util/blob/main/CHANGELOG.md" target="_blank">Changelog<a>
  -
  <a href="https://github.com/Malick-Tammal/battery_util/issues/new">Request feature<a>
  -
  <a href="https://github.com/Malick-Tammal/battery_util/issues/new">Report bug<a>
</p>

---

<p align="center">
  <a href="https://github.com/Malick-Tammal/battery_util/graphs/contributors" target="_blank">
    <img alt="Contributors" src="https://img.shields.io/github/contributors/Malick-Tammal/battery_util.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/Malick-Tammal/battery_util/stargazers" target="_blank">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Malick-Tammal/battery_util.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/Malick-Tammal/battery_util/issues" target="_blank">
    <img alt="Issues" src="https://img.shields.io/github/issues/Malick-Tammal/battery_util.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/Malick-Tammal/battery_util/blob/main/LICENSE" target="_blank">
    <img alt="License" src="https://img.shields.io/github/license/Malick-Tammal/battery_util.svg?style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Malick-Tammal/battery_util/releases" target="_blank">
    <img alt="GIT Version" src="https://img.shields.io/github/v/release/Malick-Tammal/battery_util" />
  </a>
  <a href="https://www.npmjs.com/package/battery_util" target="_blank">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/battery_util" />
  </a>
    <a href="https://github.com/Malick-Tammal" target="_blank">
    <img alt="NPM Version" src="https://img.shields.io/badge/caretaker-malick--tammal-blue.svg?style=flat-square" />
  </a>
  <a href="https://github.com/Malick-Tammal/battery_util/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Malick-Tammal/battery_util/graphs/commit-activity" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Battery util, get laptop battery information (health , capacity , serial number ...etc)

## 🌟 Features

- Get battery health (Accurate reads)
- Get battery information (Serial number , Battery id , Capacity ..)
- Battery realtime level
- Lightweight and reliable

## 🚀 Features will added

- Cross platform support
- Getting laptop model
- Getting Battery Model
- Battery realtime level (added)
- Estimated time for full charge
- Estimated time to fully discharge

## Install

```sh
npm i battery_util --save
```

or

```sh
npm i battery_util
```

## Usage

import the package

```js
const bu = require("battery_util");
```

### Get battery information

```js
const bu = require("battery_util");

bu.batteryInfo()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

// output (Example)
// fileSavedPath (battery report)
// measureUnit : "mWh"
// designCapacity : 60800
// fullChargeCapacity : 60800
// health : 100%
// cycleCount : 0
// id : DELL 9GRYT8A
// serialNumber : 204
```

### Get specific data

```js
const bu = require("battery_util");

bu.batteryInfo()
  .then(data => {
    console.log(data.fullChargeCapacity); //(Example) 60800
  })
  .catch(err => {
    console.log(err);
});
```

### data options :

- fileSavedPath
- measureUnit
- designCapacity
- fullChargeCapacity
- health
- cycleCount
- id
- serialNumber
- more in the future ....

### Get battery state

```js
const bu = require("battery_util");

bu.batteryState()
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
});
// output (Example)
// level : 78
// isCharging : true
```

### Get battery state avery second

```js
const bu = require("battery_util");

setInterval(() => {
bu.batteryState()
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
});
}, 1000);
// output (Example)
// { level: 78, isCharging: true }
// { level: 78, isCharging: true }
// { level: 79, isCharging: true }
// { level: 79, isCharging: false }

```

### Get specific data

```js
const bu = require("battery_util");

bu.batteryState()
  .then(data => {
    console.log(data.level); // (Example) 78
  }).catch(err => {
    console.log(err);
});
```

### data options :

- level
- isCharging


## 📖 How it works

With the help of [Child Process](https://www.npmjs.com/package/childprocess) package we can execute a powershell commend and return data from it (Microsoft battery report)

> Importing child process

```js
const exec = require("child_process").exec;
```

> Function to execute a cmd commends (scripts)

```js
const execute = (command, callback) => {
  exec(command, { shell: "powershell.exe" }, (error, stdout, stderr) => {
    callback(stdout, stderr);
  });
};
```

> Pscommend (powershell commend)

```js
const psCommend = `powercfg /batteryreport /XML /OUTPUT "./batteryreport.xml"; Start-Sleep 1; [xml]$b = Get-Content "./batteryreport.xml"; $b.BatteryReport.Batteries | ForEach-Object { ; [PSCustomObject]@{DesignCapacity = $_.Battery.DesignCapacity; FullChargeCapacity = $_.Battery.FullChargeCapacity; CycleCount = $_.Battery.CycleCount; Id = $_.Battery.id; SerialNumber = $_.Battery.SerialNumber } }`;
```

> Exec powershell command with JS

```js
execute(psCommend, (stdout, stderr) => {
  if (
    util.getValue(stdout.split("\r\n"), "designCapacity", ":") !== "" &&
    util.getValue(stdout.split("\r\n"), "fullChargeCapacity", ":") !== ""
  ) {
    console.log(stdout);
    // output (Example)
    // fileSavedPath (batteryreport.xml path)
    // measureUnit : "mWh"
    // designCapacity : 60800
    // fullChargeCapacity : 60800
    // cycleCount : 0
    // id : DELL 9GRYT8A
    // serialNumber : 204
  } else {
    console.log(
      `Error occurred while executing Powershell script.\n ${stderr}`
    );
  }
});
```

> Calculating battery health

```js
const calcBatteryHealth = (fChargeC, designC) => {
  let batteryHealth = Math.round((fChargeC / designC) * 100);
  return batteryHealth;
};
```

usage :

```js
const health = `${calcBatteryHealth(fullChargeCapacity, designCapacity)}%`;
// (Example) 100%
```

## 2 - ▶️ Getting Started

> Clone the repository

```sh
git clone https://github.com/Malick-Tammal/battery_util.git
```

```sh
cd battery_util
```

package folder for (npm package) / test folder for (testing)

> Start CLI interface

```sh
npm run cli
```

> Start testing

```sh
npm test
```

## ❗ Issues

- Only working in windows systems
- if you find issue please open new [issue](https://github.com/Malick-Tammal/battery_util/issues/new)

## 🖋️ Author

🧑🏽 **Malick Tammal**

- Website: [Portfolio](http://malicktammal.netlify.app/)
- Github: [@Malick-Tammal](https://github.com/Malick-Tammal)
- Instagram [@Malick_Tammal](https://www.instagram.com/malick_tammal/)
- Youtube [@Malick_Tammal](https://www.youtube.com/channel/UCmLTg0TBizTda3dpSObkA2w)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Malick-Tammal/battery_util/issues).

## 🔥 Show your support

Give a ⭐️ if this project helped you!

## 📜 License

Copyright © 2024 [Malick Tammal](https://github.com/Malick-Tammal). All rights reserved.

Licensed under the [MIT license](https://github.com/Malick-Tammal/battery_util/blob/master/LICENSE).
