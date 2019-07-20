import { DataFactory } from './../database/data-factory';

export abstract class Model {

    protected className: string = this.constructor.name;

    public save(): void {

        DataFactory.append(this.className, this);
    };
}