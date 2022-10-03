import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { SubCommentAttributes } from "../interface/Sub_Comment"
import { Comment } from "./Comment"
import { User } from "./User"

export class SubComment extends Model<SubCommentAttributes> {
  public readonly id!: number
  public readonly userId!: number
  public readonly commentId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userSub: Association<SubComment, User>
    commentSub: Association<SubComment, Comment>
  }
}

SubComment.init(
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
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "SubComment",
    tableName: "tbl_sub_comment",
    sequelize,
    freezeTableName: true,
  }
)

User.hasMany(SubComment, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userSub",
})

SubComment.belongsTo(User, {
  foreignKey: "userId",
  as: "userSub",
})

Comment.hasMany(SubComment, {
  sourceKey: "id",
  foreignKey: "commentId",
  as: "commentSub",
})

SubComment.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "commentSub",
})
