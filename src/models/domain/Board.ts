import { DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { BoardAttributes } from "../interface/Board"

export class Board extends Model<BoardAttributes> {
  public readonly idx!: number
  public title!: string
  public writer!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {};
  
}

Board.init(
  {
    idx: {
      type: DataTypes.INTEGER,
      //autoIncrement는 숫자를 하나씩 증가하며 index를 표시해줌
      //나중에 게시판의 내용과 연결해주도록 함.
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "board_information_tb",
    sequelize,
    freezeTableName: true,
  }
)