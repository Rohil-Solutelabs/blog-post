const express = require("express");
const superadminController = require("../controllers/superadmin");
const isAuthmiddleware = require("../middleware/is-auth");

const router = express.Router();

router.delete(
  "/deleteadmin/:adminId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["superadmin"]),
  superadminController.deleteAdmin
);

router.delete(
  "/deletepost/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["superadmin"]),
  superadminController.superadminDeletePost
);

module.exports = router;
