
const isAdmin = message => (req, res, next) => req.user && req.user.admin ? next() : res.status(500).json({message});


module.exports = isAdmin;