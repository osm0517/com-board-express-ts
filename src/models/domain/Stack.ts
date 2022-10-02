import { DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { CategoryEnum } from "../interface/Board_Category"
import { StackAttributes, StackEnum } from "../interface/Stack"

export class Stack extends Model<StackAttributes> {
  public readonly id!: number
  public readonly stackKind!: StackEnum

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {}
}

Stack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stackKind: {
      type: DataTypes.ENUM("JAVA", "C", "JAVASCRIPT", "REACT", "NODE"),
      allowNull: false,
    },
  },
  {
    modelName: "Stack",
    tableName: "tbl_stack",
    sequelize,
    freezeTableName: true,
  }
)
