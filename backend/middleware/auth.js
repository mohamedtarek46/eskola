import jwt from "jsonwebtoken";

export const organizerAuthRequired = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.clearCookie("token").status(401).json({ message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.clearCookie("token").status(401).json({ message: "Invalid token" });
  }
  if (req.user.role !== "organizer") {
    return res.clearCookie("token").status(401).json({ message: "Not authorized" });
  }
  next();
};

export const authRequired = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.clearCookie("token").status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.clearCookie("token").status(401).json({ message: "Invalid token" });
  }

  next();
};
