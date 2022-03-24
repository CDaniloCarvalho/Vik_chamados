'use strict';

const chamadoData = require('../data/chamados');

const getAllChamados = async (req, res, next) => {
    try {
        const list = await chamadoData.getChamados();
        res.send(list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
const getChamado = async (req, res, next) => {
    try {
        const chamadoId = req.params.id;
        const chamado = await chamadoData.getChamadosById(chamadoId);
        res.send(chamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddChamado = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await chamadoData.createChamado(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateChamado = async (req, res, next) => {
    try {
        const chamadoId =  req.params.id;
        const data = req.body;
        const updated = await chamadoData.updateChamado(chamadoId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteChamado = async (req, res, next) => {
    try {
        const chamadoId = req.params.id;
        const deletedChamado = await chamadoData.deleteChamado(chamadoId);
        res.send(deletedChamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllChamados,
    getChamado,
    AddChamado,
    updateChamado,
    deleteChamado
}