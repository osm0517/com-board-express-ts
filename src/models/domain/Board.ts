import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { BoardAttributes } from "../interface/Board"
import { Category } from "./Board_Category"
import { Stack } from "./Stack"
import { User } from "./User"

export class Board extends Model<BoardAttributes> {
  public readonly id!: number
  public userId!: number
  public categoryId!: number
  public stackId!: number
  public title!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userBoard: Association<Board, User>
    stackBoard: Association<Board, Stack>
    categoryBoard: Association<Board, Category>
  }
}

Board.init(
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
    stackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    modelName: "Board",
    tableName: "board_tb",
    sequelize,
    freezeTableName: true,
  }
)
User.hasMany(Board, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userBoard",
})

Board.belongsTo(User, {
  foreignKey: "userId",
  as: "userBoard",
})

Category.hasMany(Board, {
  sourceKey: "id",
  foreignKey: "categoryId",
  as: "categoryBoard",
})

Board.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "categoryBoard",
})

Stack.hasMany(Board, {
  sourceKey: "id",
  foreignKey: "stackId",
  as: "stackBoard",
})

Board.belongsTo(User, {
  foreignKey: "stackId",
  as: "stackBoard",
})
