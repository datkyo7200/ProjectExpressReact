const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user");
const postsController = require("../controllers/post");
const { verifyToken } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("Wellcome to Nodejs and Express!!!");
});

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

module.exports = router;
