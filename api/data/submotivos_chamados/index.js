'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getSubmotivos_chamados = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('submotivos_chamados');
        const list = await pool.request()
        .query(sqlQueries.submotivos_chamadolist)
        return list.recordset;      
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdSubmotivos_chamado = async(submotivoId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('submotivos_chamados');
        const usuario = await pool.request()
                            .input('submotivoId', sql.Int, submotivoId)
                            .query(sqlQueries.submotivos_chamadobyId);
        return submotivos_chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

const createSubmotivos_chamado = async (submotivos_chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('submotivos_chamados');
        const insertSubmotivos_chamado= await pool.request()
                        .input('submotivoId', sql.Int, submotivos_chamadoData.submotivoId)
                        .input('submotivo', sql.NVarChar(50),  submotivos_chamadoData.submotivo)
                        .query(sqlQueries.createSubmotivos_chamado);                            
        return insertSubmotivos_chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateSubmotivos_chamado = async (submotivoId, submotivos_chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('submotivos_chamados');
        const update = await pool.request()
        .input('submotivoId', sql.Int, submotivoId)
        .input('submotivo', sql.NVarChar(50),  submotivos_chamadoData.submotivo)

                        .query(sqlQueries.updateSubmotivos_chamado);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteSubmotivos_chamado = async (submotivoId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('submotivos_chamados');
        const deleteSubmotivos_chamado = await pool.request()
                            .input('submotivoId', sql.Int, submotivoId)
                            .query(sqlQueries.deleteSubmotivos_chamado);
        return deleteSubmotivos_chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getSubmotivos_chamados,
    createSubmotivos_chamado,
    updateSubmotivos_chamado,
    getByIdSubmotivos_chamado,
    deleteSubmotivos_chamado
}