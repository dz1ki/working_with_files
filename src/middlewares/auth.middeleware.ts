import * as jwt from "jsonwebtoken";
import * as config from "config";

export function authMiddleware(req, res, next) {
  try {
    const token: string = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const data = jwt.verify(token, config.get("JWT.key"));
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
}
