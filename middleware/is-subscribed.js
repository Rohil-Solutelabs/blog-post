const User = require("../models/user");

const isSubscribed = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (user.subscribed) {
      next();
    } else {
      return res.status(403).json({ message: "You need to have an active subscription to access this resource" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { isSubscribed };
