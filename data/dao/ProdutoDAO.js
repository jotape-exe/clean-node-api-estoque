import ProdutoDTO from '../../http/dto/ProdutoDTO.js';
import Produto from '../models/Produto.js'


function ProdutoDAO() {}

ProdutoDAO.prototype.create = async function(produtoData) {
  const novoProduto = new Produto(produtoData);
  const savedProduto = await novoProduto.save();
  return new ProdutoDTO(savedProduto);
};

ProdutoDAO.prototype.findBySKU = async function(sku) {
  const produto = await Produto.findOne({ sku });
  return produto ? new ProdutoDTO(produto) : null;
};

ProdutoDAO.prototype.findById = async function(id) {
  const produto = await Produto.findById(id);
  return produto ? new ProdutoDTO(produto) : null;
};

ProdutoDAO.prototype.findAll = async function() {
  const produtos = await Produto.find();
  return produtos.map(produto => new ProdutoDTO(produto));
};

ProdutoDAO.prototype.updateById = async function(id, camposAtualizados) {
  const produto = await Produto.findByIdAndUpdate(id, { $set: camposAtualizados }, { new: true });
  return produto ? new ProdutoDTO(produto) : null;
};

ProdutoDAO.prototype.deleteById = async function(id) {
  const produto = await Produto.findByIdAndRemove(id);
  return produto ? new ProdutoDTO(produto) : null;
};

export default ProdutoDAO;
