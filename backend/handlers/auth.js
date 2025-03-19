const jwt = require('jsonwebtoken')

const db = require('../models')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


exports.register = async (req, res, next) => {
  const {
    errors,
    isValid,
  } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  try {
    const user = await db.User.create(req.body)
    const {
      id,
      username,
    } = user
    const token = jwt.sign({
      id,
      username,
    }, process.env.SECRET)
    res.status(200).json({
      id,
      username,
      token,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Username already taken',
      })
    }
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const {
    isValid,
  } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json({
      message: 'Username and password is required',
    })
  }

  try {
    const user = await db.User.findOne({
      username: req.body.username,
    })
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }
    const {
      id,
      username,
    } = user

    const valid = await user.comparePassword(req.body.password)
    if (valid) {
      const token = jwt.sign({
        id,
        username,
      }, process.env.SECRET, {
        expiresIn: 3600,
      })
      res.json({
        id,
        username,
        token,
      })
    } else {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }
  } catch (error) {
    return res.status(400).json(
      error,
    )
  }
}

exports.verify = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await db.User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(400).json({ message: error.message });
  }
}
