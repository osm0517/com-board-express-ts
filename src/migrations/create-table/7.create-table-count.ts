import { Count } from "../../models/domain/Count"

console.log("======Create Count Table======")

const create_table_count = async () => {
  await Count.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Count Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Count Table : ", err)
    })
}

create_table_count()
