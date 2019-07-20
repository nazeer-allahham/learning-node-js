import { Model } from "./model";

export class User extends Model {
    constructor(name: string, email: string, password: string) {
        super();
        this.className = this.constructor.name;

        this.name = name;
        this.email = email;
        this.password = password;
    }

    name: string;
    email: string;
    password: string;
}