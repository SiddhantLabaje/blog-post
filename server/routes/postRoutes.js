const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {
  createPostValidator,
  updatePostValidator,
  searchValidator,
} = require('../validators/postValidator');

// Search must be defined before /:id to avoid conflict
router.get('/search', searchValidator, postController.searchPosts);

// CSV export
router.get('/export', postController.exportPosts);

// CRUD routes
router.post('/', createPostValidator, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', updatePostValidator, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
