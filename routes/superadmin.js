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

module.exports = router;
