import express from 'express';
import { body } from 'express-validator';

import * as user from '../controlles/user';

const router = express.Router();

import authMiddleware from '../middlewares/auth';

router.post('/signin',
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 8 }),
user.signIn);

router.post('/signup',
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 8 }),
user.signUp);

router.post('/sendverif', user.sendVerif);
router.post('/confirm', user.confirm);
router.post('/refreshToken', user.refreshToken);
router.post('/logout', authMiddleware, user.logout);

export default router;
