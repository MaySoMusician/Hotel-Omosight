module.exports = async HOR => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await HOR.wait(1000);

  // Both `wait` and `HOR.log` are in `./modules/functions`.
  HOR.log("log", `${HOR.user.tag}は起動完了しました！ サーバー数: ${HOR.guilds.size} ユーザー数: ${HOR.users.size}`, "Ready!");

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  HOR.guilds.filter(g => !HOR.settings.has(g.id)).forEach(g => HOR.settings.set(g.id, HOR.config.defaultSettings));
  
  // 起動完了
  HOR.ready = true;
};
