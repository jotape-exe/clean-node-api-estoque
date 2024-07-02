import mongoose from 'mongoose';
import ProdutoDTO from '../http/dto/ProdutoDTO.js';
import {
  OK,
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from '../http/status.js';

class ProdutoController {
  constructor(ProdutoDAOImpl) {
    this.produtoDAO = ProdutoDAOImpl;
  }

  async inserir(req, res) {
    const { nome, descricao, preco, quantidade, sku } = req.body;

    try {
      const produtoExistente = await this.produtoDAO.findBySKU(sku);
      if (produtoExistente) {
        return res.sendResponse(BAD_REQUEST, 'SKU já existe');
      }

      const novoProduto = await this.produtoDAO.create({
        nome,
        descricao,
        preco,
        quantidade,
        sku,
      });

      res.sendResponse(CREATED, 'Recurso criado com sucesso', {
        id: novoProduto.id,
      });
    } catch (err) {
      console.error(err.message);
      res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }

  async buscarTodos(req, res) {
    try {
      const produtos = await this.produtoDAO.findAll();
      res.sendResponse(
        OK,
        'Solicitação realizada com sucesso',
        produtos.map((produto) => new ProdutoDTO(produto))
      );
    } catch (err) {
      console.error(err.message);
      res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }

  async buscarPorSku(req, res) {
    try {
      const produto = await this.produtoDAO.findBySKU(req.params.sku);
      if (!produto) {
        return res.sendResponse(NOT_FOUND, 'Produto não encontrado');
      }
      res.sendResponse(
        OK,
        'Solicitação realizada com sucesso',
        new ProdutoDTO(produto)
      );
    } catch (err) {
      console.error(err.message);
      res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }

  async atualizar(req, res) {
    const { nome, descricao, preco, quantidade } = req.body;

    const camposAtualizados = {};
    if (nome) camposAtualizados.nome = nome;
    if (descricao) camposAtualizados.descricao = descricao;
    if (preco) camposAtualizados.preco = preco;
    if (quantidade) camposAtualizados.quantidade = quantidade;

    try {

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendResponse(BAD_REQUEST, 'ID de produto inválido');
      }

      let produto = await this.produtoDAO.findById(req.params.id);
      if (!produto)
        return res.sendResponse(NOT_FOUND, 'Produto não encontrado');

      produto = await this.produtoDAO.updateById(
        req.params.id,
        camposAtualizados
      );
      res.sendResponse(
        OK,
        'Produto atualizado com sucesso',
        new ProdutoDTO(produto).id
      );
    } catch (err) {
      console.error(err.message);
      res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }

  async apagar(req, res) {
    try {

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendResponse(BAD_REQUEST, 'ID de produto inválido');
      }

      const produto = await this.produtoDAO.findById(req.params.id);
      if (!produto)
        return res.sendResponse(NOT_FOUND, 'Produto não encontrado');

      await this.produtoDAO.deleteById(req.params.id);
      res.sendResponse(OK, 'Produto removido');
    } catch (err) {
      console.error(err.message);
      res.sendResponse(INTERNAL_SERVER_ERROR, 'Erro no servidor');
    }
  }
}

export default ProdutoController;
