const { inspect } = require("util");
exports.run = async (HOR, message, args, level) => { // eslint-disable-line no-unused-vars
  HOR.user.setAvatar(args[0])
    .then(e => {
    HOR.log('res', 'アイコンを ' + args[0] + ' に変更しました', 'Log');
  }).catch(err => {
    HOR.log('res', 'アイコン変更に失敗しました: ' + args[0], 'ERR');
    console.error(err);
  });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot所有者"
};

exports.help = {
  name: "avatar",
  category: "システム",
  description: "このBotのアイコンを変更します",
  usage: "avatar [URL]"
};
