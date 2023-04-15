const express = require("express");
const { body } = require("express-validator");

const blogController = require("../controllers/blog");
const isAuthmiddleware = require("../middleware/is-auth");

const router = express.Router();

router.get(
  "/posts",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user", "admin", "superadmin"]),
  blogController.getPosts
);

router.post(
  "/post",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  blogController.createPost
); //user

router.post(
  "/posts/:postId/like",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.postLike
); //user

router.post(
  "/posts/:postId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.postDislike
); //user

router.get(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user", "admin", "superadmin"]),
  blogController.getPost
); //user

router.post(
  "/post/comment/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.addComment
);
//user
router.delete(
  "/post/:postId/comment/:commentId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.deleteComment
); //user

router.post(
  "/posts/:postId/comments/:commentId/like",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.commentLike
); //user

router.post(
  "/posts/:postId/comments/:commentId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.commentDislike
); //user

router.put(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  blogController.updatePost
); //user

router.delete(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.deletePost
); //user

module.exports = router;
