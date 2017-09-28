const getBabelRelayPlugin = require('babel-relay-plugin');
try {
  const schema = require('../server/data/schema.json');
  module.exports = getBabelRelayPlugin(schema.data);
} catch (e) {

}

