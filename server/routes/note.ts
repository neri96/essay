import express from 'express';

import * as note from '../controlles/note';

const router = express.Router();

// const upload = multer({ dest: 'uploads/' });

import authMiddleware from '../middlewares/auth';

router.get('/getall', authMiddleware, note.getAll);
router.get('/getone/:id', authMiddleware, note.getOne);
router.post('/create', authMiddleware, note.create);
router.patch('/edit/:id', authMiddleware, note.edit);
router.delete('/remove/:id', authMiddleware, note.remove);

export default router;