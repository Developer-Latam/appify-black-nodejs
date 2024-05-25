import Router from 'express'
import { emitirDTEtemporalController,dteUpdStatusSII,emitirDTERealController,testDTERealPDF, testDTEtemporalPDF, testDTEtemporalPARAMS } from '../../controllers/dte/docTemporalController.js'
const router = Router()

router.get('/test', emitirDTEtemporalController)
router.get('/testDTEReal', emitirDTERealController)
router.get('/test3', testDTEtemporalPARAMS)
router.get('/updStatus', dteUpdStatusSII)

//ruta del pdf
router.get('/test2', testDTEtemporalPDF)
router.get('/pdf-dteReal', testDTERealPDF)

export default router