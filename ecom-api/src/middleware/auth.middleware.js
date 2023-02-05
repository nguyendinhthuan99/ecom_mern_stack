const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token

  if(authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, user) => {
        if(err) {
          res.status(403).json(err?.message)
        }
        else {
          req.user = user
          next()
        }
    })
  }
  else {
    res.status(401).json('You are not authorized! ')
  }
}

const authorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?._id === req?.params?.id || req?.user?.isAdmin) {
      next()
    }
    else {
      res.status(403).json('You are not allowed to access this!')
    }
  })
}

const authAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req?.user?.isAdmin)
    {
      res.status(403).json('Only admin can access this!')
    }
    else {
      next()
    }
  })
}

module.exports = {
  authAdmin,
  verifyToken,
  authorization
}