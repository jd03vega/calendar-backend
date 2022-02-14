/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {fieldValidator} = require("../middlewares/field-validator");
const {jwtValidator} = require("../middlewares/jwt-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");


// Rutas
router.post(
    '/register', 
    [ // middlewares
        check("name", "El nombre es requerido").not().isEmpty(),
        check("email", "El email es requerido").isEmail(),
        check("password", "La contraseña debe ser de 6 caracteres").isLength( { min: 6 } ),
        fieldValidator

    ], 
    createUser);
router.post(
    '/', 
    [ // middlewares
        check("email", "El email es requerido").isEmail(),
        check("password", "La contraseña es requerida").not().isEmpty(),
        fieldValidator

    ], 
     loginUser);
router.get(
    '/renew', 
    jwtValidator,
     renewToken);

module.exports = router;