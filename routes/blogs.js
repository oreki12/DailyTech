const express = require('express');
const router = express.Router();
const blogs = require('../controllers/blogs')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateBlogs } = require('../middleware')

// Index
router.route('/')
    .get( catchAsync(blogs.index))
    .post(isLoggedIn, validateBlogs, catchAsync(blogs.createdNewBlog))

router.get('/new', isLoggedIn, blogs.renderingNewForm)


// show selected blog
router.route('/:id')
    .get(catchAsync(blogs.showBlog))
    .put(isLoggedIn, isAuthor, validateBlogs, catchAsync(blogs.editBlog))
    .delete(isLoggedIn, isAuthor, catchAsync(blogs.deleteBlog))

// render edit form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(blogs.renderEditForms))


module.exports = router;