import { Sequelize } from "sequelize";
import { appConfig } from "./env.config";

//Aka DB connector
// export const sequelize = new Sequelize(appConfig.db.dsn);

export const sequelize = new Sequelize(appConfig.db.dsn, {
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 60000,
  },
});
