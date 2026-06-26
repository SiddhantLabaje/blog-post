const { body, query } = require('express-validator');

const createPostValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),

  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required'),

  body('content')
    .notEmpty()
    .withMessage('Content is required'),

  body('status')
    .optional()
    .isIn(['Draft', 'Published'])
    .withMessage('Status must be Draft or Published'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('thumbnail')
    .optional()
    .trim(),
];

const updatePostValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('status')
    .optional()
    .isIn(['Draft', 'Published'])
    .withMessage('Status must be Draft or Published'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
];

const searchValidator = [
  query('keyword')
    .optional()
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

module.exports = { createPostValidator, updatePostValidator, searchValidator };
