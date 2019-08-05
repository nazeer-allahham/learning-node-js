import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType,
    ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

import { Attachment } from "./attachment";
import { Comment } from "./comment";
import { User } from "./user";

@Table
export class Post extends Model<Post> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public id!: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    public title!: string;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    public body!: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public authorId!: number;

    @CreatedAt
    public publishedOn!: Date;

    @UpdatedAt
    public updatedOn!: Date;

    @BelongsTo(() => User)
    public author!: User;

    @HasMany(() => Attachment)
    public attachments!: Attachment[];

    @HasMany(() => Comment)
    public comments!: Comment[];
}

export default Post;
