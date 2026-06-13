// Must be used AFTER authMiddleware, since it relies on req.user
// being populated from the JWT.
module.exports = function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};