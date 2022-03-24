'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getUsuarios = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('usuarios');
        const list = await pool.request().query('select *from usuarios ORDER BY cnome ')
        return list.recordset; 
    } catch (error) {
        console.log(error.message);  
    }
}

const getByIdUsuario = async(usuarioid) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('usuarios');
        const usuario = await pool.request()
                            .input('usuarioid', sql.Int, usuarioid)
                            .query(sqlQueries.usuariobyId);
        return select.recordset;
    } catch (error) {
        return error.message;
    }
}

const createUsuario = async (usuarioData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('usuarios');
        const insertUsuario= await pool.request()
                        .input('cnome', sql.NVarChar(100), usuarioData.cnome)
                        .input('csetor', sql.NVarChar(50), usuarioData.csetor)
                        .input('cliente', sql.NVarChar(50), usuarioData.cliente)
                        .input('telefone', sql.NVarChar(50), usuarioData.telefone)
                        .input('cemail',  sql.NVarChar(50), usuarioData.cemail)
                        .input('csenha', sql.NVarChar(50), usuarioData.csenha)
                        .query(sqlQueries.createUsuario);                            
        return insertUsuario.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateUsuario = async (usuarioid, usuarioData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('usuarios');
        const update = await pool.request()
                        .input('usuarioid', sql.Int, usuarioid)
                        .input('cnome', sql.NVarChar(100), usuarioData.cnome)
                        .input('csetor', sql.NVarChar(50), usuarioData.csetor)
                        .input('cliente', sql.NVarChar(50), usuarioData.cliente)
                        .input('telefone', sql.NVarChar(50), usuarioData.telefone)
                        .input('cemail',  sql.NVarChar(50), usuarioData.cemail)
                        .input('csenha', sql.NVarChar(50), usuarioData.csenha)
                        .query(sqlQueries.updateUsuario);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteUsuario = async (usuarioid) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('usuarios');
        const deleteUsuario = await pool.request()
                            .input('usuarioid', sql.Int, usuarioid)
                            .query(sqlQueries.deleteUsuario);
        return deleteUsuario.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getUsuarios,
    getByIdUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}