const isShop = message => (req, res, next) => req.user && req.user.shop ? next() : res.status(500).json({message});


module.exports = isShop;