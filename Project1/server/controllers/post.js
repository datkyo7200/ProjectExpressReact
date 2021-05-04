const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post");

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate("user", [
            "username",
        ]);
        // .exec((err, story) => {
        //   if (err) return console.error(err);
        //   // console.log(story);
        // });
        res.json({
            success: true,
            massage: "Get all post successfully",
            posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            massage: "Internal server error",
        });
    }
};

const createPost = async (req, res) => {
    const { title, description, status, url } = req.body;
    // console.log("req.userId,", req.userId);
    // console.log(req.body);
    //Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, massage: "Title is required" });

    try {
        const newPost = await new Post({
            title,
            description,
            status,
            url: url.startsWith("https://") ? url : `https://${url}`,
            status: status || "TO LEARN",
            user: req.userId,
        });
        await newPost.save();
        res.json({
            success: true,
            message: "Post created successfully",
            post: newPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            massage: "Internal server error",
        });
    }
};

const updatePost = async (req, res) => {
    const { title, description, status, url } = req.body;
    // console.log("req.userId,", req.userId);
    // console.log(req.body);
    //Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, massage: "Title is required" });

    try {
        let dataUpdatePost = {
            title,
            description: description || "",
            status: status || "TO LEARN",
            url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        };

        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            dataUpdatePost,
            {
                new: true,
            }
        );
        //User not authorised to updated post or post not found
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                massage: "Post not found or user not authorised",
            });
        res.json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            massage: "Internal server error",
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletePost = await Post.findOneAndDelete(postDeleteCondition);

        //User not authorised to updated post or post not found
        if (!deletePost)
            return res.status(401).json({
                success: false,
                massage: "Post not found or user not authorised",
            });
        res.json({
            success: true,
            message: "Post deleted successfully",
            post: deletePost,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            massage: "Internal server error",
        });
    }
};

module.exports = {
    getAllPost,
    createPost,
    updatePost,
    deletePost,
};
