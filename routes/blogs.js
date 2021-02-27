const express = require('express');
const router = express.Router();
const Blogs = require('../models/Blogs');
const { blogSchema } = require('../schemas')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');



// blog validation
const validateBlogs = ( req, res, next) =>{
    const {error} = blogSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}


// Index
router.get('/', async(req, res) => {
    const blogs = await Blogs.find({})
    res.render('Blogs/index', {blogs})
})

router.get('/new', (req, res) => {
    res.render('Blogs/new');
})

// create new blog
router.post('/', validateBlogs, catchAsync(async(req, res, next) => {
    // console.log(req.body);
    const blog = new Blogs(req.body.blogs)
    await blog.save();
    res.redirect(`/blogs/${blog._id}`)
}))


// show selected blog
router.get('/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id).populate('reviews');
    // console.log(blog);
    res.render('Blogs/show', { blog })
}))

// render edit form
router.get('/:id/edit', catchAsync(async(req, res) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    res.render('Blogs/edit', {blog});
}))

// update blog
router.put('/:id', validateBlogs, catchAsync(async(req, res, next) => {
    // res.send('worked')
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id,{ ...req.body.blogs });
    res.redirect(`/blogs/${blog._id}`)
}))

// delete Blog
router.delete('/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndRemove(id)  
    res.redirect("/blogs")
}))





module.exports = router;