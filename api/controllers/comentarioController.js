'use strict';

const comentarioData = require('../data/comentarios');

const getAllComentarios = async (req, res, next) => {
    try { 
        const list = await comentarioData.getComentarios();    
         res.json(list);     
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getComentario = async (req, res, next) => {
    try {
        const comentariosId = req.params.id;
        const comentario = await comentarioData.getByIdComentario(comentariosId);
        res.send(comentario);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddComentario = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await comentarioData.createComentario(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllComentarios,
    getComentario,
    AddComentario
}