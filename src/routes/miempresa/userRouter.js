import { Router } from 'express';
import { loginUser, 
    signUpSubUsuarioController, 
    updateSubUser,
    configPasswordSubUser,
    setpassForSubUser,
    getDataUserController,
    getAllUsersActController,
    getAllUsersInactController,
    testController,
    setpassForUser } from '../../controllers/miempresa/userController.js';
const router = Router()


router.post('/login', loginUser);
router.get('/dataUser/:id', getDataUserController)
router.get('/allUsersAct/:idUser', getAllUsersActController)
router.get('/allUsersInact/:idUser', getAllUsersInactController)
router.post('/create-subuser', signUpSubUsuarioController)
router.put('/updUser/:userId', updateSubUser);
//esta ruta es para recibir el token y descifrarlo, se tiene que hacer en el lado del front, esta de example
router.get('/config-password', configPasswordSubUser)
//Ruta de seteo de contraseñas para usuario principal
router.put('/setPassForUser', setpassForUser)
//Seteo de contraseña para sub usuario
router.put('/set-password', setpassForSubUser)


//ruta que es para testear
router.get('/setPassForToken', testController)



export default router 


