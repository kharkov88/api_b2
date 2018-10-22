import LocalStrategy from 'passport-local';
import passportJWT from "passport-jwt";
import User from '../models/User';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function (passport) {
  passport.use(new LocalStrategy.Strategy({
    session: false
  },
    function (username, password, cb) {
      return User.findOne({
          where: {username, password}
      })
        .then(user => {
          if (!user) {
            return cb(null, false, {
              message: 'Incorrect email or password.',
              type: 'warning'
            });
          }
          let obj = {
            id: user.id,
            username: user.username
          };
          return cb(null, obj, {
            message: 'Logged In Successfully',
            type: 'success'
          });
        })
        .catch(err => cb(err));
    }
  ));

  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret'
    },
    (jwtPayload, cb) => {
      try {
        return cb(null, jwtPayload.name);
      } catch (error) {
        cb(error);
      }
    }
  ));
}
