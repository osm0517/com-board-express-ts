import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { CommentTextAttributes } from "../interface/Comment_Text"
import { Comment } from "./Comment"

export class CommentText extends Model<CommentTextAttributes> {
  public readonly id!: number
  public readonly commentId!: number
  public readonly text!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    boardCommentText: Association<CommentText, Comment>
  }
}

CommentText.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Comment_text",
    tableName: "tbl_comment_text",
    sequelize,
    freezeTableName: true,
  }
)

Comment.hasMany(CommentText, {
  sourceKey: "id",
  foreignKey: "commentId",
  as: "userCommentId",
})

CommentText.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "userCommentId",
})
