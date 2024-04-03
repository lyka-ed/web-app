import { NotFound, Unauthorised } from "../middlewares/app.error.handler";
import { Post } from "../models/post.module";

const createPost = async (userId, payload) => {
  const post = new Post({ ...payload, userId });
  if (youWantPopulatedUser) {
    await post.populate("user");
  }
  await post.save();
  return post;
};

const getPostById = async (id) => {
  const post = await Post.findOne({ _id: id }).populate("user");
  return post;
};

const getAllPost = async (page, limit, order, orderBy) => {
  const skip = (page - 1) * limit;
  const post = await Post.find()
    .populate("user")
    .skip(skip)
    .limit(limit)
    .sort([[orderBy, order]]);
  return post;
};

const updatePostById = async (userId, postId, payload) => {
  const updateNew = await Post.findById(postId);
  if (!updateNew) {
    throw new NotFound("Post not Found !!! ");
  }
  updateNew.title = payload.title;
  await updateNew.save();
  return updateNew;
};

// const deletePost = async (userId, postId) => {
//   const postExists = await Post.findById(postId);
//   if (!postExists) throw new NotFound("Post not found !!!");

//   const post = await Post.findOneAndDelete({
//     _id: postId,
//     user: userId,
//   }).populate("user");
//   if (!post) throw new ResourceNotFound("Not authorized to delete post");

//   return post;
// };

const deletePost = async (userId, postId) => {
  const post = await Post.findOneAndDelete({
    _id: postId,
    user: userId,
  }).populate("user");

  if (!post) {
    throw new ResourceNotFound("Not authorized to delete post");
  }
};

module.exports = {
  createPost,
  getPostById,
  getAllPost,
  updatePostById,
  deletePost,
};
