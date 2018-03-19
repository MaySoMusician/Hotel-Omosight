// This event executes when a new member joins a server. Let's welcome them!

module.exports = (HOR, member) => {
  // Load the guild's settings
  const settings = HOR.settings.get(member.guild.id);
  
  let cnl = member.guild.channels.get(settings.frontdeskChannelID);
  if(cnl) cnl.send(`<@${member.id}>様、またお越しくださいませ`).catch(console.error);
};
