const mongoConnection = require('../../../../../bin/helpers/databases/mongodb/connection');
const mongo = require('mongodb').MongoClient;
const sinon = require('sinon');
const config = require('../../../../../bin/infra/configs/global_config');
const { expect } = require('chai');
describe('Mongo Connection', () => {
  let stubMongoConnect;
  beforeEach(() => {
    stubMongoConnect = sinon.stub(mongo, 'connect');
    stubMongoConnect.resolves({
      isConnected: sinon.stub().returns(true)
    });
  });
  afterEach(() => {
    stubMongoConnect.restore();
  });
  it('should cover create mongo connection failed', () => {
    stubMongoConnect.restore();
    stubMongoConnect = sinon.stub(mongo, 'connect');
    stubMongoConnect.rejects({
      message: 'test fail connect'
    });
    mongoConnection.init();
  });
  it('should create connection', () => {
    mongoConnection.init();
  });
  it('should cover unavailable connection config', () => {
    mongoConnection.getConnection('mongodb://localhost:27019/notfounddb');
  });
  it('should get connection if exist', async () => {
    expect(await mongoConnection.getConnection(config.get('/mongoDbUrl')))
      .to.haveOwnProperty('data').to.be.an('object');
    let result = await mongoConnection.getConnection(config.get('/mongoDbUrl'));
    expect(result.data).to.has.all.keys(['index','db','config']);
    expect(result.data.db).to.be.not.empty;
    expect(result.data.config).to.equals(config.get('/mongoDbUrl'));
  });
});
