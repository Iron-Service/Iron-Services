const express = require('express');
const router  = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Shop = require("../models/Shop");




router.get('/', (req, res, next) => {
  Message.find({_user:req.user.id})
  .then(message => {
    return res.status(200).json(message);
  })
  .catch(err => res.status(500).json({message:err}));
});

router.post("/create/:id", (req, res) => {
  const {title, content} = req.body;
  
  const newMessage = new Message({
    _user:req.user._id,
    _shop:req.params.id,
    title,
    content
  });

  return newMessage.save()
  .then(m => {
    return Promise.all([
      User.findByIdAndUpdate(req.user.id, {$push:{messages:m._id}}),
      Shop.findByIdAndUpdate(req.params.id, {$push:{messages:m._id}})]
    ).then(() => res.status(200).json(m));
    })
    .catch(err => res.status(500).json({message:err}));
   
  
});
router.post("/create/:id/shop/:idu", (req, res) => {
  const {title, content} = req.body;

  const newMessage = new Message({
    _user:req.params.idu,
    _shop:req.params.id,
    title,
    content
  });

  return newMessage.save()
  .then(m => {
    return Promise.all([
      User.findByIdAndUpdate(req.params.idu, {$push:{messages:m._id}}),
      Shop.findByIdAndUpdate(req.params.id, {$push:{messages:m._id}})]
    ).then(() => res.status(200).json(m));
    })
    .catch(err => res.status(500).json({message:err}));

});

router.get('/:id', (req, res, next) => {
  Message.find({$and:[{_user:req.user.id},{_shop:req.params.id}]})
  .then(message => {
    return res.status(200).json(message);
  })
  .catch(err => res.status(500).json({message:err}));
});

router.get('/:id/shop', (req, res, next) => {
  Message.find({_shop:req.params.id})
  .then(message => {
    return res.status(200).json(message);
  })
  .catch(err => res.status(500).json({message:err}));
});

router.get('/:id/shop/:idu', (req, res, next) => {
  Message.find({$and:[{_user:req.params.idu},{_shop:req.params.id}]})
  .then(message => {
    return res.status(200).json(message);
  })
  .catch(err => res.status(500).json({message:err}));
});




module.exports = router;
