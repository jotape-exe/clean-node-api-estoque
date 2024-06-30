import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import usuario from './routes/usuario.js';
import produto from './routes/produto.js';
import dotenv from 'dotenv';
import responseHandler from './middleware/utils/responseHandler.js';
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(responseHandler);
//app.use(errorHandler);

mongoose
  .connect(process.env.HOST_URL)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
  });


app.listen(process.env.HOST_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.HOST_PORT}`);
});

app.use('/api/auth', usuario);
app.use('/api/produtos', produto);
