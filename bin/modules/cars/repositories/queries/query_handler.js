
const Car = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const car = new Car(db);

const parkingSlot = async (carNumber) => {
  const getData = async () => {
    const result = await car.parkingSlot(carNumber);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  parkingSlot
};
