
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);


const producer = async (payload) => {
  const postCommand = async payload => user.producer(payload);
  return postCommand(payload);
};
const consumer = async (payload) => {
  const postCommand = async payload => user.consumer(payload);
  return postCommand(payload);
};

module.exports = {
  producer,
  consumer

};
