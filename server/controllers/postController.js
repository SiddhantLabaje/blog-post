const { validationResult } = require('express-validator');
const { Parser } = require('json2csv');
const postService = require('../services/postService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * POST /api/posts
 * Create a new blog post.
 */
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 422, errors.array());
    }

    const post = await postService.createPost(req.body);
    return sendSuccess(res, { post }, 'Post created successfully', 201);
  } catch (error) {
    return sendError(res, error.message || 'Failed to create post', 500);
  }
};

/**
 * GET /api/posts
 * Get all posts with pagination and filters.
 */
const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category = '', status = '' } = req.query;
    const result = await postService.getAllPosts({ page, limit, category, status });
    return sendSuccess(res, result, 'Posts fetched successfully');
  } catch (error) {
    return sendError(res, error.message || 'Failed to fetch posts', 500);
  }
};

/**
 * GET /api/posts/search
 * Search posts by keyword with optional filters.
 */
const searchPosts = async (req, res) => {
  try {
    const { keyword = '', category = '', status = '', page = 1, limit = 10 } = req.query;
    const result = await postService.searchPosts({ keyword, category, status, page, limit });
    return sendSuccess(res, result, 'Search results fetched successfully');
  } catch (error) {
    return sendError(res, error.message || 'Search failed', 500);
  }
};

/**
 * GET /api/posts/export
 * Export posts to CSV.
 */
const exportPosts = async (req, res) => {
  try {
    const { keyword = '', category = '', status = '' } = req.query;
    const posts = await postService.getPostsForExport({ keyword, category, status });

    if (!posts.length) {
      return sendError(res, 'No posts found to export', 404);
    }

    const fields = [
      { label: 'ID', value: '_id' },
      { label: 'Title', value: 'title' },
      { label: 'Author', value: 'author' },
      { label: 'Email', value: 'email' },
      { label: 'Category', value: 'category' },
      { label: 'Tags', value: (row) => (row.tags || []).join(', ') },
      { label: 'Status', value: 'status' },
      { label: 'Short Description', value: 'shortDescription' },
      { label: 'Thumbnail', value: 'thumbnail' },
      { label: 'Created At', value: (row) => new Date(row.createdAt).toISOString() },
      { label: 'Updated At', value: (row) => new Date(row.updatedAt).toISOString() },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(posts);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="blog-posts.csv"');
    return res.send(csv);
  } catch (error) {
    return sendError(res, error.message || 'Export failed', 500);
  }
};

/**
 * GET /api/posts/:id
 * Get a single post by ID.
 */
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return sendError(res, 'Post not found', 404);
    }
    return sendSuccess(res, { post }, 'Post fetched successfully');
  } catch (error) {
    return sendError(res, error.message || 'Failed to fetch post', 500);
  }
};

/**
 * PUT /api/posts/:id
 * Update a post by ID.
 */
const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 422, errors.array());
    }

    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return sendError(res, 'Post not found', 404);
    }
    return sendSuccess(res, { post }, 'Post updated successfully');
  } catch (error) {
    return sendError(res, error.message || 'Failed to update post', 500);
  }
};

/**
 * DELETE /api/posts/:id
 * Delete a post by ID.
 */
const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return sendError(res, 'Post not found', 404);
    }
    return sendSuccess(res, {}, 'Post deleted successfully');
  } catch (error) {
    return sendError(res, error.message || 'Failed to delete post', 500);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
  exportPosts,
};
