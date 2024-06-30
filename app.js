import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import usuario from './routes/usuario.js';
import produto from './routes/produto.js';
import dotenv from 'dotenv';
import responseHandler from './middleware/utils/responseHandler.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const port = 3333;

app.use(express.json());
app.use(bodyParser.json());
app.use(responseHandler);
//app.use(errorHandler);

mongoose
  .connect('mongodb://localhost:27017/businessdb')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.use('/api/auth', usuario);
app.use('/api/produtos', produto);
