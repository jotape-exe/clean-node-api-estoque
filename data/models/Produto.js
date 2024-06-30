import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProdutoSchema = Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: String,
  preco: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  }
});

export default mongoose.model('Produto', ProdutoSchema);
