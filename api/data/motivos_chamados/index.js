'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getMotivos_chamados = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('motivos_chamados');
        const list = await pool.request()
        .query(sqlQueries.motivos_chamadolist)
        return list.recordset;      
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdMotivos_chamado = async(motivos_chamadoId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('motivos_chamados');
        const usuario = await pool.request()
                            .input('motivos_chamadoId', sql.Int, motivos_chamadoId)
                            .query(sqlQueries.motivos_chamadobyId);
        return motivos_chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

const createMotivos_chamado = async (motivos_chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('motivos_chamados');
        const insertMotivos_chamados= await pool.request()
                        .input('motivos_chamadoId', sql.Int, motivos_chamadoData.motivos_chamadoId)
                        .input('motivos_chamado', sql.NVarChar(50),  motivos_chamadoData.motivos_chamado)
                        .query(sqlQueries.createMotivos_chamado);                            
        return insertMotivos_chamados.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateMotivos_chamado = async (motivos_chamadoId, motivos_chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('motivos_chamados');
        const update = await pool.request()
        .input('motivos_chamadoId', sql.Int, motivos_chamadoId)
        .input('motivos_chamado', sql.NVarChar(50),  motivos_chamadoData.motivos_chamado)

                        .query(sqlQueries.updateMotivos_chamado);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteMotivos_chamado = async (motivos_chamadoId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('motivos_chamados');
        const deletemotivos_chamado = await pool.request()
                            .input('motivos_chamadoId', sql.Int, motivos_chamadoId)
                            .query(sqlQueries.deleteMotivos_chamado);
        return deletemotivos_chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getMotivos_chamados,
    createMotivos_chamado,
    updateMotivos_chamado,
    getByIdMotivos_chamado,
    deleteMotivos_chamado
}