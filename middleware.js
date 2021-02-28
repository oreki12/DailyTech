
module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be signed to do this task!')
        return res.redirect('/login');
    }
    next()
}