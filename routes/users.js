const express = require('express');
const router = express.Router();
const passport = require('passport');
// const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async(req, res) => {
    // res.send(req.body)
    try{
        const{ username, email, password} = req.body;
        const user = new User({ email, username});
        const registeredUser = await User.register(user, password);
        
        // console.log(registeredUser);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success','Welcome to DailyTech');
            res.redirect('/blogs')
        })   
        } catch(e){
            req.flash('error', e.message);
            res.redirect('/register')
        }
})


router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/blogs');
})


module.exports = router;