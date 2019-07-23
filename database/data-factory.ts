import { Model } from './../models/model';
import DB from '../database/database';
import { RowDataPacket } from "mysql2";

export class DataFactory {

    public static save<T extends Model>(name: string, chunk: T, callback: (rows: T[]) => any): void {
        if (!name || !chunk) {
            throw "Cannot save of undefined into the undefined";
        }

        let keys = chunk.fillable();
        let values = [];
        keys.forEach(key => values.push(chunk[key]));
        
        keys = keys.map(e => '`'+ e + '`');
        values = values.map(e => `'${e}'`);

        let query = `insert into ${ name } (${ keys }) values (${values})`;

        DB.execute(query, (err, result: RowDataPacket[]) => {
            if (err) {
                console.log("savesavesavesavesavesavesave", err);
                callback([]);
            }
            console.log("resultresultresultresultresultresult", result);
            callback(result as Array<T>);
        });
    };

    public static fetch<T extends Model>(name: string, callback: (rows: T[]) => any): void {

        DB.execute(`select * from ${name}`, (err, result: RowDataPacket[]) => {
            if (err) {
                console.log("Fetch", err);
                callback([]);
            }
            console.log("resultresultresultresultresultresult", result);
            callback(result as Array<T>);
        });
    };

    public static remove<T>(name: string, key: string, value: any, callback: (err) => any): void {

        DB.execute(`delete from ? where ? = ?`, [name, key, value], (err) => {
            if (err) {
                console.log("deletedeletedeletedeletedelete", err);
                callback(err);
            }
            callback(err);
        })
    }

    public static update<T extends Model>(name: string, key: string, value: any, chunk: T, callback: (rows: T[]) => any): void {

        let keys = chunk.fillable();
        let values = [];
        keys.forEach(key => values.push(`${key}='${chunk[key]}'`));

        let query = `update ${name} set ${values.join(' , ')} where ${key}=${value}`;

        DB.execute(query, (err, result: RowDataPacket[]) => {
            if (err) {
                console.log("UUpdate", err);
                callback([]);
            }
            console.log("resultresultresultresultresultresult", result);
            callback(result as Array<T>);
        });
    }

    public static get<T>(name: string, key: string, value: string, callback: (result: T) => any): void {
        DB.execute(`select * from ${name} where ${key} = '${value}'`, (err, result: RowDataPacket[]) => {
            if (err) {
                console.log("Get", err);
                callback(undefined);
            }
            else if(result.length > 1) {
                console.log('some logic is not okay!');
                callback(undefined);
            }
            else {
                console.log("resultresultresultresultresultresult", result);
                callback(result[0] as T);
            }
        });
    }
}