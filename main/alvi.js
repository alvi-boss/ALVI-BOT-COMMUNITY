// ALVI.js - Logger
const chalk = require("chalk");

module.exports = function logger(message, type = "INFO") {
  const time = new Date().toLocaleTimeString("en-US", { hour12: false });
  let color;
  switch (type.toLowerCase()) {
    case "error": color = chalk.red.bold; break;
    case "warn": color = chalk.yellow.bold; break;
    case "success": color = chalk.green.bold; break;
    case "event": color = chalk.cyan.bold; break;
    case "alvi": color = chalk.magenta.bold; break;
    default: color = chalk.white.bold;
  }
  console.log(chalk.gray(`[${time}]`) + " " + color(`[${type.toUpperCase()}]`) + " " + message);
};
