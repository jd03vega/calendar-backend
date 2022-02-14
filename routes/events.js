/* 
    Rutas de Eventos 
    host + /api/events
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");

const {fieldValidator} = require("../middlewares/field-validator");
const {jwtValidator} = require("../middlewares/jwt-validator");
const { getEvents, addEvent, updateEvent, deletEvent } = require("../controllers/events");

// para aplicar un middleware a todas las rutas
router.use(jwtValidator);

// Rutas
router.get('/', getEvents);
router.post('/', [
    check('title', 'Titulo es requerido').not().isEmpty(),
    check('start', 'Fecha de inicio es requerida').custom(isDate),
    check('end', 'Fecha de fin es requerida').custom(isDate),
    fieldValidator
], addEvent);
router.put('/:id',[
    check('title', 'Titulo es requerido').not().isEmpty(),
    check('start', 'Fecha de inicio es requerida').custom(isDate),
    check('end', 'Fecha de fin es requerida').custom(isDate),
    check('id','Id is not valid').isMongoId(),
    fieldValidator
], updateEvent);   
router.delete('/:id', deletEvent);   

module.exports = router;