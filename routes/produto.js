import express from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth/auth.js';
import ProdutoController from '../controllers/ProdutoController.js';
import ProdutoDAOImpl from '../data/dao/impl/ProdutoDAOImpl.js';

const router = express.Router();
const produtoDAO = new ProdutoDAOImpl()
const produtoController = new ProdutoController(produtoDAO);


router.post(
  '/',
  [
    auth,
    [
      check('nome', 'Nome é obrigatório').not().isEmpty(),
      check('sku', 'SKU é obrigatório').not().isEmpty(),
      check('preco', 'Preço é obrigatório').isNumeric(),
      check('quantidade', 'Quantidade é obrigatória').isNumeric(),
    ],
  ],
  (req, res) => {
    produtoController.inserir(req, res);
  }
);

router.get('/', auth, (req, res) => {
  produtoController.buscarTodos(req, res);
});

router.get('/:sku', auth, (req, res) => {
  produtoController.buscarPorSku(req, res)
});

router.patch(
  '/:id',
  [
    auth,
    [
      check('preco', 'Preço deve ser numérico').optional().isNumeric(),
      check('quantidade', 'Quantidade deve ser numérica').optional().isNumeric(),
    ],
  ],
  (req, res) => {
    produtoController.atualizar(req, res);
  }
);

router.delete('/:id', auth, (req, res) => {
  produtoController.apagar(req, res);
});

export default router;
