
const Car = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const parkingCar = async (payload) => {
  const car = new Car(db);
  const postCommand = async payload => car.parkingCar(payload);
  return postCommand(payload);
};

const parkingOut = async (payload) => {
  const car = new Car(db);
  const postCommand = async payload => car.parkingOut(payload);
  return postCommand(payload);
};

module.exports = {
  parkingCar,
  parkingOut
};
