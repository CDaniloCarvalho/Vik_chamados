'use strict';

const clienteData = require('../data/clientes');

const getAllClientes = async (req, res, next) => {
    try {
        const list = await clienteData.getClientes();
        res.send(list);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 
const getCliente = async (req, res, next) => {
    try {
        const clienteId = req.params.id;
        const cliente = await clienteData.getByIdCliente(clienteId);
        res.send(cliente);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const AddCliente = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await clienteData.createCliente(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCliente = async (req, res, next) => {
    try {
        const clienteId =  req.params.id;
        const data = req.body;
        const updated = await clienteData.updateCliente(clienteId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCliente = async (req, res, next) => {
    try {
        const clienteId = req.params.id;
        const deletedCliente = await clienteData.deleteCliente(clienteId);
        res.send(deletedCliente);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllClientes,
    getCliente,
    AddCliente,
    updateCliente,
    deleteCliente
}