const User = require('../models/users');
const passport = require('passport');


module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.newUser = async(req, res) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/blogs';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/blogs');
}
