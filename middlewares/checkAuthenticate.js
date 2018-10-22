'use strict';
import passport from 'passport';
import Boom from 'boom';

const checkAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, users, info) => {
        if (err || info) {
            res.status(401).send(Boom.unauthorized('You are not authorized'));
        } else {
            next();
        }
    })(req, res, next)
};

export default checkAuthenticate;