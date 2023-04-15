const express = require("express");
const { body } = require("express-validator");

const blogController = require("../controllers/blog");
const isAuthmiddleware = require("../middleware/is-auth");

const router = express.Router();

router.get(
  "/posts",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.getPosts
);

router.get(
  "/subscription",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.getSubscription
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
); 

router.post(
  "/posts/:postId/like",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.postLike
);

router.post(
  "/posts/:postId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.postDislike
);

router.get(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user", "admin", "superadmin"]),
  blogController.getPost
);

router.post(
  "/post/comment/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.addComment
);

router.delete(
  "/post/:postId/comment/:commentId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.deleteComment
);

router.post(
  "/posts/:postId/comments/:commentId/like",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.commentLike
);

router.post(
  "/posts/:postId/comments/:commentId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.commentDislike
);

router.put(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  blogController.updatePost
);

router.delete(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  blogController.deletePost
);

module.exports = router;
