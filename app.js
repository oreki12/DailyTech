const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { blogSchema, reviewSchema } = require('./schemas')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const Blogs = require('./models/Blogs');
const Review = require('./models/Blogs');


mongoose.connect('mongodb://localhost:27017/DailyTech', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log("MONGO CONNECTION OPEN!!");
})
.catch(err => {
    console.log("MONGO CONNECTION Error...");
    console.log(err);
})


app.engine('ejs', ejsMate);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));


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

// Home
app.get('/', async(req, res) => {
    res.render('Blogs/home',)
})


// Index
app.get('/blogs', async(req, res) => {
    const blogs = await Blogs.find({})
    res.render('Blogs/index', {blogs})
})

// form to create new blog 
app.get('/blogs/new',(req, res) => {
    res.render('Blogs/new');
})

// create new blog
app.post('/blogs', validateBlogs, catchAsync(async(req, res, next) => {
    // console.log(req.body);
    const blog = new Blogs(req.body.blogs)
    await blog.save();
    res.redirect(`/blogs/${blog._id}`)
}))


// show selected blog
app.get('/blogs/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id).populate('reviews');
    // console.log(blog);
    res.render('Blogs/show', { blog })
}))

// render edit form
app.get('/blogs/:id/edit', catchAsync(async(req, res) => {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    res.render('Blogs/edit', {blog});
}))

// update blog
app.put('/blogs/:id', validateBlogs, catchAsync(async(req, res, next) => {
    // res.send('worked')
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id,{ ...req.body.blogs });
    res.redirect(`/blogs/${blog._id}`)
}))

// delete Blog
app.delete('/blogs/:id', catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndRemove(id)  
    res.redirect("/blogs")
}))

// Reviews
app.post('/blogs/:id/reviews', catchAsync(async(req, res,) => {
    // res.send('you made it')
    const blog = await Blogs.findById(req.params.id);
    console.log(blog);
    console.log('=====');
    const review = new Review(req.body.review);
    console.log(review);
    blog.reviews.push(review);
    await review.save();
    await blog.save();
    // req.flash('success', 'Created new review!');
    res.redirect(`/blogs/${blog._id}`);
}))

app.delete('/blogs/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Blogs.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    // req.flash('success', 'Successfully deleted review')
    res.redirect(`/blogs/${id}`);
}))


// error handeling
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {err})
})


app.listen(3000,()=>{
    console.log("Listening to port 3000!");
})
