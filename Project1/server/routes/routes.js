const express = require("express");
const router = express.Router();
const usersController = require("../api/auth");
const postsController = require("../api/post");
const { verifyToken } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("Wellcome to Nodejs and Express!!!");
});

// @route GET api/v1/auth/register
// @des Check if user is login
// @access public
router.get("/auth", verifyToken, usersController.getUser);

// @route POST api/v1/auth/register
// @des Register user
// @access
router.post("/auth/register", usersController.Register);

// @route POST api/v1/auth/login
// @des Login user
// @access
router.post("/auth/login", usersController.Login);

// @route GET api/v1/posts
// @des Get posts
// @access Private
router.get("/posts", verifyToken, postsController.getAllPost);

// @route POST api/v1/post
// @des Create post
// @access Private
router.post("/posts", verifyToken, postsController.createPost);

// @route PUT api/v1/posts
// @des Update post
// @access Private
router.put("/posts/:id", verifyToken, postsController.updatePost);

// @route DELETE api/v1/posts
// @des Delete post
// @access Private
router.delete("/posts/:id", verifyToken, postsController.deletePost);

module.exports = router;
