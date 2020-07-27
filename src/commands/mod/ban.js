const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('Ban', 'mod', []);
  }

  run() {
    console.log('Ban command was used.');
  }
};
