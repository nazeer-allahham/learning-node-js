import path = require("path");

export class Environment {
    public static port = 5555;
    public static hostName = "192.168.0.98";

    public static root = __dirname;
    public static public = path.join(__dirname, "public");
    public static database = path.join(__dirname, "database");
    public static models = path.join(__dirname, "models");

    public static DB_DRIVER = "mysql";
    public static DB_HOST = "localhost";
    public static DB_PORT = 3306;
    public static DB_DATABASE = "nodejs-learning-app";
    public static DB_USERNAME = "root";
    public static DB_PASSWORD = "root";
}
