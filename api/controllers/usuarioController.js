'use strict';

const usuarioData = require('../data/usuarios');

const getAllUsuarios = async (req, res, next) => {
    try { 
        const list = await usuarioData.getUsuarios();    
         res.send(list);     
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
const getUsuario = async (req, res, next) => {
    try {
        const usuarioid = req.params.id;
        const usuario = await usuarioData.getById(usuarioid);
        res.send(usuario);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddUsuario = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await usuarioData.createUsuario(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUsuario = async (req, res, next) => {
    try {
        const usuarioid =  req.params.id;
        const data = req.body;
        const updated = await usuarioData.updateUsuario(usuarioid, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUsuario = async (req, res, next) => {
    try {
        const usuarioid = req.params.id;
        const deletedUsuario = await usuarioData.deleteUsuario(usuarioid);
        res.send(deletedUsuario);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllUsuarios,
    getUsuario,
    AddUsuario,
    updateUsuario,
    deleteUsuario
}