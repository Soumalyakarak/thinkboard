import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // 🔥 standard way

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


