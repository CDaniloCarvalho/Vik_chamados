'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getClientes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const list = await pool.request().query('SELECT * FROM clientes ORDER BY representante');
        return list.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdCliente = async(clienteId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const cliente = await pool.request()
                            .input('clienteId', sql.Int, clienteId)
                            .query(sqlQueries.clientebyId);
        return cliente.recordset;
    } catch (error) {
        return error.message;
    }
}

const createCliente = async (clienteData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const insertCliente= await pool.request()
                            .input('representante', sql.NVarChar(100), clienteData.representante)
                            .input('departamento', sql.NVarChar(50), clienteData.departamento)
                            .input('telefone', sql.NVarChar(50), clienteData.telefone)
                            .input('email', sql.NVarChar(50), clienteData.email)
                            .query(sqlQueries.createClientes);                            
        return insertCliente.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateCliente = async (clienteId, clienteData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const update = await pool.request()
                        .input('clienteId', sql.Int, clienteId)
                        .input('representante', sql.NVarChar(100), clienteData.representante)
                        .input('departamento', sql.NVarChar(50), clienteData.departamento)
                        .input('telefone', sql.NVarChar(50), clienteData.telefone)
                        .input('email', sql.NVarChar(50), clienteData.email)
                        .query(sqlQueries.updateCliente);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteCliente = async (clienteId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const deleteCliente = await pool.request()
                            .input('clienteId', sql.Int, clienteId)
                            .query(sqlQueries.deleteCliente);
        return deleteCliente.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getClientes,
    getByIdCliente,
    createCliente,
    updateCliente,
    deleteCliente
}