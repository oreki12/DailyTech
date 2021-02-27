const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');

const blogsRouter = require('./routes/blogs');
const reviewsRouter = require('./routes/reviews');

const mongoose = require('mongoose');

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

const sessionConfig = {
    secret: 'Changethissecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())

// before any route
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

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
