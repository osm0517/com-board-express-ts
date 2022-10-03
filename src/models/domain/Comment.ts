import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { CommentAttributes } from "../interface/Comment"
import { Board } from "./Board"
import { User } from "./User"

export class Comment extends Model<CommentAttributes> {
  public readonly id!: number
  public readonly userId!: number
  public readonly boardId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userComment: Association<Comment, User>
    boardComment: Association<Comment, Board>
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Comment",
    tableName: "tbl_comment",
    sequelize,
    freezeTableName: true,
  }
)

User.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userComment",
})

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "userComment",
})

Board.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "commentId",
  as: "boardComment",
})

Comment.belongsTo(Board, {
  foreignKey: "commentId",
  as: "boardComment",
})
