import models from '../models';

export const readTemplates = (req, res) => {
    models.Template.findAll()
        .then(templates => res.json(templates))
};

export const createTemplate = (req, res) => {
    models.Template.sync().then(() => {
        models.Template.create(req.body)
            .then(() => res.json({success: true}))
            .catch(err => res.json(err))
    });
};