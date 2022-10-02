import { SubComment } from "../../models/domain/SubComment"

console.log("======Create SubComment Table======")

const create_table_sub_Comment = async () => {
  await SubComment.sync({ force: true })
    .then(() => {
      console.log("✅Success Create SubComment Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create SubComment Table : ", err)
    })
}

create_table_sub_Comment()
