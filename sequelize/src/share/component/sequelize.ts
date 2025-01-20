import { Sequelize } from "sequelize";
import { appConfig } from "./config";

//Aka DB connector
export const sequelize = new Sequelize(appConfig.db.dsn);
