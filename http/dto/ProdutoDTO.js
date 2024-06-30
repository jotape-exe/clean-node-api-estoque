class ProdutoDTO {
  
  constructor({ id, nome, descricao, preco, quantidade, sku }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.quantidade = quantidade;
    this.sku = sku;
  }
}

export default ProdutoDTO;
