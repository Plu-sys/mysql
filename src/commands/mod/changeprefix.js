const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super('changeprefix', 'mod', []);
  }

  run() {
    console.log('The prefix was changed on one server');
  }
};
