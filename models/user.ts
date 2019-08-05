import { Post } from "./post";
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, HasMany } from "sequelize-typescript";

@Table
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public id!: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    public name!: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    public email!: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    public password!: string;

    @AllowNull(false)
    @Column({ type: DataType.ENUM, values: ["UK", "USA", "SY"] })
    public country!: string;

    @AllowNull(false)
    @Column({ type: DataType.DATE })
    public birthdate!: Date;

    @HasMany(() => Post)
    public posts!: Post[];
}

export default User;
