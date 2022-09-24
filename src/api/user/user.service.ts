import { Request, Response } from "express"
import { User } from "../../models/domain/User"

exports.localSave = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body
    const user = await User.create({ email, password, name })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ message: "BAD_REQUEST" })
  }
}
