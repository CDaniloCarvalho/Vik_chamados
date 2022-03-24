'use strict';

const motivos_chamadoData = require('../data/motivos_chamados');

const getAllMotivos_chamados = async (req, res, next) => {
    try { 
        const list = await motivos_chamadoData.getMotivos_chamados();    
         res.send(list);     
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
const getMotivos_chamado = async (req, res, next) => {
    try {
        const motivos_chamadoId = req.params.id;
        const motivos_chamado = await motivos_chamadoData.getMotivos_chamados(motivos_chamadoId);
        res.send(motivos_chamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddMotivos_chamado = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await motivos_chamadoData.createMotivos_chamado(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMotivos_chamado = async (req, res, next) => {
    try {
        const motivos_chamadoId =  req.params.id;
        const data = req.body;
        const updated = await motivos_chamadoData.updateMotivos_chamado(motivos_chamadoId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMotivos_chamado = async (req, res, next) => {
    try {
        const motivos_chamadoId = req.params.id;
        const deletedMotivos_chamado = await motivos_chamadoData.deleteMotivos_chamado(motivos_chamadoId);
        res.send(deletedMotivos_chamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllMotivos_chamados,
    getMotivos_chamado,
    AddMotivos_chamado,
    updateMotivos_chamado,
    deleteMotivos_chamado
}