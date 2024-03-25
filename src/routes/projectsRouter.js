import { Router } from 'express';
import { 
    createProject,
    getProjectById,
    getProjectsByUserId,
    updateProject,
    deleteProject
} from '../controllers/ProjectsController.js';
const router = Router();

// Crear un proyecto

router.post('/project', createProject);

// Buscar un proyecto

router.get('/project/:idProyecto', getProjectById);

// Buscar proyectos

router.get('/projects/:id', getProjectsByUserId);

// Actualizar un proyecto

router.put('/project/:idProyecto', updateProject);

// Eliminar un proyecto

router.delete('/project/:idProyecto', deleteProject);

export default router