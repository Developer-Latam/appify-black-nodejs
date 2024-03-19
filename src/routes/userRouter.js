import { Router } from 'express';
import { 
    loginUser, 
    signUpController, 
    signUpSubUsuarioController, 
    updateUser } from '../controllers/userController.js';
import { PrismaClient } from '@prisma/client';

const router = Router()

const prisma = new PrismaClient();

router.post('/login', loginUser);
router.post('/signup', signUpController);
router.put('/updUser/:id', updateUser);
router.post('/create-subuser', signUpSubUsuarioController)

//esta cochinada la hizo agos. (me hago cargo)
router.put('/editar-permisos', async (req, res) => {
    const { permisos, user } = req.body;
    //lo que viene en permisos es un array con todos los cambios que hay, lo que viene en user es solo un string 
    try {
      for (const permiso of permisos) {
        const { idPermiso, columnas } = permiso;

        const updates = { ver: false, administrar: false, inactivo: false, todo: false, propietario: false };
  
        for (const columna of columnas) {
          if (columna === 'todo') {
            updates.todo = true;
            updates.propietario = false;
          } else if (columna === 'propietario') {
            updates.todo = false;
            updates.propietario = true;
          } else {
            updates[columna] = true;
          }
        }
        console.log(updates)

        await prisma.permisos_de_usuario.updateMany({
          where: { user: user, idPermiso: idPermiso },
          data: updates
        });
      }
      console.log('permiso actualizado')
      return res.status(200).json({ ok: true, message: 'permisos actualizados' });
    } catch (error) {
      console.error('Error al actualizar permisos:');
      console.log(error)
      return res.status(500).send('Error al actualizar permisos');
    }
});

export default router 