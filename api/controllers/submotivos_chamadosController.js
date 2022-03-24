'use strict';

const submotivos_chamadoData = require('../data/submotivos_chamados');

const getAllSubmotivos_chamados = async (req, res, next) => {
    try { 
        const list = await submotivos_chamadoData.getSubmotivos_chamados();    
         res.send(list);     
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
const getSubmotivos_chamado = async (req, res, next) => {
    try {
        const submotivoId = req.params.id;
        const submotivos_chamado = await submotivos_chamadoData.getByIdSubmotivos_chamado(submotivoId);
        res.send(submotivos_chamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddSubmotivos_chamado = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await submotivos_chamadoData.createSubmotivos_chamado(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSubmotivos_chamado = async (req, res, next) => {
    try {
        const submotivoId =  req.params.id;
        const data = req.body;
        const updated = await submotivos_chamadoData.updateSubmotivos_chamado(submotivoId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSubmotivos_chamado = async (req, res, next) => {
    try {
        const submotivoId = req.params.id;
        const deletedSubmotivos_chamado = await submotivos_chamadoData.deleteSubmotivos_chamado(submotivoId);
        res.send(deletedSubmotivos_chamado);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSubmotivos_chamados,
    getSubmotivos_chamado,
    AddSubmotivos_chamado,
    updateSubmotivos_chamado,
    deleteSubmotivos_chamado
}