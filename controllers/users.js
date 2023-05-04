const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @route POST api/user/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ meesage: "type all the credentials" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password));
  const secret = process.env.JWT_SECRET;

  if (user && isPasswordCorrect && secret) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "10d" }),
    });
  } else {
    return res.status(400).json({ message: "wrong credentials" });
  }
};

/**
 *
 * @route POST api/user/register
 */
const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "fill the blanks" });
  }

  const registeredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (registeredUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const secret = process.env.JWT_SECRET;

  if (user && secret) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "10d" }),
    });
  } else {
    return res.status(400).json({ message: "failed to create user" });
  }
};

/**
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
