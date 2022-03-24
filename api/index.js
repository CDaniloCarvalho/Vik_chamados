'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const rotas = require('./routes/rotas')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}))

app.use('/', rotas.routes);



app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});