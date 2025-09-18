// index.js
// ─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 ─꯭─⃝‌‌
// Main entry point

const fs = require("fs");
const login = require("fca-unofficial"); // facebook chat api
global.config = require("./config.json"); // load config file

// Logger function
function logger(msg, type = "INFO") {
  console.log(`[${type.toUpperCase()}] ${msg}`);
}

// Load events folder
const eventFiles = fs.readdirSync(__dirname + "/events").filter(file => file.endsWith(".js"));

// Store events globally
global.client = {};
global.client.events = new Map();

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (typeof event === "function") {
    global.client.events.set(file, event);
    logger(`Loaded event: ${file}`, "EVENT");
  }
}

// Login with facebook (appstate.json should be present)
login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
  if (err) return logger("Login error: " + err, "ERROR");

  global.api = api;
  global.data = {
    allThreadID: []
  };

  logger(`${global.config.BOTNAME} is now running...`, "ALVI");

  // Listen for messages
  api.listenMqtt(async (err, event) => {
    if (err) return logger("Listen error: " + err, "ERROR");

    // Call all loaded events
    for (let [file, eventFunc] of global.client.events) {
      try {
        await eventFunc({ api, event });
      } catch (e) {
        logger(`Error in ${file}: ${e}`, "EVENT");
      }
    }
  });
});
