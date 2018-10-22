import express from 'express';
import {readTemplates, createTemplate} from '../middlewares/templates';

const router = express.Router();

router.get('/', readTemplates);

router.post('/create', createTemplate);

export default router;