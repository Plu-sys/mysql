const BaseEvent = require('../../../utils/structures/BaseEvents');
const StateManager = require('../../../utils/StateManager');

const guildCommandPrefixes = new Map();
let connection = null;

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
    StateManager.emit(`ready`);
  }

  async run(client) {
    console.log(client.user.tag + 'has logged in');
    client.guild.cache.forEach((guild) => {
      connection
        .query(
          `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
        )
        .then((result) => {
          guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
        })
        .catch((err) => console.log(err));
    });
  }
};
