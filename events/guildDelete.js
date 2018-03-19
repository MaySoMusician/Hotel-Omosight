// This event executes when a new guild (server) is left.

module.exports = (HOR, guild) => {
  // Well they're gone. Let's remove them from the settings!
  HOR.settings.delete(guild.id);
};
