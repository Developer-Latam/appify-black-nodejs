import { Router } from 'express';
import {  
    loginUser, 
    signUpController, 
    signUpSubUsuarioController, 
    updateSubUser,
    configPasswordSubUser,
    setpassForSubUser,
    testController
} from '../controllers/userController.js';

const router = Router()


router.post('/login', loginUser);
router.post('/signup', signUpController);
router.post('/create-subuser', signUpSubUsuarioController)
router.get('/config-password', configPasswordSubUser)
router.post('/set-password', setpassForSubUser)
router.put('/updUser/:userId', updateSubUser);
//ruta para test
router.put('/t', testController)


export default router 


