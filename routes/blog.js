const express = require("express");
const { body } = require("express-validator");

const blogController = require("../controllers/blog");
const isAuthmiddleware = require("../middleware/is-auth");
const { isSubscribed } = require("../middleware/is-subscribed");

const router = express.Router();

router.get(
  "/posts",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.getPosts
);

router.put(
  "/subscription",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  blogController.getSubscription
);

router.post(
  "/post",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
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
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.postLike
);

router.post(
  "/posts/:postId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.postDislike
);

router.get(
  "/post/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.getPost
);

router.post(
  "/posts/:postId/comment",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.addComment
);

router.delete(
  "/posts/:postId/comment/:commentId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.deleteComment
);

router.post(
  "/posts/:postId/comments/:commentId/like",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.commentLike
);

router.post(
  "/posts/:postId/comments/:commentId/dislike",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.commentDislike
);

router.put(
  "/posts/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  blogController.updatePost
);

router.delete(
  "/posts/:postId",
  isAuthmiddleware.isauth,
  isAuthmiddleware.checkrole(["user"]),
  isAuthmiddleware.checkstatus,
  isSubscribed,
  blogController.deletePost
);

module.exports = router;
