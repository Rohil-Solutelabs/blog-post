// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// Set up the database connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Post model
const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  dislikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

// Set up the express app
const app = express();
app.use(bodyParser.json());

// Add a like to a post
app.post('/posts/:postId/like', (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId).then(post => {
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post.likes += 1;
    return post.save();
  }).then(post => {
    res.status(200).send(post);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Add a dislike to a post
app.post('/posts/:postId/dislike', (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId).then(post => {
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post.dislikes += 1;
    return post.save();
  }).then(post => {
    res.status(200).send(post);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Retrieve all posts
app.get('/posts', (req, res) => {
  Post.findAll().then(posts => {
    res.status(200).send(posts);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Retrieve a specific post
app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId).then(post => {
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.status(200).send(post);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// Retrieve the like/dislike data for a post
app.get('/posts/:postId/likes', (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId).then(post => {
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.status(200).send({
      likes:
