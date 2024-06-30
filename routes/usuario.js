import express from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/AuthController.js';
import UsuarioDAO from '../data/dao/UsuarioDAO.js';

const router = express.Router();
const usuarioDAO = new UsuarioDAO()
const controller = new AuthController(usuarioDAO)


router.post(
  '/register',
  [
    check('nome', 'Nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor inclua um email válido').isEmail(),
    check('senha', 'Por favor inclua uma senha com 6 ou mais caracteres').isLength({ min: 6 }),
  ],
  (req, res) => {
    controller.register(req, res);
  }
);


router.post(
  '/login',
  [
    check('email', 'Por favor inclua um email válido').isEmail(),
    check('senha', 'Senha é obrigatória').exists(),
  ],
  (req, res) => {
    controller.login(req, res);
  }
);

export default router;
