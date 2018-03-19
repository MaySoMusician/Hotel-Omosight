const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (HOR, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(HOR.uptime).format(" D [日], H [時間], m [分], s [秒]");
  message.channel.send(`= ホテル・オモサイト フロント係 統計 =
• メモリ使用量 :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• 稼働時間　　 :: ${duration}
• ユーザー数　 :: ${HOR.users.size.toLocaleString()}
• サーバー数　 :: ${HOR.guilds.size.toLocaleString()}
• チャンネル数 :: ${HOR.channels.size.toLocaleString()}
• Discord.js  :: v${version}
• Node        :: ${process.version}`, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "一般宿泊者"
};

exports.help = {
  name: "stats",
  category: "全般",
  description: "Botに関する統計を表示します。",
  usage: "stats"
};
