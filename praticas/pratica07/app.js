require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouters');

const app = express();
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}J`
)
.then(() => console.log('Conectado'))
.catch((err) => console.error('Erro ao Conectar', err));

app.use('/produtos', produtosRouter);

module.exports = app;
