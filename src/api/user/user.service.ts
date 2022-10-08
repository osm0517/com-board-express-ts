import { Request, Response } from "express";
import { User } from "../../models/domain/User";
import { Board } from "../../models/domain/Board";
import sequelize from "../../models";
import { UserAuth } from "../../models/domain/UserAuth";
const mailer = require('./mail');
import passport from "passport";
import jwt from 'jsonwebtoken';
const crypto = require('crypto');


const createSalt = ():Promise<string> => {
  return new Promise((res, rej) => {
    crypto.randomBytes(256, (err:String, buf:Buffer)=>{
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

const processing = {
  signup : async (req:Request, res:Response) => {
    try {
      const { email, inputPassword, name, nickname } = req.body
      //보안을 위해서 단방향 암호화를 사용
      //입력 pwd + salt를 해시 알고리즘을 사용해서 다이제스트를 구함
      const salt = await createSalt(); // 소금 만들어서 대입
      const password = await createHashPassword(inputPassword, salt, 64, 14582);

      await User.create({ email, password, name, nickname, salt })
      .then(console.log)
      .then(v => res.status(201).json({
        message : "아이디 생성 성공함"
      }))
      .catch(v => {
        console.log("db에 user 정보를 생성 중 err발생 => \n" + v);
        res.status(400).json({
          message : `db에 계정을 생성 중 err 발생 => \n ${v}`
        })
      })
    } catch (err) {
      res.status(400).json({
        message : `db에 계정을 생성 중 err 발생 => \n ${err}`
      })
    }
  },

  check : async (req:Request, res:Response) => {
    try {
      const {email} = req.body;
      //동일한 아이디가 있는지 확인
      const emailVal = await User.findAll({
        where : {email : email}
      })
      //동일한 아이디가 확인이 되면 return으로 흐름이 끊김.
      //연산의 결과로는 success로 불린 값을 전송함
      if(emailVal[0]) return res.status(409).json({
        message : "db에 동일한 이메일이 존재함"
      }); else res.status(200).json({
        message : "아이디 생성 가능함"
      });
    } catch (err) {
      res.status(400).json({
        message : `"db에 email이 있는지 확인 중 err발생 => \n ${err}`
      })
    }
  },

  auth : async (req:Request, res:Response) => {
    try {
      const { email, inputString } = req.body
      //SELECT randomstring from user_auth_tb
      let user:string = "";
      await UserAuth.findAll({ 
        attributes : ['randomstring'],
        where:{
        email : email
      } }).then(v=> user = v[0].randomstring)
      .catch(v=> console.log(v));
      // 인증번호 값이 존재하지 않는다면 실패함을 알려줌
      if(!user) return res.status(409).json({ message : "해당 email에 randomString을 찾을 수 없음 "});
      if( user == inputString ) {
        await UserAuth.destroy({
          where : {
            randomstring : inputString
          }
        }).then(v => console.log("정상적으로 지워짐"))
        .then( v => res.status(200).json({ message : "이메일 인증 완료"}))
        .catch(v => console.log("인증번호 지우는 과정에서 오류 발생 => \n" + v))
        
      }
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },

  send : async (req:Request, res:Response) => {
    try {
      let value:string = "";
      //해당 숫자를 바꿔서 문자열의 길이와 복잡도를 증가시킬 수 있음
      const randomNum = 5;
      crypto.randomBytes(randomNum, (err:String, buf:Buffer) => {
        if(err) console.log(err);
        else{
          value = buf.toString('base64');
        }
      });
      const { email, service } = req.body
      
      let emailParam = {
        service : service, // 무슨 서비스로 보낼 것인지

        toEmail: email,     // 수신할 이메일
    
        subject: '발송된 인증번호입니다.',   // 메일 제목
    
        text: `인증번호입니다 => ${value}`                // 메일 내용
      };
      await UserAuth.create({
        email:email,
        randomstring : value
      })
      .then(mailer.sendGmail(emailParam))
      .catch(v => res.status(400).json({
        message : `이메일 발송 중 err 발생 => \n${v}`
      }))
      res.status(200).send("성공");
    } catch (err) {
      res.status(400).json("이메일 발송 중 err 발생 => \n"+err)
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
      let value:any = 0;
      crypto.randomBytes(5, (err:String, buf:Buffer) => {
        if(err) console.log(err);
        else{
          value = buf;
        }
      });
      const salt = await createSalt();
      res.status(200).json(value.toString('base64'))
    } catch (err) {
      res.status(400).json({ message: "BAD_REQUEST" })
    }
  },
}

module.exports = {
  processing,
}