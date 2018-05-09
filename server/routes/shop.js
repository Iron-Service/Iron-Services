const express = require('express');
const router  = express.Router();
const _ = require('lodash');
const Shop = require("../models/Shop");
const Comment = require("../models/Comment");
const Appointment = require("../models/Appointment");
const Message = require("../models/Message");
const User = require("../models/User")

router.post('/create', (req, res) => {
  const {name, direction, description, serviceType, serviceList } = req.body;

  const shop = { name, direction, description, serviceType, serviceList}
  Shop.findOne({direction: shop.direction}).then( shops => {
    
    if(shops && shops.direction === shop.direction ) return res.status(400).json({message:`There's already a shop at ${shop.direction} place.`})
   
    Shop.create(shop,(err, arrayShop) => {
      if(err)  return res.status(400).json({message:`Shop ${shop.name} error.`})
      console.log(`Shop ${shop.name} created.`)
      req.user.update({$push:{shopsList:arrayShop._id}, shop:true}).then(() => 
      res.status(200).json({message:`Shop ${shop.name} created.`}))
    })
  })
})

//Show all shops of the owner
router.get('/', (req, res) => { 
  Shop.find({_id:req.user.shopsList})
  .then(list => {
    let listId = [];
    list.forEach(e => listId.push({id:e._id, name:e.name, direction:e.direction}))
    res.status(200).json(listId)})
  .catch(err => res.status(400).json(err))  
})

//Enter into the shop
router.get('/:id', (req,res) => {
  Shop.findById(req.params.id)
  .then( shop => res.status(200).json(shop))
  .catch( err => res.status(400).json(err))
})

//Update address
router.put('/:id/update', (req,res) => {
  const { direction, description, horario, serviceList } = req.body
  const shopUpdate = { direction, description, horario, serviceList }
  const p = _.pickBy(shopUpdate, _.identity)

  Shop.findByIdAndUpdate(req.params.id, p, {new:true})
  .then( shop => res.status(200).json(shop))
  .catch( err => res.status(400).json(err))
})
//Delete shop
router.delete('/:id/delete', (req,res) => {
  console.log(req.params.id)
  Shop.findByIdAndRemove(req.params.id)
  .then( shop => {
    console.log(shop);
    if(!shop) return res.status(400).json({message:'No such shop was found.'})
    
    function commentPromise () {
      if(!shop.comments) return
      return Promise.all(shop.comments.map(c => Comment.findByIdAndRemove(c))).catch(err => console.log(err))
    }
    function messagePromise () {
      if(!shop.messages) return
      return Promise.all(shop.messages.map(m => Message.findByIdAndRemove(m))).catch(err => console.log(err))
    }
    function appointPromise () {
      if(!shop.appointments) return
      return Promise.all(shop.appointments.map(a => Appointment.findByIdAndRemove(a))).catch()
    } 
    return Promise.all([
      commentPromise(),
      messagePromise(),
      appointPromise(),
      User.findByIdAndUpdate(req.user.id, {$pull:{shopsList:shop._id}}).exec()
    ]).then(()=> res.status(200).json({message:`Shop ${shop.name} removed from DB.`}))
    .catch(err => res.status(304).json({message:err}))

  
  })
  .catch( err => res.status(500).json({message:`Delete did not succeed. ${err}`}))
})
module.exports = router;