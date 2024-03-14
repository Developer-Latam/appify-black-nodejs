import { Router } from 'express';
import { loginUser, signUpController, updateUser } from '../controllers/userController.js';
const router = Router()


router.post('/login', loginUser);
router.post('/signup', signUpController);
router.put('/updUser/:id', updateUser);

export default router 