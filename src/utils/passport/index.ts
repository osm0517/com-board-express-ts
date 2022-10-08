import passportLocal from 'passport-local'
import passport from 'passport'
import { User } from '../../models/domain/User'
import * as bcrypt from 'bcrypt'
const crypto = require('crypto');

const createHashPassword = (pwd:String, salt:String, len:Number, iteration:Number):Promise<string> => {
  return new Promise(async (res, rej) => {
    crypto.pbkdf2(pwd, salt, iteration, len, 'sha512', (err:String, key:any) => {
      if (err) rej(err);
      res(key.toString('base64'));
    });
  });
};

// passport-local 설정
const LocalStrategy = passportLocal.Strategy

module.exports = () => {
  // passport에서 "local"이면 해당 로직으로 들어옴.
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // Local Login 처리 로직
      async (email: any, password: any, done: any) => {
        try {
          // sequelize를 이용해 email를 검색해 유저를 조회한다.
          const findUser = await User.findOne({ 
            where: { email: email } 
          })
          // 유저가 없으면 없는 회원이라는 실패 로직 처리
          if (!findUser)
            done(null, false, { message: '존재하지 않는 이메일입니다.' })
          else {
            // 유저가 있으면 대조를 하기 위해서 비밀번호를 만듦
            const createPassword = await createHashPassword(password, findUser.salt, 64, 14582);
            createPassword == findUser.password
              ? done(null, findUser) // 비밀번호 일치하면 로그인 성공
              : done(null, false, { message: '비밀번호가 일치 하지 않음' }) // 일치 안 하면 실패
          }
        } catch (err) {
          console.error(err)
          // 에러 로직
          done({ message : `로그인을 시도하는 중 err 발생 => ${err}`})
        }
      },
    ),
  )
}