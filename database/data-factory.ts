import { readFile, writeFile, readFileSync } from "fs";
import { join } from "path";
import environment from "../environment";

export class DataFactory {

    public static save<T>(name: string, chunks: Array<T>): void {
        if (!name || !chunks) {
            throw "Cannot save of undefined into the undefined";
        }

        writeFile(join(environment.database, 'data', name + '.json'), JSON.stringify(chunks), (err) => {
            console.error(err);
        });
    };

    public static fetch<T>(name: string): Array<T> {
        try {
            const uuu = readFileSync(join(environment.database, 'data', name + '.json')).toLocaleString();
            return JSON.parse(uuu.toString()) as Array<T>;

        } catch (e) {
            return [];
        }
    };

    public static append<T>(name: string, chunk: T): void {
        const items = this.fetch<T>(name);
        if (items) {
            items.push(chunk);
            this.save(name, items);
        }
    }
}