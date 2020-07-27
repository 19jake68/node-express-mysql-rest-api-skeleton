const Sequelize = require('sequelize');
const config = require('./app.js');
const loadModels = require('../app/models');

// Instantiaze Sequelize
const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  dialectOptions: {
    multipleStatements: config.db.dialectOptions.isMultipleStatements
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = db.Sequelize.Op;

module.exports = () => {
  const connect = () => {
    db.sequelize.sync().then((response) => {
      if (config.env !== 'production') {
        // Prints initialization
        console.log('****************************');
        console.log('*    Starting Server');
        console.log(`*    Port: ${config.port}`);
        console.log(`*    APP_ENV: ${config.env}`);
        console.log(`*    Database: ${config.db.dialect}`);
        console.log(`*    DB Connection: OK\n****************************\n`);
      }
    });
  };

  connect();
  loadModels();
};
