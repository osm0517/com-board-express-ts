import { Category } from "../../models/domain/Board_Category"

console.log("======Create Category Table======")

const create_table_category = async () => {
  await Category.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Category Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Category Table : ", err)
    })
}

create_table_category()
