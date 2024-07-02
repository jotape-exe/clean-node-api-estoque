import UsuarioDAO from '../UsuarioDAO.js';

class UsuarioDAOImpl {
  constructor() {
    Object.assign(this, UsuarioDAO.prototype);
  }
}

export default UsuarioDAOImpl;
