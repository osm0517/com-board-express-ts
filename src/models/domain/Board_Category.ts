import { DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { CategoryAttributes, CategoryEnum } from "../interface/Board_Category"

export class Category extends Model<CategoryAttributes> {
  public readonly id!: number
  public readonly categoryEnum!: CategoryEnum

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {}
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryEnum: {
      type: DataTypes.ENUM("FREE", "DEVELOPE"),
      allowNull: false,
    },
  },
  {
    modelName: "Category",
    tableName: "tbl_board_category",
    sequelize,
    freezeTableName: true,
  }
)
