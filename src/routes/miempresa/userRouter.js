import { Router } from 'express';
import { loginUser, 
    signUpSubUsuarioController, 
    updateSubUser,
    configPasswordSubUser,
    setpassForSubUser,
    getDataUserController,
    getAllUsersActController,
    getAllUsersInactController,
    testController } from '../../controllers/miempresa/userController.js';


const router = Router()


router.post('/login', loginUser);



router.get('/dataUser/:id', getDataUserController)
router.get('/allUsersAct/:idUser', getAllUsersActController)
router.get('/allUsersInact/:idUser', getAllUsersInactController)
router.post('/create-subuser', signUpSubUsuarioController)
router.get('/config-password', configPasswordSubUser)
router.post('/set-password', setpassForSubUser)
router.put('/updUser/:userId', updateSubUser);



router.get('/setPassForUserPrincipal', testController)
//ruta para test
router.get('/test', testController)


export default router 


