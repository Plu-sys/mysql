const BaseEvent = require('../../../utils/structures/BaseEvents');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(bot, message) {}
};
