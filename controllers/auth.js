
const { response } = require("express");

const { genJWT } = require("../helpers/jwt");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email: email });

        if( user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            });
        } 

        user = new User( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Gen JWToken
        const token = await genJWT(user.id, user.name);
      
        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }

};

const loginUser = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });

        if( !user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            });
        } 

        // conformar los passworss
        const validPassword = bcrypt.compareSync(password, user.password);

        if( !validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        // Gen JWToken
        const token = await genJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });
    }
};

const renewToken = async(req, res = response) => {

    const {uid, name} = req;

    // Gen JWToken
    const token = await genJWT(uid, name);
   
    res.json({
        ok: true,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
}