import express from 'express';
import * as category from '../controlles/category';

const router = express.Router();

import authMiddleware from '../middlewares/auth';
import roleMiddleware from '../middlewares/role';

router.get('/getallpublic', category.getAllPublic);
router.post('/createpublic', authMiddleware, roleMiddleware, category.createPublic);
router.delete('/removepublic', authMiddleware, roleMiddleware, category.removePublic);

router.post('/getallprivate', authMiddleware, category.getAllPrivate);
router.post('/createprivate', authMiddleware, category.createPrivate);
router.delete('/removeprivate', authMiddleware, category.removePrivate);

export default router;