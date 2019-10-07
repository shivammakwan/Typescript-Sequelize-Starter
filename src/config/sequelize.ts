import { Sequelize } from "sequelize-typescript";
export const cls = require("continuation-local-storage"),
    namespace = cls.createNamespace("typescript-sequelize-starter");
const dotenv = require("dotenv");

(<any>Sequelize).useCLS(namespace);

export const sequelizeConfig: any = new Sequelize({
    database: "test2",
    dialect: "mysql",
    username: "root",
    host: process.env.host,
    password: "",
    modelPaths: [__dirname + "/../models"],
    pool: {
        max: 15,
        min: 0,
        idle: 100000,
    }
});

export default sequelizeConfig;