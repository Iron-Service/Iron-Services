const express = require('express');
const router  = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const _ = require("lodash");

/* GET home page */
router.get('/', (req, res, next) => {
   res.status(200).json(req.user);
});
router.put("/edit", (req, res) => {
    const {username, password, newpassword, newpassword2} = req.body;
    if (password !== password2) return res.status(400).json({message:"Error"});

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    if(req.user.password != hashPass) return res.status(400).json({message:"Error your password"});
    
    const update = {username, newpassword};
    update = _.pickBy(update, _.identity);

    User.findByIdAndUpdate(req.user.id, update, {new:true})
    .then(newuser => res.status(200).json(newuser));
});

module.exports = router;
