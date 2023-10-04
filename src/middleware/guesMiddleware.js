function guesMiddleware(req,res,next){
    if(req.session.UserLogged){
        return res.redirect("user/profile")
    }
    next();
}

module.exports = guesMiddleware;