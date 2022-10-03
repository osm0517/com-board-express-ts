import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { SubCommentTextAttributes } from "../interface/Sub_Comment_Text"
import { SubComment } from "./SubComment"

export class SubCommentText extends Model<SubCommentTextAttributes> {
  public readonly id!: number
  public readonly subCommentId!: number
  public readonly text!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    commentSubText: Association<SubCommentText, SubComment>
  }
}

SubCommentText.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subCommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
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

SubComment.hasMany(SubCommentText, {
  sourceKey: "id",
  foreignKey: "subCommentId",
  as: "userSubId",
})

SubCommentText.belongsTo(SubComment, {
  foreignKey: "subCommentId",
  as: "userSubId",
})
