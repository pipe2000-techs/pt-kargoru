import { Router } from 'express';
import { getCotizaciones, getCotizacion, saveCotizacion, deleteCotizacion, updateCotizacion, activeCotizacion } from '../controllers/cotizaciones.controller.js';

const router = Router();

//listado total//////////////////////////////////
router.get('/cotizaciones', getCotizaciones);

//buscar por id//////////////////////////////////
router.get('/cotizaciones/:id', getCotizacion);

//guardar///////////////////////////////////
router.post('/cotizaciones', saveCotizacion);

//eliminar/////////////////////////////////
router.delete('/cotizaciones/:id', deleteCotizacion);

//actualizar//////////////////////////
router.put('/cotizaciones/:id',  updateCotizacion);

//activar//////////////////////////
router.put('/cotizaciones/active/:id',  activeCotizacion);

export default router;