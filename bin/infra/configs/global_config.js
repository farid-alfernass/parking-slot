require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
  parkingSlot: process.env.PARKING_SLOT,
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  dsnSentryUrl: process.env.DSN_SENTRY_URL,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  elasticsearch: {
    connectionClass: process.env.ELASTICSEARCH_CONNECTION_CLASS,
    apiVersion: process.env.ELASTICSEARCH_API_VERSION,
    host: [
      process.env.ELASTICSEARCH_HOST
    ],
    maxRetries: process.env.ELASTICSEARCH_MAX_RETRIES,
    requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT
  },
  postgreConfig:{
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    max:  process.env.POSTGRES_MAX,
    idleTimeoutMillis: process.env.POSTGRES_TIMEOUT

  },
  logstash: {
    host: process.env.LOGSTASH_HOST,
    port: process.env.LOGSTASH_PORT,
    node_name: 'codebase-backend',
    ssl_enable: false,
    max_connect_retries: 10
  }
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
