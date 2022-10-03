import { DataTypes, Model } from "sequelize"
import sequelize from "../index"
import { UserAttributes } from "../interface/User"

export class User extends Model<UserAttributes> {
  public readonly id!: number
  public email!: string
  public password!: string
  public name!: string
  public nickname!: string
  public salt!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associations: {}
}

User.init(
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
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  },
  {
    modelName: "User",
    tableName: "user_tb",
    sequelize,
    freezeTableName: true,
  }
)
