exports.run = async (HOR, message, args, level) => {// eslint-disable-line no-unused-vars
  //let msgDie = await message.reply("XPFaucetBotはシャットダウンしています");
  HOR.ready = false;
  
  await HOR.wait(100);
  
  HOR.commands.forEach( async cmd => {
    await HOR.unloadCommand(cmd);
  });
  
  /*for(dbName in HOR.db){
    await HOR.db[dbName].closeFromDB();
  }
  */
  message.reply("ホテル・オモサイト フロント係はシャットダウンできます")
    .then(()=> {
    HOR.user.setStatus("invisible");
    HOR.ready = false;
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot管理者"
};

exports.help = {
  name: "die",
  category: "システム",
  description: "Botを終了待機状態にします。",
  usage: "die"
};
