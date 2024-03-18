import { Router } from 'express';
import { 
    loginUser, 
    signUpController, 
    signUpSubUsuarioController, 
    updateUser } from '../controllers/userController.js';
const router = Router()


router.post('/login', loginUser);
router.post('/signup', signUpController);
router.put('/updUser/:id', updateUser);
router.post('/create-subuser', signUpSubUsuarioController)

export default router 