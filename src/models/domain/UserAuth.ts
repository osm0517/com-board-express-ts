import { DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { UserAuthAttributes } from "../interface/User_Auth"

export class UserAuth extends Model<UserAuthAttributes> {
  public readonly id!: number
  public email!: string
  public randomstring!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {}
}

UserAuth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
    },
    randomstring: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  },
  {
    modelName: "User",
    tableName: "user_auth_tb",
    sequelize,
    freezeTableName: true,
  }
)
