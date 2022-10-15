import { Association, DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { ScrapAttributes } from "../interface/Scrap"
import { Board } from "./Board"
import { User } from "./User"

export class Scrap extends Model<ScrapAttributes> {
  public readonly id!: number
  public  userId!: number
  public  boardId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {
    userScrap: Association<Scrap, User>
    boardScrap: Association<Scrap, Board>
  }
}

Scrap.init(
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
    modelName: "Scrap",
    tableName: "board_scrap_tb",
    sequelize,
    freezeTableName: true,
  }
)
User.hasMany(Scrap, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userScrap",
})

Scrap.belongsTo(User, {
  foreignKey: "userId",
  as: "userScrap",
})

Board.hasMany(Scrap, {
  sourceKey: "id",
  foreignKey: "boardId",
  as: "boardScrap",
})

Scrap.belongsTo(Board, {
  foreignKey: "boardId",
  as: "boardScrap",
})
