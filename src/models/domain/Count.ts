import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { CategoryAttributes, CategoryEnum } from "../interface/Board_Category"
import { CountAttributes } from "../interface/Count"
import { Board } from "./Board"
import { User } from "./User"

export class Count extends Model<CountAttributes> {
  public readonly id!: number
  public readonly userId!: number
  public readonly boardId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userCount: Association<Count, User>
    boardCount: Association<Count, Board>
  }
}

Count.init(
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
    modelName: "Count",
    tableName: "tbl_board_count",
    sequelize,
    freezeTableName: true,
  }
)
User.hasMany(Count, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userCount",
})

Count.belongsTo(User, {
  foreignKey: "userId",
  as: "userCount",
})

Board.hasMany(Count, {
  sourceKey: "id",
  foreignKey: "boardId",
  as: "boardCount",
})

Count.belongsTo(Board, {
  foreignKey: "boardId",
  as: "boardCount",
})
