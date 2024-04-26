<h1 align="center">🔋battery_util</h1>

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
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Malick-Tammal/battery_util/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
    <a href="https://github.com/Malick-Tammal/battery_util/graphs/commit-activity" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Battery util, get laptop battery information (health , capacity , serial number .....)

## 🌟 Features

- Get battery health (Accurate reads)
- Get battery information (serialNumber , batteryId ..)
- Lightweight and reliable

## 🚀 Features will added

- Cross platform support
- Getting laptop model
- Getting Battery Model
- Battery realtime level
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

get battery information

```js
const bu = require("battery_util");

bu.battery()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
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

get specific data

```js
const bu = require("battery_util");

bu.battery()
  .then((data) => {
    console.log(data.fullChargeCapacity); //(Example) 60800
  })
  .catch((err) => {
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

## 📖 How it works

With the help of [Child Process](https://www.npmjs.com/package/childprocess) package we can execute a powershell script and return data from it (Microsoft battery report)

> Importing child process

```js
const exec = require("child_process").exec;
```

> Function to execute a cmd commends (scripts)

```js
const execute = (command, callback) => {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
};
```

> Exec command line with JS (Exec PS script)

```js
execute(
  "powershell -executionpolicy bypass -File ./ps_script/battery.PS1",
  (output) => {
    console.log(output);
    // output (Example)
    // fileSavedPath (batteryreport.xml path)
    // measureUnit : "mWh"
    // designCapacity : 60800
    // fullChargeCapacity : 60800
    // cycleCount : 0
    // id : DELL 9GRYT8A
    // serialNumber : 204
  }
);
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

- Website: http://malicktammal.netlify.app/
- Github: [@Malick-Tammal](https://github.com/Malick-Tammal)
- Instagram [@Malick_Tammal](https://www.instagram.com/malick_tammal/)
- Youtube [Malick_Tammal](https://www.youtube.com/channel/UCmLTg0TBizTda3dpSObkA2w)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Malick-Tammal/battery_util/issues).

## 🔥 Show your support

Give a ⭐️ if this project helped you!

## 📜 License

Copyright © 2024 [Malick Tammal](https://github.com/Malick-Tammal). All rights reserved.

Licensed under the [MIT license](https://github.com/Malick-Tammal/battery_util/blob/master/LICENSE).
