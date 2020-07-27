const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  category: 'info',
  description: 'Returns latency and API ping',
  run: async (bot, message, args) => {
    const msg = await message.channel.send('🏓 Pinging...');
    const embed = new MessageEmbed()
      .setTitle('🏓 Pong! 🏓')
      .setDescription(
        ` Latency is ${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )}ms\n API Latency is ${Math.round(bot.ws.ping)}ms`
      )
      .setColor('0x47FF00');
    msg.edit(embed);
  },
};
