// Messageイベントはメッセージを受信した全てのタイミングで発火します。
// 注: Botは全てのイベントに関連付けられているため、関数実行時全てのイベントに
// HOR, other, args が渡されます。
const moment = require("moment");
module.exports = (HOR, message) => {
  if(!HOR.ready) return;
  //if(message.author.bot) return;
  if(message.author.id === HOR.user.id) return;


  if(message.author.bot){ // 自分以外のBotが送信した場合
    
  } else{ // 一般ユーザーが送信した場合
    if(message.channel.type == 'dm'){
      let ls = HOR.getLogServer();
      if(ls){
        let time = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss.SS');
        let username = message.author.username + '#' + message.author.discriminator;
        let userID = message.author.id;
        ls.channels.find('name', 'dm').send(`\`================================\`
\`\`\`At: ${time}
By: ${username} (${userID})\`\`\`
${message.content}

\`================================\``
        );
      }
    }

    // PersistentCollectionからこのサーバー用の設定を取得
    // Guildが無い場合はデフォルト設定（DM用）
    const settings = HOR.getGuildSettings(message.guild);
    //const settings = message.guild ? HOR.settings.get(message.guild.id) : HOR.config.defaultSettings;

    // コマンド・関数内で使いやすいように、messageに設定オブジェクトを関連付ける
    message.settings = settings;

    // ユーザーもしくはメンバーの権限を取得
    const level = HOR.permlevel(message);
    const levelName = HOR.config.permLevels.find(l => l.level === level).name;
    const MainBotPrefix = ',';

    if(message.content.indexOf(settings.prefix) === 0){ // Lodge-Doppelgangerのコマンド
      // コマンド名と引数を分離
      // 例: 「+say Is this the real life?」
      // command = say
      // args = ["Is", "this", "the", "real", "life?"]
      const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();

      // 指定されたコマンド名がコマンドもしくはエイリアスとして存在するか確認
      const cmd = HOR.commands.get(command) || HOR.commands.get(HOR.aliases.get(command));
      // 「const 変数名 = 一方 OR 他方;」は、2つのうちどちらかから値を取得する方法としては見やすくて楽だね
      if(!cmd) return;

      // 一部のコマンドはDMでは使用できないので、それを確認。
      if(cmd && !message.guild && cmd.conf.guildOnly)
        return message.channel.send("指定されたコマンドはDMでは使用できません。サーバー内でお試しください。");

      if(cmd.conf.specificAllowed){
        if(!cmd.conf.specificAllowed.includes(levelName)){
          if(settings.systemNotice === "true"){
            var req = '';
            cmd.conf.specificAllowed.map(r => {
              req += `/ ${r} (${HOR.config.permLevels.find(l => l.name === r).level}) `
            });
            req = req.slice(2);
            return message.channel.send(`:no_entry_sign: あなたは、指定されたコマンドを実行するのに必要な権限がありません。
あなたの権限: ${levelName} (${level})
許可されている権限: ${req}`);
          } else{
            return;
          }
        }
      } else{
        if(level < HOR.levelCache[cmd.conf.permLevel]) {
          if(settings.systemNotice === "true") {
            return message.channel.send(`:no_entry_sign: あなたは、指定されたコマンドを実行するのに必要な権限がありません。
あなたの権限レベル: ${level} (${levelName})
要求されている権限レベル: ${HOR.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
          } else {
            return;
          }
        }
      }
      
      // message引数の単純化のため、送信者の権限レベルをauthorオブジェクトに格納（メンバーではないのでDMでも使用可）
      // levelというコマンドモジュールの引数は将来的に非推奨になる可能性あり
      message.author.permLevel = level;

      message.flags = [];
      while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
      }
      // コマンドが存在し且つユーザーが権限を持っているとき、コマンドを実行
      HOR.log("log", `${levelName} の ${message.author.username}(${message.author.id}) が${cmd.help.name}コマンドを実行しました`, "CMD");
      cmd.run(HOR, message, args, level);
    }
  }
};
