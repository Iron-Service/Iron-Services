

const isUserShop = redirectTo => (req,res,next) => req.user.shopList.indexOf(req.user.id) !== -1 ? next() : res.redirect(redirectTo)


module.exports=isUserShop;