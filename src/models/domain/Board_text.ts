import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { BoardTextAttributes } from "../interface/Board_Text"
import { Board } from "./Board"

export class BoardText extends Model<BoardTextAttributes> {
  public readonly id!: number
  public  boardId!: number
  public  boardText!: string

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
    boardText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "Board",
    tableName: "board_text_tb",
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
