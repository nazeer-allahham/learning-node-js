import {
    AllowNull, AutoIncrement, BelongsTo, Column, DataType,
    ForeignKey, Model, PrimaryKey, Table,
} from "sequelize-typescript";

import { Comment } from "./comment";
import { Post } from "./post";
import { User } from "./user";

@Table
export class Attachment extends Model<Attachment> {

    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public id!: number;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    public url!: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.ENUM, values: ["post", "comment"] })
    public relatedTo!: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public postId!: number;

    @ForeignKey(() => Comment)
    @Column({ type: DataType.INTEGER.UNSIGNED })
    public commentId!: number;

    @BelongsTo(() => Post)
    public post!: Post;

    @BelongsTo(() => Comment)
    public comment!: Comment;
}

export default Attachment;
