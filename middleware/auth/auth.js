import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../../http/status.js'

export default function (req, res, next) {
  const token = req.header('Authorization');
  if (!token)
    return res.sendResponse(
      UNAUTHORIZED,
      'Token não informado'
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.sendResponse(
      UNAUTHORIZED,
      'Token inválido'
    );
  }
}
