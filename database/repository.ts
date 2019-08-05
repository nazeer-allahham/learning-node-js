import { Model, Sequelize } from "sequelize-typescript";

import { Environment } from "./../environment";

export class Repository {

    public static synchronize(force: boolean, callback: () => any): void {
        if (!this.sequelize) {
            this.initialize();
        }
        this.sequelize.sync({ force })
            .then((_: any) => {
                console.warn(Repository.LOG, "models synchronized successfully!");
                callback();
            })
            .catch((err: any) => {
                console.error(Repository.LOG, "cannot to synchronize models", err);
            });
    }

    public static backup(): void {
        console.log("backup data");
    }

    public static import(name: string) {
        return this.sequelize.import(Environment.models + "\\" + name) as typeof Model;
    }

    public static instance(): Sequelize {
        if (this.sequelize) {
            return this.sequelize;
        }
        this.initialize();
        return this.sequelize;
    }

    private static LOG: string = "REPOSITORY";
    private static sequelize: Sequelize;

    private static initialize(): void {
        this.sequelize = new Sequelize({
            database: Environment.DB_DATABASE,
            dialect: "mysql",
            host: Environment.DB_HOST,
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf(".ts")) === member.toLowerCase();
            },
            modelPaths: [
                Environment.models,
            ],
            password: Environment.DB_PASSWORD,
            port: Environment.DB_PORT,
            username: Environment.DB_USERNAME,
        });
    }
}
