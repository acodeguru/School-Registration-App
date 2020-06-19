import { verify } from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken: any;
  try {
    decodedToken = verify(token, 'SVP@5T5Y:mT#C>G53YKH5gY&.K3=*RFjRzTjz5x:');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};

export default auth