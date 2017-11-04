function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(403).send({ status: "user is not authenticated" });
    }
}

module.exports.checkAuthentication = checkAuthentication;