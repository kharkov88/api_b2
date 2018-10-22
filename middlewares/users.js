import models from "../models";

export const createUser = (req, res) => {
    models.User.sync().then(() => {
        models.User.create(req.body)
            .then(() => res.json({success: true}))
            .catch(err => res.json(err))
    });
};