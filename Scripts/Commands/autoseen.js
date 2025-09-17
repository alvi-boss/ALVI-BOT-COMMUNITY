const fs = require("fs-extra");
const pathFile = __dirname + "/cache/autoseen.txt";

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, "false"); // Default OFF
}

module.exports.config = {
  name: "autoseen",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "ALVI",
  description: "Automatically marks all messages as seen",
  commandCategory: "tools",
  usages: "autoseen on/off",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api }) => {
  try {
    const status = fs.readFileSync(pathFile, "utf-8");
    if (status === "true") {
      api.markAsReadAll(() => {});
    }
  } catch (err) {
    console.error("❌ AutoSeen error:", err);
  }
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const { threadID, messageID } = event;

    if (!args[0]) {
      return api.sendMessage(
        `⚙️ Wrong format!\nUse: ${global.config.PREFIX}autoseen on/off`,
        threadID,
        messageID
      );
    }

    if (args[0].toLowerCase() === "on") {
      fs.writeFileSync(pathFile, "true");
      return api.sendMessage(
        `${this.config.name} turned ON 🟢`,
        threadID,
        messageID
      );
    }

    if (args[0].toLowerCase() === "off") {
      fs.writeFileSync(pathFile, "false");
      return api.sendMessage(
        `${this.config.name} turned OFF 🔴`,
        threadID,
        messageID
      );
    }

    return api.sendMessage(
      `⚙️ Wrong format!\nUse: ${global.config.PREFIX}autoseen on/off`,
      threadID,
      messageID
    );
  } catch (err) {
    console.error("❌ Error in autoseen run():", err);
    return api.sendMessage("❌ Something went wrong!", event.threadID, event.messageID);
  }
};
