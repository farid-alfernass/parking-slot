
class Command {

  constructor(db) {
    this.db = db;
    this.db.setCollection('user');
  }

  async insertOneUser(document){
    const result = await this.db.insertOne(document);
    return result;
  }
}

module.exports = Command;
