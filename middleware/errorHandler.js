const errorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    code: 404,
    success: false,
    message: 'Endpoint não encontrado',
    body: null,
  });
};

export default errorHandler;
