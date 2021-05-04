
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const config = require('../../../../infra/configs/global_config');

class Car {

  constructor(db){
    this.query = new Query(db);
  }

  async parkingSlot(carNumber) {
    if (carNumber === ''){
      const carInformation = await this.query.findSlot({carNumber:carNumber});
      if (carInformation.err) {
        return wrapper.error(new NotFoundError('Can not find car'));
      }
      const { data } = carInformation;
      return wrapper.data(data);
    }
    const startDate = new Date();
    const slotInformation = await this.query.findSlot({ timeOut : {
      $exists: true,
      $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
      $lt: new Date(new Date(startDate).setHours(23, 59, 59))
    }
    });
    if (slotInformation.err) {
      const data = {
        carsIn : [],
        slotRemaining: parseInt(config.get('parkingSlot'))
      };
      return wrapper.data(data);
    }
    const data = {
      carsIn : slotInformation.data,
      slotRemaining: parseInt(config.get('parkingSlot'))-slotInformation.data.length
    };
    return wrapper.data(data);
  }

}

module.exports = Car;
