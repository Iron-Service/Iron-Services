const isShop = redirectTo => (req, res, next) => req.user && req.user.shop ? next() : res.redirect(redirectTo);


module.exports = isShop;