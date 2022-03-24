'use strict';

const express = require('express');
const clienteController = require ('../controllers/clienteController');
const usuarioController = require('../controllers/usuarioController');
const chamadoController = require('../controllers/chamadoController');
const motivos_chamadosController = require('../controllers/motivos_chamadosController');
const submotivos_chamadosController = require('../controllers/submotivos_chamadosController');
const comentarioController = require('../controllers/comentarioController');

const router = express.Router();
const app = express();

const {getAllClientes, getCliente, AddCliente, updateCliente, deleteCliente} = clienteController;
const {getAllUsuarios, getUsuario, AddUsuario, updateUsuario, deleteUsuario} = usuarioController;
const {getAllChamados, getChamado, AddChamado, updateChamado, deleteChamado} = chamadoController;
const {getAllMotivos_chamados, getMotivos_chamado, AddMotivos_chamado, updateMotivos_chamado, deleteMotivos_chamado} = motivos_chamadosController;
const {getAllSubmotivos_chamados, getSubmotivos_chamado, AddSubmotivos_chamado, updateSubmotivos_chamado, deleteSubmotivos_chamado} = submotivos_chamadosController;
const {getAllComentarios, getComentario, AddComentario} = comentarioController;

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

router.get('/clientes', getAllClientes);
router.get('/cliente/:id', getCliente);
router.post('/cliente', AddCliente);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);

router.get('/usuarios', getAllUsuarios,(req, res) => {
res.json('usuarios')});
router.get('/usuario/:id', getUsuario);
router.post('/usuario', AddUsuario);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);

router.get('/chamados', getAllChamados);
router.get('/chamado/:id', getChamado);
router.post('/chamado', AddChamado);
router.put('/chamado/:id', updateChamado);
router.delete('/chamado/:id', deleteChamado);

router.get('/motivos_chamados', getAllMotivos_chamados);
router.get('/motivos_chamado/:id', getMotivos_chamado);
router.post('/motivos_chamado', AddMotivos_chamado);
router.put('/motivos_chamado/:id', updateMotivos_chamado);
router.delete('/motivos_chamado/:id', deleteMotivos_chamado);

router.get('/submotivos_chamados', getAllSubmotivos_chamados);
router.get('/submotivos_chamado/:id', getSubmotivos_chamado);
router.post('/submotivos_chamado', AddSubmotivos_chamado);
router.put('/submotivos_chamado/:id', updateSubmotivos_chamado);
router.delete('/submotivos_chamado/:id', deleteSubmotivos_chamado);

router.get('/comentarios', getAllComentarios);
router.get('/comentario/:id', getComentario);
router.post('/comentario', AddComentario);

module.exports = {
    routes: router
}