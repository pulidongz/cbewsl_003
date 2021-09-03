import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});

var tokens = jwt.sign(process.env.PAYLOAD, process.env.SECRET_KEY);
console.log(`JWT_TOKEN: ${tokens}`);

const authVerifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).json({
        message: "Fail",
        info: "Token Required",
        error: {
          statusCode: 403,
          message: "A token is required to use the API",
        },
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({
        message: "Fail",
        info: "Invalid token",
        error: {
          statusCode: 401,
          message: "Please use authorized token",
        },
      });
    }
    return next();
  };

export default authVerifyToken;