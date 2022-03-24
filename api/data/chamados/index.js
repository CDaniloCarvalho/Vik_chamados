'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getChamados = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('chamados');
        const list = await pool.request().query('SELECT *FROM chamados ORDER BY data DESC ');
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getChamadosById = async(chamadosId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('chamados');
        const chamado = await pool.request()
                            .input('chamadosId', sql.Int, chamadosId)
                            .query(sqlQueries.chamadobyId);
        return chamado.recordset;
    } catch (error) {
        return error.message;
    }
}

const createChamado = async (chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('chamados');
        const insertChamado= await pool.request()
                            .input('chamadoId', sql.Int, chamadoData.chamadoId)
                            .input('nome', sql.NVarChar(50), chamadoData.nome)
                            .input('email', sql.NVarChar(50), chamadoData.email)
                            .input('areaSolicitante', sql.NVarChar(50), chamadoData.areaSolicitante)
                            .input('cliente', sql.NVarChar(50), chamadoData.cliente)
                            .input('motivoChamado', sql.NVarChar(50), chamadoData.motivoChamado)
                            .input('data', sql.NVarChar(50), chamadoData.data)
                            .input('submotivos', sql.NVarChar(50), chamadoData.submotivos)
                            .input('status',sql.NVarChar(50), chamadoData.status)                           
                            .input('observacoes',sql.NVarChar(5000), chamadoData.observacoes)
                            .input('tipos', sql.NVarChar(50), chamadoData.tipos)
                            .query(sqlQueries.createChamado);                            
        return insertChamado.recordset;
    } catch (error) {
        return error.message;
    }
    
}

const updateChamado = async (chamadoId, chamadoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('chamados');
        const update = await pool.request()
                .input('chamadoId', sql.Int, chamadoId)
                .input('nome', sql.NVarChar(50), chamadoData.nome)
                .input('email', sql.NVarChar(50), chamadoData.email)
                .input('areaSolicitante', sql.NVarChar(50), chamadoData.areaSolicitante)
                .input('cliente', sql.NVarChar(50), chamadoData.cliente)
                .input('motivoChamado', sql.NVarChar(50), chamadoData.motivoChamado)
                .input('data', sql.NVarChar(50), chamadoData.data)
                .input('submotivos', sql.NVarChar(50), chamadoData.submotivos)
                .input('status',sql.NVarChar(50), chamadoData.status)                           
                .input('observacoes',sql.NVarChar(5000), chamadoData.observacoes)
                .input('tipos', sql.NVarChar(50), chamadoData.tipos)
                .query(sqlQueries.updateChamado); 
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteChamado = async (chamadoId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('chamados');
        const deleteChamado = await pool.request()
                            .input('chamadoId', sql.Int, chamadoId)
                            .query(sqlQueries.deleteChamado);
        return deleteChamado.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getChamados,
    getChamadosById,
    createChamado,
    updateChamado,
    deleteChamado
}