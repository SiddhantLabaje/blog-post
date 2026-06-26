import apiClient from './api';

/**
 * Fetch all posts with pagination and optional filters.
 */
export const fetchPosts = async ({ page = 1, limit = 10, category = '', status = '' } = {}) => {
  const params = { page, limit };
  if (category) params.category = category;
  if (status) params.status = status;
  const res = await apiClient.get('/posts', { params });
  return res.data;
};

/**
 * Fetch a single post by ID.
 */
export const fetchPostById = async (id) => {
  const res = await apiClient.get(`/posts/${id}`);
  return res.data;
};

/**
 * Create a new post.
 */
export const createPost = async (postData) => {
  const res = await apiClient.post('/posts', postData);
  return res.data;
};

/**
 * Update an existing post by ID.
 */
export const updatePost = async (id, postData) => {
  const res = await apiClient.put(`/posts/${id}`, postData);
  return res.data;
};

/**
 * Delete a post by ID.
 */
export const deletePost = async (id) => {
  const res = await apiClient.delete(`/posts/${id}`);
  return res.data;
};

/**
 * Search posts by keyword with optional filters.
 */
export const searchPosts = async ({ keyword = '', category = '', status = '', page = 1, limit = 10 } = {}) => {
  const params = { page, limit };
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  if (status) params.status = status;
  const res = await apiClient.get('/posts/search', { params });
  return res.data;
};

/**
 * Trigger CSV export download.
 */
export const exportPostsCSV = async ({ keyword = '', category = '', status = '' } = {}) => {
  const params = {};
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  if (status) params.status = status;

  const res = await apiClient.get('/posts/export', {
    params,
    responseType: 'blob',
  });

  // Create a download link and trigger it
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'blog-posts.csv');
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};
