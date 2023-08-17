const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const DB = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {
    Sequelize: Sequelize,
    sequelize: DB,
    nodes: require('./nodes.model')(DB, Sequelize),
    players: require('./players.model')(DB, Sequelize),
    playersDevicesId: require('./playersDevicesId.model')(DB, Sequelize),
    playersQTEs: require('./playersQTEs.model')(DB, Sequelize),
    versions: require('./versions.model')(DB, Sequelize)
};

module.exports = db;