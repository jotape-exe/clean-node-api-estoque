import ProdutoDTO from '../../http/dto/ProdutoDTO.js';
import Produto from '../models/Produto.js'


class ProdutoDAO {
  async create(produtoData) {
    const novoProduto = new Produto(produtoData);
    const savedProduto = await novoProduto.save();
    return new ProdutoDTO(savedProduto);
  }

  async findBySKU(sku) {
    const produto = await Produto.findOne({ sku });
    return produto ? new ProdutoDTO(produto) : null;
  }

  async findById(id) {
    const produto = await Produto.findById(id);
    return produto ? new ProdutoDTO(produto) : null;
  }

  async findAll() {
    const produtos = await Produto.find();
    return produtos.map(produto => new ProdutoDTO(produto));
  }

  async updateById(id, camposAtualizados) {
    const produto = await Produto.findByIdAndUpdate(id, { $set: camposAtualizados }, { new: true });
    return produto ? new ProdutoDTO(produto) : null;
  }

  async deleteById(id) {
    const produto = await Produto.findByIdAndRemove(id);
    return produto ? new ProdutoDTO(produto) : null;
  }
}

export default ProdutoDAO;
