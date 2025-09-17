module.exports.config = {
  name: "autoreact",
  version: "1.2.0",
  hasPermission: 0,
  credits: "ALVI",
  description: "Bot auto reacts to messages",
  commandCategory: "No Prefix",
  cooldowns: 0,
};

module.exports.handleEvent = async ({ api, event }) => {
  try {
    const threadData = global.data.threadData.get(event.threadID) || {};
    if (threadData.autoreact === false) return; // Auto-react off

    const emojis = [
      "🥰", "😗", "🍂", "💜", "☺️", "🖤", "🤗", "😇", "🌺", "🥹", "😻",
      "😘", "🫣", "😽", "😺", "👀", "❤️", "🧡", "💛", "💚", "💙", "💜",
      "🤎", "🤍", "💫", "💦", "🫶", "🫦", "👄", "🗣️", "💏", "👨‍👩‍👦‍👦",
      "👨‍👨‍👦", "😵", "🥵", "🥶", "🤨", "🤐", "🫡", "🤔"
    ];

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    api.setMessageReaction(randomEmoji, event.messageID, (err) => {
      if (err) console.error("❌ Error sending reaction:", err);
    }, true);

  } catch (e) {
    console.error("❌ AutoReact error:", e);
  }
};

module.exports.run = async ({ api, event, Threads }) => {
  const { threadID, messageID } = event;
  try {
    const threadData = await Threads.getData(threadID);

    if (typeof threadData.data.autoreact === "undefined") {
      threadData.data.autoreact = true; // Default ON
    } else {
      threadData.data.autoreact = !threadData.data.autoreact; // Toggle
    }

    await Threads.setData(threadID, { data: threadData.data });
    global.data.threadData.set(threadID, threadData.data);

    api.sendMessage(
      `✅ Auto-react is now ${threadData.data.autoreact ? "ON 🟢" : "OFF 🔴"}`,
      threadID,
      messageID
    );
  } catch (e) {
    api.sendMessage("❌ Failed to toggle auto-react!", threadID, messageID);
    console.error("❌ Error in run():", e);
  }
};
