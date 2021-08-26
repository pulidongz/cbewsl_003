import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required to use the API");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

export default verifyToken;