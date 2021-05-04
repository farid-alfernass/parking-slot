
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError, InternalServerError, BadRequestError } = require('../../../../helpers/error');
const config = require('../../../../infra/configs/global_config');

class Car {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async parkingCar(payload) {
    const ctx = 'domain-parkingCar';
    const { carNumber } = payload;
    const startDate = new Date();
    const slot = await this.query.findSlot({ timeOut : {
      $exists: true,
      $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
      $lt: new Date(new Date(startDate).setHours(23, 59, 59))
    }
    });
    if (slot.err) {
      const data = {
        carNumber: carNumber,
        timeIn: startDate
      };
      const results = await this.command.insertOneSlot(data);
      if (results.err){
        logger.log(ctx, results.err, 'internal server error');
        return wrapper.error(new InternalServerError('internal server error'));
      }
      return wrapper.data({
        carNumber: carNumber,
        timeIn: startDate,
        slot: parseInt(config.get('parkingSlot'))-1
      });
    }
    if (parseInt(config.get('parkingSlot'))-slot.data.length >= 10){
      return wrapper.error(new BadRequestError({
        data: {
          slotRemaining : parseInt(config.get('parkingSlot'))-slot.data.length
        },
        message: 'Parking Full'
      }));
    }
    const results = await this.command.insertOneSlot({
      carNumber: carNumber,
      timeIn: startDate
    });
    if (results.err){
      logger.log(ctx, results.err, 'internal server error');
      return wrapper.error(new InternalServerError('internal server error'));
    }
    const slotRemaining = parseInt(config.get('parkingSlot'))-slot.data.length;
    return wrapper.data({
      carNumber: carNumber,
      timeIn: startDate,
      slotRemaining: slotRemaining
    });
  }

  async parkingOut(payload) {
    const ctx = 'domain-parkingOut';
    const { carNumber } = payload;
    const startDate = new Date();
    const car = await this.query.findSlot({ carNumber : carNumber });
    if (car.err) {
      logger.log(ctx, car.err, 'data not found');
      return wrapper.error(new NotFoundError('car not found'));
    }
    car.data.timeOut = startDate;
    const results = await this.command.upsertOne({carNumber : carNumber},car.data);
    if (results.err){
      logger.log(ctx, results.err, 'internal server error');
      return wrapper.error(new InternalServerError('internal server error'));
    }
    return wrapper.data({
      carNumber: carNumber,
      timeIn: car.data.timeIn,
      timeOut: startDate
    });
  }

}

module.exports = Car;
