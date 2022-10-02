import { Scrap } from "../../models/domain/Scrap"

console.log("======Create Scrap Table======")

const create_table_scrap = async () => {
  await Scrap.sync({ force: true })
    .then(() => {
      console.log("✅Success Create Scrap Table")
    })
    .catch((err) => {
      console.log("❗️Error in Create Scrap Table : ", err)
    })
}

create_table_scrap()
