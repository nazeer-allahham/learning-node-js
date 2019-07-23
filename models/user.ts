import { Model } from "./model";
import { DataFactory } from "../database/data-factory";

export class User implements Model {
    constructor(id: number = -1,
        name: string,
        email: string,
        password: string,
        birthDate: Date,
        country: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.country = country;
    }

    id: number;
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    country: string;

    fillable(): string[] {
        return [
            'name',
            'email',
            'password',
            'birthDate',
            'country',
        ]
    }

    save(): Promise<boolean> {
        return new Promise((resolve) => {
            DataFactory.update<User>('users', 'id', this.id.toLocaleString(), this, (rows) => {
                if (rows) {
                    resolve(rows.length == 1)
                }
            });
        });
    }
}