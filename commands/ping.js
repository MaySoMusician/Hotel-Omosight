exports.run = async (HOR, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("ピン？");
  msg.edit(`ポン！ 遅延は${msg.createdTimestamp - message.createdTimestamp}ミリ秒。API遅延は${Math.round(HOR.ping)}ミリ秒`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "一般宿泊者"
};

exports.help = {
  name: "ping",
  category: "全般",
  description: "ピンポンのようでピンポンでないピンポン。遅延を取得します。",
  usage: "ping"
};
