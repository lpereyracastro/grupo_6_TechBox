function authMiddleware (req,res,next){
    if(!req.session.UserLogged){
        return res.redirect("/user/userLogin")
    }
    next()
}

module.exports = authMiddleware;