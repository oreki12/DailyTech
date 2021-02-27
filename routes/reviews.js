const express = require('express');
//===============mergeParams: true if not it will show "reiews" is null.
const router = express.Router({ mergeParams: true });
//===============
const { reviewSchema } = require('../schemas')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Blogs = require('../models/Blogs');
const Review = require('../models/review');



// reviews validation
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


// Reviews
router.post('/', validateReview, catchAsync(async(req, res) => {
    // res.send("working")
    const blog = await Blogs.findById(req.params.id);
    const review = new Review(req.body.review);
    blog.reviews.push(review);
    await review.save();
    await blog.save()
    res.redirect(`/blogs/${blog._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Blogs.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    // req.flash('success', 'Successfully deleted review')
    res.redirect(`/blogs/${id}`);
}))

module.exports = router