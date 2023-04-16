const express = require("express");

const adminController = require("../controllers/admin");
const isAuthmiddleware = require("../middleware/is-auth");

const router = express.Router();

router.get(
  "/users",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin","superadmin"]),
  adminController.getUsers
);

router.get(
  "/allposts",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.getAllPosts
);

router.get(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.getPost
);

router.delete(
  "/deletepost/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.adminDeletePost
);

router.delete(
  "/post/:postId/comment/:commentId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.deleteComment
);

router.delete(
  "/deleteuser/:userId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.deleteUser
);

router.put(
  "/userStatus/:userId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["admin", "superadmin"]),
  adminController.changeUserStatus
);

module.exports = router;
