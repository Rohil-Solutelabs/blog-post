const Admin = require("../models/admin");

exports.deleteAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      const error = new Error("Could not find admin!");
      error.statusCode = 404;
      throw error;
    }
    await Admin.findByIdAndRemove(adminId);
    res.status(200).json({ message: "Deleted admin" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
