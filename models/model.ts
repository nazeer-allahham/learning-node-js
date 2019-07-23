import { DataFactory } from './../database/data-factory';

export interface Model {

    fillable(): string[];
    save(): Promise<boolean>;
}