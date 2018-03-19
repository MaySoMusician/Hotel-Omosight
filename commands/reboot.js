exports.run = async (HOR, message, args, level) => {// eslint-disable-line no-unused-vars
  HOR.ready = false;
  
  await HOR.wait(100);
  
  let msgDie = await message.reply("ホテル・オモサイト フロント係は再起動しています");
  
  HOR.commands.forEach(async cmd => {
    await HOR.unloadCommand(cmd);
  });

  /*for(dbName in HOR.db){
    await HOR.db[dbName].closeFromDB();
  }*/
  
  msgDie.delete()
    .then(()=> {
    HOR.user.setStatus("invisible");
    
    process.exit(1);
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot管理者"
};

exports.help = {
  name: "reboot",
  category: "システム",
  description: "Botをシャットダウンします。PM2下では自動的に再起動します。",
  usage: "reboot"
};
