// This event executes when a new guild (server) is joined.

module.exports = async (HOR, guild) => {
  // We need to add this guild to our settings!
  HOR.settings.set(guild.id, HOR.config.defaultSettings);
};
