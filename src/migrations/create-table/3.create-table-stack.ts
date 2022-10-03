import { Stack } from "../../models/domain/Stack"

console.log("======Create Stack Table======")

const create_table_stack = async () => {
  await Stack.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Stack Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Stack Table : ", err)
    })
}

create_table_stack()
