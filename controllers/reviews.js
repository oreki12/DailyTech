const Blogs = require('../models/Blogs');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {
    // res.send("working")
    const blog = await Blogs.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    blog.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await blog.save()
    req.flash('success', 'Succesfully created review');
    res.redirect(`/blogs/${blog._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Blogs.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('error', 'Successfully deleted review')
    res.redirect(`/blogs/${id}`);
}