


const { response, request } = require("express");
const jwt = require("jsonwebtoken")

const jwtValidator = (req = request, res = response, next ) => {

    //x-token -> headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "El token es necesario"
        })
    }

    try {
        // de esta manera hacemos extraemos para todas las solicitues el uid y el name del token
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        }) 
    }


    next();
}

module.exports = {
    jwtValidator
}