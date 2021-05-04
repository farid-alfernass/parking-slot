
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneSlot(document){
    this.db.setCollection('parking-slot');
    const result = await this.db.insertOne(document);
    return result;
  }

  async upsertOne(parameter,query){
    this.db.setCollection('parking-slot');
    const result = await this.db.upsertOne(parameter,query);
    return result;
  }
}

module.exports = Command;
