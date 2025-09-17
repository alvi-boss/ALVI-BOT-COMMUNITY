const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟏𝟐:𝟎𝟎 𝐀𝐌 ⏰ \nকিরে তোদের কি ঘুম আসে নাহ! আর কতো প্রেম করবি...! 😕\n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '1:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟎𝟏:𝟎𝟎 𝐀𝐌⏰ \nএখনো জেগে চ্যাটিং করছিস!🙂 চ্যাটিং অফ কর আর ঘুমাহ্ তারাতারি...!😴 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '2:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟎𝟐:𝟎𝟎 𝐀𝐌⏰ \nতোদের কি ঘুম আসে নাহ..? সারাদিন প্রেম করস তাও তোদের হয় না!! এখনো জেগে আছিস? 🤨 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '3:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟎𝟑:𝟎𝟎 𝐀𝐌⏰ \nসবাই ঘুম আর তোরা জেগে আছিস মানে তোরা বলদ...! 🙂 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '4:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় ভোর 𝟎𝟒:𝟎𝟎 𝐀𝐌⏰ \nকিছুক্ষণ পর আজান দিবে...! 🥰 আজান দিলে নামাজ পড়ে নিও কেমন!!😘 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '5:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় ভোর 𝟎𝟓:𝟎𝟎 𝐀𝐌⏰ \nকি-গো নামাজ পড়ছো নাকি এখনো ঘুমিয়ে আছো?😾...! 👀 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '6:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সকাল 𝟎𝟔:𝟎𝟎 𝐀𝐌⏰ \n𝙂𝙊𝙊𝘿 𝙈𝙊𝙍𝙉𝙄𝙉𝙂☹︎ কোই রে, তোরা! আমি কি একাই উঠে পড়লাম নাকি তোমরাও উঠছো...! 🌻💜 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '7:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সকাল 𝟎𝟕:𝟎𝟎 𝐀𝐌⏰ \nকি-রে, তোরা এখনো ঘুমাস..!😴 কিরে ঘুম থেকে উঠবি না!!🤔 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '8:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সকাল 𝟎𝟖:𝟎𝟎 𝐀𝐌⏰ \nকি-রে তোরা সারারাত জেগে মোবাইল চালাস, কত বলি ঘুমা-ঘুমা তাও ঘুমাস না! এখন তারাতারি উঠে পর...! 🤧 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '9:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সকাল 𝟎𝟗:𝟎𝟎 𝐀𝐌⏰ \nকি-রে তোরা বিছানা ছাড়িস না কেন..? আমার কথা কি তোদের কানে যায় না নাকি/?😒 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '10:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সকাল 𝟏𝟎:𝟎𝟎 𝐀𝐌⏰ \nঘুম থেকে উঠলে, জমিদারের সন্তানরা এখন নাস্তা করে নাও..! 🙂 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '11:00 AM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় বেলা 𝟏𝟏:𝟎𝟎 𝐀𝐌⏰ \nএকটুও সময় কাটছে না..!😖 আসো গ্রুপে একটু আড্ডা মারি..!! 🐸 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '12:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় বেলা 𝟏𝟐:𝟎𝟎 𝐏𝐌⏰ \nকি খবর তোমাদের..?😌 গোসল করেছো নাকি আজকে করবা নাহ!! 😒 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '1:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় দুপুর 𝟎𝟏:𝟎𝟎 𝐏𝐌⏰ \nএকটু পরে আজান দিবে, নামাজের জন্য প্রস্তুতি নেও..! 💜🌻আজান দিলে সবাই নামাজ পড়ে নিও..🥰🥰 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '2:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় দুপুর 𝟎𝟐:𝟎𝟎 𝐏𝐌⏰ \nযাও সবাই দুপুরের খাবার খেয়ে নাও...!😋 আমিও যা-ই তোমরা খাওয়া দাওয়া শেষ করো!! \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '3:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় দুপুর 𝟎𝟑:𝟎𝟎 𝐏𝐌⏰ \nএখন একটু ঘুমাও..! 🫶 সারাদিন অনেক পরিশ্রম করেছো! 😍 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '4:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় বিকেল 𝟎𝟒:𝟎𝟎 𝐏𝐌⏰ \nমাঠে যাও খেলাধুলা করো..!👊 বন্ধু-বান্ধবের সাথে আড্ডা দাও!!🤼‍♂️ \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '5:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় বিকেল 𝟎𝟓:𝟎𝟎 𝐏𝐌⏰ \nআসরের আজান দিবে...! নামাজের প্রস্তুতি নাও..।😌 আজান দিলে নামাজ পড়ে নিও🌻 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '6:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সন্ধ্যা 𝟎𝟔:𝟎𝟎 𝐏𝐌⏰ \nযাও একটু হাল্কা নাস্তা করে আসো...! 🌆 আর পরিবারের সাথে সময় কাটাও, গল্প করো!👩‍❤️‍👨 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '7:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় সন্ধ্যা 𝟎𝟕:𝟎𝟎 𝐏𝐌⏰ \nনামাজের সময় হয়ে গেছে। সবাই মাগরিবের নামাজ পড়তে যাও..! 💜🫶 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '8:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟎𝟖:𝟎𝟎 𝐏𝐌⏰ \nএকটু পড়তে বসো..!😒 সারাদিন তো অনেক মোবাইল টিপছো..?🥱 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '9:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟎𝟗:𝟎𝟎 𝐏𝐌⏰ \nকি করছো তোমরা...? 🫣 গ্রুপে আসো আড্ডা দেয়!!🙃 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '10:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟏𝟎:𝟎𝟎 𝐏𝐌⏰ \n𝐃𝐢𝐧𝐧𝐞𝐫 𝐓𝐢𝐦𝐞, রাতের খাবার, খাইছো নাকি খাবা? 😋💜 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null },
    { time: '11:00 PM', message: 'আসসালামু❤️আলাইকুম\n\n\nএখন সময় রাত 𝟏𝟏:𝟎𝟎 𝐏𝐌⏰ \nঅনেক রাত হলো, শুয়ে পড়ো সারাদিন অনেক ক্লান্ত ছিলে...!😇 \n\n─꯭─⃝‌‌𝐀𝐥𝐯𝐢 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭 🌺', special: null }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT COMMAND LOADED (BD TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Dhaka';
        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
    });
};

module.exports.run = () => {
    // Main logic is in onLoad
};
