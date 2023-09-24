import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // This line will parse the token from cookie using cookie parser.
  // const token = req.cookies.access_token;

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("Token not found. Please Login again.");
  }

  const token = authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json("Token not found. Please Login again.");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decodedInfo) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Token is invalid");
    }
    req.user = decodedInfo.user;
    next();
  });
};
