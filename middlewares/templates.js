import models from '../models';

export const readTemplates = (req, res) => {
    models.template.findAll()
        .then(templates => res.json(templates))
};

export const createTemplate = (req, res) => {
    models.template.sync().then(() => {
        models.template.create(req.body)
            .then(() => res.json({success: true}))
            .catch(err => res.json(err))
    });
};