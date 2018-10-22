import express from 'express';
import login from '../middlewares/login';

const router = express.Router();

router.post('/', login);

export default router;