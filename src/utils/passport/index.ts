import passportLocal from 'passport-local'
import passport from 'passport'
import { User } from '../../models/domain/User'
import * as bcrypt from 'bcrypt'

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
          const findUser = await User.findOne({ where: { email: email } })
          // 유저가 없으면 없는 회원이라는 실패 로직 처리
          if (!findUser)
            done(null, false, { message: '가입되지 않은 회원 입니다.' })
          else {
            // 유저가 있으면 비밀번호를 암호화 해제를 해본다.
            const result = await bcrypt.compare(password, findUser.password)
            result
              ? done(null, findUser) // 비밀번호 일치하면 로그인 성공
              : done(null, false, { message: '비밀번호가 일치 하지 않음' }) // 일치 안 하면 실패
          }
        } catch (err) {
          console.error(err)
          // 에러 로직
          done(err)
        }
      },
    ),
  )
}