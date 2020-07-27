const { Collection, Client, Discord } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const StateManager = require('./utils/StateManager');
const client = new Client({
  disableEveryone: true,
});
const { registerCommands } = require('./utils/register');

const guildCommandPrefixes = new Map();
const config = require('./config.json');
const token = config.token;
/*bot.categories = fs.readdirSync('./commands/');
['command'].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});*/

client.on('ready', () => {
  client.user.setActivity(`a!help`, { type: 'WATCHING' });
  console.log(`Hello! ${client.user.username} is online!`);
});

const db = require('./database/db');
var mysql = require('mysql2');
const { registerEvents } = require('./utils/register');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'shirs',
  password: 'Shirshak12',
  database: 'discordtest',
});

client.login(token);
// client.on('ready', () => {
//   console.log('The bot is logged in!');
//   client.guilds.cache.forEach((guild) => {
//     connection
//       .query(
//         `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
//       )
//       .then((result) => {
//         guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// });

client.on('guildCreate', async (guild) => {
  try {
    await connection.query(
      `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
    );
    await connection.query(
      `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
    );
  } catch (err) {
    console.log(err);
  }
});
// eergwerew trwrwrwer
client.on('message', async (message) => {
  if (message.author.bot) return;
  const prefix = guildCommandPrefixes.get(message.guild.id);
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(bot, message, args);
  if (message.content.toLowerCase().startsWith(prefix + 'changeprefix')) {
    if ((message.member.id = message.guild.ownerID)) {
      const { cmdPrefix } = message.content.split(' ');

      if (args[0]) {
        newPrefix = args[0];
        try {
          await connection.query(
            `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}' `
          );
          guildCommandPrefixes.set(message.guild.id, newPrefix);
          message.channel.send(
            `You have sucessfully updated your prefix to '${newPrefix}'`
          );
        } catch (err) {
          console.log(err);
          message.channel.send(
            `Failed to update your prefix to '${newPrefix}'`
          );
        }
      } else {
        message.channel.send('You have not specified the new prefix.');
      }
    } else {
      message.channel.send(
        'You do not have the permission to change the prefix. Contact the owner.'
      );
    }
  }
});

(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, './src/commands');
  await registerEvents(client, '../events');
})();
