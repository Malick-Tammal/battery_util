# 🔋Battery_JS

# Steal on early stages (didn't publish to npm)

### Get battery details with NodeJS

**📋 Returned data :**

- Design Capacity
- Full Charge Capacity
- Battery Health
- Cycle Count
- Battery ID
- Serial Number
- Battery Model

### 🎬 Some screenshots

![Screen_Shot1](images/Screen_Shot1.PNG)

## 1 - 📖 How it works

With the help of [Child Process](https://www.npmjs.com/package/childprocess) package
we can execute a powershell script and return data from it (Microsoft battery report) , and with using [System Information](https://www.npmjs.com/package/systeminformation) we can get more info about the battery

> Importing child process and systeminformation

```js
import { exec } from "child_process";
import { battery } from "systeminformation";
```

> Execute function

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
  "powershell -executionpolicy bypass -File ./battery_ps/get_battery_health.PS1",
  (output) => {
    console.log(output);
    // output (Example)
    // Battery life report saved path
    // Design Capacity : 60800mWh
    // Full Charge Capacity : 60800mWh
    // Battery Health : 100%
    // Cycle Count : 0
    // Battery ID : DELL 9GRYT8A
    // Serial Number : 204
    // Battery Model : 204BYDDELL 9GRYT8A
  }
);
```

## 2 - ▶️ Getting Started

> Clone the repository

```BASH
git clone https://github.com/Malick-Tammal/Battery_JS.git
```

> Install npm packages

```BASH
npm install
```

> Start the app with

```BASH
npm start
```

> ✨ Do your magic

## 3 - 💻 OS Support

Now is only working with windows but in future and with your help we will implement other operating systems

## 4 - 💽 Softwares that implementing the script

**1. [ENERGIZE](https://github.com/Malick-Tammal/ENERGIZE)**

**1. [Laptop Tester](https://github.com/Malick-Tammal/Laptop-Tester)**

# Say thank you if this is helpful 🌟🌟

The script is in early stages (beta) still has some bugs
, feel free to contribute

## Don't forget to star the repository ❤️❤️

## Contact me 📭

[![Facebook](https://cdn-icons-png.flaticon.com/32/733/733547.png)](https://www.facebook.com/profile.php?id=100092494246970)&emsp;&emsp;
[![Instagram](https://cdn-icons-png.flaticon.com/32/2111/2111463.png)](https://www.instagram.com/malick_tammal)&emsp;&emsp;
[![Codepen](https://cdn-icons-png.flaticon.com/32/2504/2504911.png)](https://codepen.io/ADAMSKIDZ)
