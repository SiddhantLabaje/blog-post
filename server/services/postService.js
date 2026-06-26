const Post = require('../models/Post');

/**
 * Create a new post.
 */
const createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

/**
 * Get all posts with pagination, category filter, and status filter.
 */
const getAllPosts = async ({ page = 1, limit = 10, category = '', status = '' }) => {
  const filter = {};
  if (category) filter.category = { $regex: category, $options: 'i' };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;
  const totalPosts = await Post.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / limit);

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  return { posts, currentPage: Number(page), totalPages, totalPosts };
};

/**
 * Get a single post by ID.
 */
const getPostById = async (id) => {
  return await Post.findById(id).lean();
};

/**
 * Update a post by ID.
 */
const updatePost = async (id, updateData) => {
  return await Post.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).lean();
};

/**
 * Delete a post by ID.
 */
const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id).lean();
};

/**
 * Search posts by keyword (title, author, category), with optional filters.
 */
const searchPosts = async ({ keyword = '', category = '', status = '', page = 1, limit = 10 }) => {
  const filter = {};

  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { author: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (category) filter.category = { $regex: category, $options: 'i' };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;
  const totalPosts = await Post.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / limit);

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  return { posts, currentPage: Number(page), totalPages, totalPosts };
};

/**
 * Get posts for CSV export (all or filtered).
 */
const getPostsForExport = async ({ keyword = '', category = '', status = '' }) => {
  const filter = {};

  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { author: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (category) filter.category = { $regex: category, $options: 'i' };
  if (status) filter.status = status;

  return await Post.find(filter).sort({ createdAt: -1 }).lean();
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  getPostsForExport,
};
