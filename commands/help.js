/*
Helpコマンドはコマンド名と説明を表示するためのものです。
コマンドの使用権限がない場合は表示されません。
引数にコマンド名を渡すと詳しい説明を表示します。
*/

exports.run = (HOR, message, args, level) => {
  const levelName = HOR.config.permLevels.find(l => l.level === level).name;
  // 引数無しの場合、全てのコマンドを一覧表示する
  if(!args[0]) {
    // サーバーごとの設定読み込み
    const settings = message.settings//HOR.getGuildSettings(message.guild);
    //const settings = message.guild ? HOR.settings.get(message.guild.id) : HOR.config.defaultSettings;

    // <Collection>.filter()関数で権限レベルでコマンドをフィルター
    const myCommands = message.guild
    ? HOR.commands.filter(cmd => {
      if(cmd.conf.specificAllowed) return cmd.conf.specificAllowed.includes(levelName);
      else return HOR.levelCache[cmd.conf.permLevel] <= level;
    })
    : HOR.commands.filter(cmd => {
      if(cmd.conf.guildOnly !== true){
        if(cmd.conf.specificAllowed) return cmd.conf.specificAllowed.includes(levelName);
        else return HOR.levelCache[cmd.conf.permLevel] <= level;
      }
      return false;
    });

    // 出力の整形のために最長コマンド名のみ抽出する
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= ホテル・オモサイト フロント係 コマンド一覧 =\n\n[${settings.prefix}help <コマンド名> で詳細表示]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if(currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    // 個別のコマンドの詳細表示
    let command = args[0];
    if(HOR.commands.has(command)) {
      command = HOR.commands.get(command);
      
      if(command.conf.specificAllowed){
        if(command.conf.specificAllowed.includes(levelName)){
          message.channel.send(`= ${command.help.name} = \n\n${command.help.description}\n\n使用法　　:: ${command.help.usage}\nエイリアス:: ${command.conf.aliases.join(", ")}\n権限　　　:: ${command.conf.specificAllowed.join(' / ')}\n\n= ${command.help.name} =`, {code:"asciidoc"});
        }
      } else{
        if(level >= HOR.levelCache[command.conf.permLevel]) {
          message.channel.send(`= ${command.help.name} = \n\n${command.help.description}\n\n使用法　　:: ${command.help.usage}\nエイリアス:: ${command.conf.aliases.join(", ")}\n権限　　　:: ${command.conf.permLevel} 以上\n\n= ${command.help.name} =`, {code:"asciidoc"});
        }
      }
      
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "一般宿泊者"
};

exports.help = {
  name: "help",
  category: "全般",
  description: "権限レベルに合わせて使用可能なコマンドを全て表示します",
  usage: "help [コマンド名]"
};
