'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getComentarios = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentarios');
        const list = await pool.request()
        .query(sqlQueries.comentariolist)
        return list.recordset; 
       
    } catch (error) {
        console.log(error.message);
    }
}

const getByIdComentario = async(comentarioId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentarios');
        const usuario = await pool.request()
                            .input('comentarioId', sql.Int, comentarioId)
                            .query(sqlQueries.comentariobyId);
        return comentario.recordset;
    } catch (error) {
        return error.message;
    }
}

const createComentario = async (comentarioData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comentarios');
        const insertComentario = await pool.request()
                        .input('chamadoId', sql.Int, comentarioData.chamadoId)
                        .input('alteradoPor', sql.NVarChar(50),comentarioData.alteradoPor)
                        .input('comentario', sql.NVarChar(600), comentarioData.comentario)
                        .input('alteracao', sql.NVarChar(50), comentarioData.alteracao)
                        .input('datas', sql.NVarChar(50),comentarioData.datas)
                        .query(sqlQueries.createComentario);                            
        return insertComentario.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getComentarios,
    getByIdComentario,
    createComentario
}