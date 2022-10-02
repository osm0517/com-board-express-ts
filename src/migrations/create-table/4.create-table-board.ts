import { Board } from "../../models/domain/Board"

console.log("======Create Board Table======")

const create_table_board = async () => {
  await Board.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Board Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Board Table : ", err)
    })
}

create_table_board()
