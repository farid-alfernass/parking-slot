
const ObjectId = require('mongodb').ObjectId;

class Query {

  constructor(db) {
    this.db = db;
  }

  async findSlot(parameter) {
    this.db.setCollection('parking-slot');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findById(id) {
    this.db.setCollection('parking-slot');
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

}

module.exports = Query;
