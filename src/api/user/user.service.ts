import { Request, Response } from "express";
import { User } from "../../models/domain/User";
import { Board } from "../../models/domain/Board";
import sequelize from "../../models";
import passport from "passport";
import jwt from 'jsonwebtoken';
const crypto = require('crypto');

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
      //기본적으로 인증에 성공하면 session을 생성함
      passport.authenticate('local', { session: false }, (err, user) => {
        // passport-local 결과에서 Err가 있거나, 유저가 없을 때
        if (err || !user) {
          return res.status(400).json({
            message: 'Something is not right',
            user: user,
          })
        }
        // 로그인 후 코드 작성
        req.login(user, { session: false }, (err) => {
          // err 있을 때 처리
          if (err) {
            console.log(err)
            res.send(err)
          }
          // jwt를 이용하여 token을 생성
          const token = jwt.sign({ idx: user.idx }, '123')
          
          // cookie에 accessToken에 token을 담아서 저장
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 86400e3),
            sameSite: 'strict',
          })
          
          // user 정보 리턴
          return res.send({ user })
        })
      })(req, res)

    //   const { email, password } = req.body
    //   //db에 저장된 패스워드를 찾음
    //   let dbPassword:string = "";
    //   let dbSalt:string = "";
    //   await User.findAll({ 
    //     attributes : ['salt', 'password'],
    //     where:{email : email} 
    //   }).then(v => {
    //     dbPassword = v[0].password;
    //     dbSalt = v[0].salt;
    //   }).then(v=> console.log("db에서 값 정상적으로 가져옴"))
    //   .catch(v => {
    //     res.status(400).json({message : `db에서 값을 가져오는 중 에러 발생 => \n${v}`})
    //   })
    //   //변수에 값이 저장되지 않았다면 오류를 반환
    //   if(!dbPassword) return res.status(409).json({
    //     message : "db에 해당하는 이메일이 존재하지 않음"
    //   });
    //   //대조를 위해서 password를 만듦
    //   const createPassword = await createHashPassword(password, dbSalt, 64, 14582);
    //   if(dbPassword === createPassword) return res.status(200).json({message : "로그인 성공"});
    //   res.status(400).json({message : "비밀번호가 틀립니다"})
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