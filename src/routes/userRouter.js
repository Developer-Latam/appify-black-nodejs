import { Router } from 'express';
import {  
    loginUser, 
    signUpController, 
    signUpSubUsuarioController, 
    updateSubUser,
    configPasswordSubUser,
    setpassForSubUser
} from '../controllers/userController.js';

const router = Router()


router.post('/login', loginUser);
router.post('/signup', signUpController);
router.put('/updUser/:id', updateSubUser);
router.post('/create-subuser', signUpSubUsuarioController)
// router.post('/sendgmail', sendGmail)
router.get('/config-password', configPasswordSubUser)
router.post('/set-password', setpassForSubUser)



export default router 