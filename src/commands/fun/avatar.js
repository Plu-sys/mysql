const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Get the avatar of anyone',
  usage: '[user mention]',
  category: 'fun',
  run: async (bot, message, args) => {
    let embed = new Discord.MessageEmbed();
    if (!message.mentions.users.first()) {
      embed.setTitle('Your avatar!');
      embed.setThumbnail(message.author.displayAvatarURL());
      embed.setColor('0xA113D8');
      return message.channel.send(embed);
    } else {
      let User = message.mentions.users.first();
      embed.setTitle(`${User.tag}'s avatar!`);
      embed.setThumbnail(User.displayAvatarURL());
      embed.setColor('0xA113D8');
      return message.channel.send(embed);
    }
  },
};
