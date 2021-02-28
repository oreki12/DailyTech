const Blogs = require('../models/Blogs');


module.exports.index = async(req, res) => {
    const blogs = await Blogs.find({}).populate('author')
    res.render('Blogs/index', {blogs})
}

module.exports.renderingNewForm = (req, res) => {
    res.render('Blogs/new');
}

module.exports.createdNewBlog = async(req, res, next) => {
    // console.log(req.body);
    const blog = new Blogs(req.body.blogs)
    blog.author = req.user._id;
    await blog.save();
    req.flash('success', 'Successfully made a new blog!');
    res.redirect(`/blogs/${blog._id}`)
}

module.exports.showBlog = async(req, res, next) => {
    const { id } = req.params;
    const blog = await (await Blogs.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'));
    // console.log(blog);
    if (!blog) {
        req.flash('error', 'Cannot find that blog!');
        return res.redirect('/blogs');
    }
    res.render('Blogs/show', { blog })
}

module.exports.renderEditForms = async(req, res) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
        req.flash('error', 'Cannot find that blog!');
        return res.redirect('/blogs');
    }
    res.render('Blogs/edit', {blog});
}

module.exports.editBlog = async(req, res, next) => {
    // res.send('worked')
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id,{ ...req.body.blogs });
    req.flash('success', 'Successfully edited your blog!');
    res.redirect(`/blogs/${blog._id}`)
}

module.exports.deleteBlog = async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndRemove(id)  
    req.flash('success', 'Successfully deleted your blog!');
    res.redirect("/blogs")
}