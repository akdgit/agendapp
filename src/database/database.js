import mysql from "promise-mysql";
import config from "../config.js";

const  connection = mysql.createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    timezone: "local"
});



export const getConnection = () => {
    return connection;
};