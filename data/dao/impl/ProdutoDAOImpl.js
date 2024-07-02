import ProdutoDAO from '../ProdutoDAO.js';

class ProdutoDAOImpl {
  constructor() {
    Object.assign(this, ProdutoDAO.prototype);
  }
}

export default ProdutoDAOImpl;
