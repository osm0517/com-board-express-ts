import { Request, Response } from "express";
import { User } from "../../models/domain/User";
const crypto = require('crypto');

const createSalt = ():Promise<string> => {
  return new Promise((res, rej) => {
    crypto.randomBytes(256, (err:String, buf:any)=>{
      if(err) {
          console.log(err);
          rej(err);
      }
      res(buf.toString('base64'));
    })
  })
};

const createHashPassword = (pwd:String, salt:String, len:Number, iteration:Number):Promise<string> => {
  return new Promise(async (res, rej) => {
    crypto.pbkdf2(pwd, salt, iteration, len, 'sha512', (err:String, key:any) => {
      if (err) rej(err);
      res(key.toString('base64'));
    });
  });
};

const process = {
  signup : async (req:Request, res:Response) => {
    try {
      let { email, inputPassword, name, nickname } = req.body
      try {
        //동일한 아이디가 있는지 확인
        const emailVal = await User.findAll({
          where : {email : email}
        })
        //동일한 아이디가 확인이 되면 return으로 흐름이 끊김.
        //연산의 결과로는 success로 불린 값을 전송함
        if(emailVal[0]) return res.status(200).json({
          success : false,
          msg : "db에 동일한 이메일이 존재함",
          value : emailVal[0]
        }); else res.status(200).json({
          success : true,
          msg : "아이디 생성 가능함",
          value : email
        });
      } catch (err) {
        res.status(400).json("db에 id가 있는지 확인 중 err발생 => \n"+err)
      }
      //보안을 위해서 단방향 암호화를 사용
      //입력 pwd + salt를 해시 알고리즘을 사용해서 다이제스트를 구함
      const salt = await createSalt(); // 소금 만들어서 대입
      const password = await createHashPassword(inputPassword, salt, 64, 14582);

      await User.create({ email, password, name, nickname, salt })
      .then(console.log)
      // .then(v => res.status(200).json({
      //   success : true,
      //   msg : "아이디 생성 성공함",
      //   value : v
      // }))
      .catch(v => {
        console.log("db에 user 정보를 생성 중 err발생 => \n" + v);
        res.status(400).json({
          success : false,
          msg : "db에 계정을 생성 중 err 발생",
          value : v
        })
      })
    } catch (err) {
      res.status(400).json("계정을 생성 중 err발생 => \n"+err)
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