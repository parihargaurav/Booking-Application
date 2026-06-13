const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role: "user",
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

// Admin registration is gated behind a secret key (set ADMIN_SECRET_KEY in .env)
// so random users cannot create admin accounts for themselves.
exports.registerAdmin = async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: "Invalid admin secret key" });
  }

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role: "admin",
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json("not found");

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) return res.status(422).json("pass not ok");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  res.cookie("token", token).json(user);
};

// Admin login is functionally the same as login, but checks the role
// and refuses non-admin accounts so the admin login page can't be used
// by regular guests.
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json("not found");

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(422).json("pass not ok");

  if (user.role !== "admin") {
    return res.status(403).json({ error: "Not an admin account" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  res.cookie("token", token).json(user);
};

exports.profile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.logout = (req, res) => {
  res.cookie("token", "").json(true);
};