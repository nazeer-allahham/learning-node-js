import {
    AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType,
    ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt,
} from "sequelize-typescript";

import { Attachment } from "./attachment";
import { Post } from "./post";
import { User } from "./user";

@Table
export class Comment extends Model<Comment> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public id!: number;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    public description!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public authorId!: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public postId!: number;

    @CreatedAt
    public publishedOn!: Date;

    @UpdatedAt
    public updatedOn!: Date;

    @BelongsTo(() => User)
    public author!: User;

    @BelongsTo(() => Post)
    public post!: Post;

    @HasMany(() => Attachment)
    public attachments!: Attachment[];
}

export default Comment;
