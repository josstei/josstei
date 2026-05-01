const { main } = require('./src/cli.js');

if (require.main === module) {
  void main();
}

module.exports = { main };
