const jwt = require('jsonwebtoken');
const User = require('../usermodel/schema');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized HTTP request, token not provided" });
  }

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET_KEY'); // Replace 'JWT_SECRET_KEY' with your actual secret key
    
    // Fetch the user data from the database using the decoded token
    const userData = await User.findOne({ email: decoded.email }).select({
        password: 0,
    });

    if (!userData) {
      return res.status(401).json({ msg: "User not found" });
    }

    console.log('User data from database:', userData);

    req.user = userData; // Attach the user data to the request object
    req.token = token;
    req.userID = userData._id; // Fixed the typo

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
