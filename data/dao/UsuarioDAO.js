import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

function UsuarioDAO() {}

UsuarioDAO.prototype.findByEmail = async function(email) {
  try {
    return await Usuario.findOne({ email });
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
  }
};

UsuarioDAO.prototype.findById = async function(id) {
  try {
    return await Usuario.findById(id);
  } catch (error) {
    throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
  }
};

UsuarioDAO.prototype.create = async function(nome, email, senha) {
  try {
    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
};

UsuarioDAO.prototype.updatePassword = async function(id, novaSenha) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(novaSenha, salt);
    await Usuario.findByIdAndUpdate(id, { senha: hashedSenha });
  } catch (error) {
    throw new Error(`Erro ao atualizar senha do usuário: ${error.message}`);
  }
};

UsuarioDAO.prototype.deleteById = async function(id) {
  try {
    await Usuario.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Erro ao deletar usuário por ID: ${error.message}`);
  }
};

export default UsuarioDAO;
