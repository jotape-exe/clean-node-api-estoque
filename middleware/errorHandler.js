import { NOT_FOUND } from '../http/status.js';

const errorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(NOT_FOUND).json({
    code: NOT_FOUND,
    success: false,
    message: 'Endpoint não encontrado',
    body: null,
  });

};

export default errorHandler;
