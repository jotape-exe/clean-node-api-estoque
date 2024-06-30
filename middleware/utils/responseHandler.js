import { BAD_REQUEST } from '../../http/status.js'

const responseHandler = (req, res, next) => {

  res.sendResponse = (httpStatus, message, data = null) => {
    const response = {
      code: httpStatus,
      success: httpStatus < BAD_REQUEST,
      message,
      body: data,
    };

    res.status(httpStatus).json(response);
  };

  next();
};

export default responseHandler;
