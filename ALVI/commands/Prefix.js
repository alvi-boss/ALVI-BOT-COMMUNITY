module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "ALVI",
  description: "Display the bot's prefix and owner info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`🌟━━━━━━━━━━━━━━━━━🌟
　　　『 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 』
🌟━━━━━━━━━━━━━━━━━🌟
『 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗼𝘁 𝗽𝗿𝗲𝗳𝗶𝘅 : [ ${prefix} ]
➤ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲   : ─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐓
➤ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻 : 𝐀𝐋𝐕𝐈 𝐈𝐒𝐋𝐀𝐌

『 𝐁𝐎𝐗 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗼𝘅 𝗣𝗿𝗲𝗳𝗶𝘅 : ${prefix}
➤ 𝗕𝗼𝘅 𝗡𝗮𝗺𝗲   : ${groupName}
➤ 𝗕𝗼𝘅 𝗧𝗜𝗗     : ${threadID}

『 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 』

➤ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 : 𝐀𝐋𝐕𝐈 𝐈𝐒𝐋𝐀𝐌
➤ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸    : www.facebook.com/100082607436864
➤ 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿  : m.me/ALVI.BROOH
➤ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽    : https://wa.me/+966505748978

🌟━━━━━━━━━━━━━━━━━🌟
 𝙏𝙃𝘼𝙉𝙆 𝙔𝙊𝙐 𝙁𝙊𝙍 𝙐𝙎𝙄𝙉𝙂!
🌟━━━━━━━━━━━━━━━━━🌟`,
      threadID,
      null
    );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or similar to get the bot info.", event.threadID);
};
