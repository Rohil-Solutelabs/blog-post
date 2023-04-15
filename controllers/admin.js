const Post = require("../models/post");
const User = require("../models/user");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "_id",
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Fetched posts successfully.",
      posts: posts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate("author");
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post fetched.", post: post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.adminDeletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.dislikes.totalDislikes > 2) {
      await Post.findByIdAndRemove(postId);
      const user = await User.findById(post.author);
      user.posts.pull(postId);
      await user.save();
      res.status(200).json({ message: "Deleted post" });
    }
    res.status(200).json({ message: "You can't delete this post!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user!");
      error.statusCode = 404;
      throw error;
    }
    await Post.deleteMany({ author: userId });
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: "Deleted user" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};