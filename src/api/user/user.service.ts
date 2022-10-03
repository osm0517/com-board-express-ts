import { Request, Response } from "express";
import { User } from "../../models/domain/User";
import { Board } from "../../models/domain/Board";
import sequelize from "../../models";
const crypto = require('crypto');



const process = {
  signup : async (req:Request, res:Response) => {
    try {
      let { email, password, name, id } = req.body
      try {
        const emailVal = await User.findAll({
          where : {email : email}
        })
        const idVal = await User.findAll({
          where : {id : id}
        })
        if(emailVal[0]) return res.status(200).json(emailVal)
        if(emailVal[0]) return res.status(200).json(idVal)
      } catch (err) {
        res.status(400).json("db에 id가 있는지 확인 중 err발생 => "+err)
      }
      const salt = crypto.randomBytes(128).toString('base64');
      const hashPassword:any = crypto.createHash('sha512').update(password + salt).digest('hex');
      password = hashPassword;
      // const user = await User.create({ email, password, name, id, salt })
      // res.status(200).json(user)
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST => ", err })
    }
  },

  login : async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where:{
        email : email,
        password : password
      } })
      if(user) res.status(200).json(user);
      else res.status(200).json({ msg : "회원정보 없음" });
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },

  search : async (req:Request, res:Response) => {
    try {
      const {type} = req.params;
      switch (type) {
        case "id":
          res.status(200).json({ msg : "아이디 찾기" })
          break;
        case "pwd":
          res.status(200).json({ msg : "비밀번호 찾기" })
          break;
        default:
          res.status(200).json({ msg : "default로 넘어감" })
          break;
      }
    } catch (err) {
      res.status(400).json({ msg: "정보 찾는 중 에러 발생 => " + err })
    }
  },
  change : async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body
      const user = await User.update({password:password},{ where: {
        email : email
      }})
      if(user) res.status(200).json(user);
      else res.status(200).json({ msg : "회원정보 없음" });
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },
  //아직 구성 전
  delete : async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body
      const user = await User.update({password:password},{ where: {
        email : email
      }})
      if(user) res.status(200).json(user);
      else res.status(200).json({ msg : "회원정보 없음" });
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },
  test : async (req:Request, res:Response) => {
    try {
      const { email, id } = req.body
      const emailVal = await User.findAll({
        where : {id : id}
      })
      if(emailVal[0])res.status(200).json(emailVal)
      else res.status(200).json("ddddd")
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },
}

module.exports = {
  process,
}

module.exports = {
  process,

}