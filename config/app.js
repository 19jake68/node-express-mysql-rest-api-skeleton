const env = (process.env.APP_ENV || 'development').toLocaleLowerCase();
const port = process.env.APP_PORT || process.env.PORT || 3000;
const serverName = process.env.API_NAME;
const hostName = process.env.API_HOST || '127.0.0.1';
const gzip = process.env.API_GZIP !== 'false';
const throttle = process.env.API_THROTTLE === 'true';
const basePath = process.env.API_BASE_PATH || '/api/v1';

// Database
const dbUrl = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;
const dbHost = process.env.DATABASE_HOST;
const dbUsername = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbPort = process.env.DATABASE_PORT;
const dbDialect = process.env.DATABASE_DIALECT || 'mysql';
const dbDialectOptionsMultipleStatements =
  process.env.DATABASE_DIALECT_OPTIONS_MULTIPLE_STATEMENTS !== 'false';
const dbUseUTC = process.env.DATABASE_USE_UTC !== 'false';

module.exports = {
  env,
  port,
  serverName,
  hostName,
  basePath,
  gzip,
  throttle,

  // database
  db: {
    url: dbUrl,
    name: dbName,
    host: dbHost,
    username: dbUsername,
    password: dbPassword,
    port: dbPort,
    dialect: dbDialect,
    dialectOptions: {
      isMultipleStatements: dbDialectOptionsMultipleStatements,
      options: {
        useUTC: dbUseUTC
      }
    },
    define: {
      underscored: true
    }
  }
};
