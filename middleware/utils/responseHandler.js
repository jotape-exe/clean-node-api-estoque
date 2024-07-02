const responseHandler = (req, res, next) => {

  //Para mais detalhes veja https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
  const LIMIT_SUCCESS_CODE = 299;

  res.sendResponse = (httpStatus, message, data = null) => {
    const response = {
      code: httpStatus,
      success: httpStatus < LIMIT_SUCCESS_CODE,
      message,
      body: data,
    };

    res.status(httpStatus).json(response);
  };

  next();
};

export default responseHandler;
