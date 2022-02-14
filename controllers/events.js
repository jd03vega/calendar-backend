
const { response } = require("express");

// const { genJWT } = require("../helpers/jwt");

const Event = require("../models/Evento");
// const bcrypt = require("bcryptjs");

const getEvents = async(req, res = response ) => {

    try {
        // const userEvents = await Event.find({ user: req.uid })
        const userEvents = await Event.find()
        .populate('user','name');

        return res.status(201).json({
            ok: true,
            events: userEvents
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });  
    }
};

const addEvent = async(req, res = response ) => {
    const event = new Event( req.body );

    try {

        event.user = req.uid; 

        const eventDB = await event.save();

        return res.status(201).json({
            ok: true,
            event: eventDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        });  
    }

};

const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;

    try {
        const exist = await Event.findById( eventId );

        if( !exist ) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el evento"
            });  
        }

        if( exist.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para actualizar el evento"
            }); 
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true}); // el new para obtener el ultimo cambio sino devuelve el anterior

        return res.json({
            ok: true,
            evento: updateEvent
        });  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Por favor hable con el administrador"
        });  
    }
};

const deletEvent = async(req, res = response ) => {
    const eventId = req.params.id;

    try {
        const exist = await Event.findById( eventId );

        if( !exist ) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el evento"
            });  
        }

        if( exist.user.toString() !== req.uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para eliminar el evento"
            }); 
        }

        await Event.findByIdAndDelete(eventId);

        return res.json({
            ok: true,
            evento: "Evento eliminado"
        });  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: "Por favor hable con el administrador"
        });  
    }
};

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    deletEvent,
}