exports.run = async (HOR, message, args, level) => {
  const friendly = HOR.config.permLevels.find(l => l.level === level).name;
  message.reply(`あなたの権限レベル: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "一般宿泊者"
};

exports.help = {
  name: "mylevel",
  category: "全般",
  description: "この場所でのあなたの権限レベルを表示します。",
  usage: "mylevel"
};
