module.exports = class BaseCommmand {
  constructor(name, category, aliases) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
  }
};
