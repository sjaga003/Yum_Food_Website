import jwt from 'jsonwebtoken';

const auth = async (res, req, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SIGN_SECRET);

      req.userId = decodedData?.id;
    } else {
      //Using google token
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
