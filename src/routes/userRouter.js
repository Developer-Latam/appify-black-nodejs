import { Router } from 'express';
import { loginUser, signUpController, updateSubUser } from '../controllers/userController.js';
const router = Router()


router.post('/login', loginUser);
router.post('/signup', signUpController);
router.put('/updSubUser/:id', updateSubUser);

export default router