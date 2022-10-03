import { Comment } from "../../models/domain/Comment"

console.log("======Create Comment Table======")

const create_table_comment = async () => {
  await Comment.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Comment Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Comment Table : ", err)
    })
}

create_table_comment()
