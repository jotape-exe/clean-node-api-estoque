import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../http/status.js';
import mongoose from 'mongoose';

class AuthController {
  constructor(usuarioDAO) {
    this.usuarioDAO = usuarioDAO;
  }

  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return res.sendResponse(
        BAD_REQUEST,
        'Credenciais inválidas',
        errorMessages
      );
    }
    const { nome, email, senha } = req.body;
    try {
      let usuario = await this.usuarioDAO.findByEmail(email);
      if (usuario) {
        return res.sendResponse(BAD_REQUEST, 'Usuário já existe');
      }

      usuario = await this.usuarioDAO.create(nome, email, senha);

      const payload = {
        user: {
          id: usuario.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.sendResponse(OK, 'Cadastro realizado com sucesso', {
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendResponse(BAD_REQUEST, 'Credenciais inválidas');
    }

    const { email, senha } = req.body;

    try {
      let usuario = await this.usuarioDAO.findByEmail(email);
      if (!usuario) {
        return res.sendResponse(BAD_REQUEST, 'Credenciais inválidas');
      }
  
      const isMatch = await bcrypt.compare(senha, usuario.senha)

      if (!isMatch) {
        return res.sendResponse(BAD_REQUEST, 'Credenciais inválidas');
      }

      const payload = {
        user: {
          id: usuario.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.sendResponse(OK, 'Login realizado com sucesso', { token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }
}

export default AuthController;
