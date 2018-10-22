'use strict';

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config";

const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        operatorsAliases: false
    });

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.' !== 0)) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;