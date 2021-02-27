const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogs');
const reviewsRouter = require('./routes/reviews');


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

app.use('/blogs', blogsRouter);
app.use('/blogs/:id/reviews', reviewsRouter);


// Home
app.get('/', async(req, res) => {
    res.render('Blogs/home',)
})


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
