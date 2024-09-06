import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["Authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, Jwt token is require" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized , jwt token wrong or expired" });
  }
};
