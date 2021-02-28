const Blogs = require('./models/Blogs');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');
const { blogSchema, reviewSchema } = require('./schemas');




module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be signed to do this task!')
        return res.redirect('/login');
    }
    next()
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/blogs/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/blogs/${id}`);
    }
    next();
}

// blog validation
module.exports.validateBlogs = ( req, res, next) =>{
    const {error} = blogSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

// reviews validation
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}