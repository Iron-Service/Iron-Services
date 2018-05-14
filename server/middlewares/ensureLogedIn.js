


const ensureLoggedIn = message => (req,res,next) => req.user ? next(): res.status(500).json({message});



module.exports = ensureLoggedIn;
