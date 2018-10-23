import models from "../models";

export const createUser = (req, res) => {
    models.user.sync().then(() => {
        models.user.create(req.body)
            .then(() => res.json({success: true}))
            .catch(err => res.json(err))
    });
};