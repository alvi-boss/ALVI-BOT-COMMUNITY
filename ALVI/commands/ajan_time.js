const axios = require("axios");

module.exports.config = {
  name: "ajan",
  version: "2.1",
  hasPermssion: 0,
  credits: "ALVI (Fixed by GPT)",
  description: "সেট করা সময় অনুযায়ী স্বয়ংক্রিয়ভাবে বার্তাগুলি পাঠানো হবে!",
  commandCategory: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const prayerTimes = {
    "04:32 AM": {
      message: ". ╭•┄┅══❁🌺❁══┅┄•╮\n•—»✨ফজরের আজান✨«—•\n ╰•┄┅══❁🌺❁══┅┄•╯\n\n⋆✦⋆ আসসালামু আলাইকুম 🖤💫\nপ্রিয় মুসলিম ভাই ও বোন এখন ফজরের আজান দেওয়া হয়েছে। সবাই নামাজের প্রস্তুতি নিন ✨🧡\n—𝐀𝐋𝐕𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌸",
      url: "https://drive.google.com/uc?id=1mB8EpEEbVKZo6iI7GJwuMpb1MMj72kby"
    },
    "11:56 AM": {
      message: ". ╭•┄┅══❁🌺❁══┅┄•╮\n•—»✨জোহরের আজান✨«—•\n ╰•┄┅══❁🌺❁══┅┄•╯\n\n⋆✦⋆ আসসালামু আলাইকুম 🖤💫\nপ্রিয় মুসলিম ভাই ও বোন এখন জোহরের আজান দেওয়া হয়েছে। সবাই নামাজের প্রস্তুতি নিন ✨🧡\n—𝐀𝐋𝐕𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌸",
      url: "https://drive.google.com/uc?id=1mNVwfsTEM-VjliXoM464EQR1gTYYG2ay"
    },
    "04:17 PM": {
      message: ". ╭•┄┅══❁🌺❁══┅┄•╮\n•—»✨আসরের আজান✨«—•\n ╰•┄┅══❁🌺❁══┅┄•╯\n\n⋆✦⋆ আসসালামু আলাইকুম 🖤💫\nপ্রিয় মুসলিম ভাই ও বোন এখন আসরের আজান দেওয়া হয়েছে। সবাই নামাজের প্রস্তুতি নিন ✨🧡\n—𝐀𝐋𝐕𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌸",
      url: "https://drive.google.com/uc?id=1mkNnhFFvSpTIQSpw0qqAlkvtqaxH8BTy"
    },
    "06:05 PM": {
      message: ". ╭•┄┅══❁🌺❁══┅┄•╮\n•—»✨মাগরিবের আজান✨«—•\n ╰•┄┅══❁🌺❁══┅┄•╯\n\n⋆✦⋆ আসসালামু আলাইকুম 🖤💫\nপ্রিয় মুসলিম ভাই ও বোন এখন মাগরিবের আজান দেওয়া হয়েছে। সবাই নামাজের প্রস্তুতি নিন ✨🧡\n—𝐀𝐋𝐕𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌸",
      url: "https://drive.google.com/uc?id=1m5jiP4q9FPqDbIX4BoNTbse57h2SpgmC"
    },
    "07:15 PM": {
      message: "╭•┄┅══❁🌺❁══┅┄•╮\n•—»✨ইশারের আজান✨«—•\n╰•┄┅══❁🌺❁══┅┄•╯\n\n⋆✦⋆ আসসালামু আলাইকুম 🖤💫\nপ্রিয় মুসলিম ভাই ও বোন এখন ইশারের আজান দেওয়া হয়েছে। সবাই নামাজের প্রস্তুতি নিন ✨🧡\n—𝐀𝐋𝐕𝐈 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓🌸",
      url: "https://drive.google.com/uc?id=1mP2HJlKRGRc2P9joj2IpA1wH-eSrtazz"
    }
  };

  let lastSent = null; // একই মিনিটে ডাবল সেন্ড আটকাবে

  setInterval(async () => {
    const now = new Date(Date.now() + 21600000); // +6 GMT offset
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).trim();

    if (prayerTimes[currentTime] && lastSent !== currentTime) {
      lastSent = currentTime;
      try {
        const attachment = (await axios.get(prayerTimes[currentTime].url, { responseType: "stream" })).data;
        const msg = { body: prayerTimes[currentTime].message, attachment };
        for (const tid of global.data.allThreadID) {
          api.sendMessage(msg, tid);
        }
      } catch (err) {
        console.error("Message send failed:", err);
      }
    }
  }, 15000); // প্রতি 15 সেকেন্ডে টাইম চেক হবে
};

module.exports.run = () => {};
