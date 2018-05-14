

const isUserShop = message => (req,res,next) => req.user && req.user.shop && req.user.shopsList.indexOf(req.params.id) !== -1 ? next() : res.status(500).json({message});





module.exports=isUserShop;