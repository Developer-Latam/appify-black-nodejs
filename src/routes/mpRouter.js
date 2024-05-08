import { Router } from 'express';
import { testMPController } from '../controllers/mpController.js';
const router = Router()

router.get('/code', testMPController)

export default router
