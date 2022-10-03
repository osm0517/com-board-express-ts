import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { BoardTextAttributes } from "../interface/Board_Text"
import { Board } from "./Board"

export class BoardText extends Model<BoardTextAttributes> {
  public readonly id!: number
  public readonly boardId!: number
  public readonly text!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userBoardText: Association<BoardText, Board>
  }
}

BoardText.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "Board",
    tableName: "tbl_board",
    sequelize,
    freezeTableName: true,
  }
)
Board.hasMany(BoardText, {
  sourceKey: "id",
  foreignKey: "boardId",
  as: "userBoardId",
})

BoardText.belongsTo(Board, {
  foreignKey: "boardId",
  as: "userBoardId",
})
