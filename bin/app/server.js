const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');
const carHandler = require('../modules/cars/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/users/v1/login', basicAuth.isAuthenticated, userHandler.postDataLogin);
  this.server.get('/users/v1/profile', jwtAuth.verifyToken, userHandler.getUser);
  this.server.post('/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);

  this.server.post('/car/v1/parking', basicAuth.isAuthenticated, carHandler.parkingCar);
  this.server.put('/car/v1/parking', basicAuth.isAuthenticated, carHandler.parkingOut);
  this.server.get('/car/v1/parking-slot', basicAuth.isAuthenticated, carHandler.parkingSlot);

  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
