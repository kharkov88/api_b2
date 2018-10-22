import passport from "passport";
import jwt from "jsonwebtoken";

export default function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                err: err,
                message: 'Something is not right',
                user: user,
                info: info
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const payload = {
                name: user.username,
                id: user.id
            };
            const token = jwt.sign(payload, 'your_jwt_secret',{expiresIn: 1200});
            return res.json({user, token, info});
        });
    })(req, res);
}
