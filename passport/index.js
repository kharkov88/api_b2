import LocalStrategy from 'passport-local';
import passportJWT from "passport-jwt";
import models from "../models";
import bcrypt from "bcrypt";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function (passport) {
    passport.use(new LocalStrategy.Strategy({
            session: false
        },
        function (username, password, cb) {
            //console.log(username, password)
            return models.user.findOne({
                where: {username}
            })
                .then(user => {
                    if (!user) {
                        return cb(null, false, {
                            message: 'Incorrect username',
                            type: 'warning'
                        });
                    }
                    bcrypt.compare(password, user.password, (err, res) => {
                        // res == true or false
                        if (!res) {
                            return cb(null, false, {
                                message: 'Incorrect password.',
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
                    });
                })
                .catch(err => cb(err));
        }
    ));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
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
