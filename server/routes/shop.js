const express = require('express');
const router  = express.Router();
const _ = require('lodash');
const Shop = require("../models/Shop");
const Comment = require("../models/Comment");
const Appointment = require("../models/Appointment");
const Message = require("../models/Message");

router.post('/create', (req, res) => {
  const {name, direction, description, serviceType, serviceList } = req.body;

  const shop = { name, direction, description, serviceType, serviceList}
  Shop.findOne({direction: shop.direction}).then( shops => {
    
    if(shops && shops.direction === shop.direction ) return res.status(400).json({message:`There's already a shop at ${shop.direction} place.`})
   
    Shop.create(shop,(err, arrayShop) => {
      if(err)  return res.status(400).json({message:`Shop ${shop.name} error.`})
      console.log(`Shop ${shop.name} created.`)
      req.user.update({$push:{shopsList:arrayShop._id}}).then(() => 
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
  Shop.findByIdAndRemove(req.params.id)
  .then( shop => {
    
      Message.findByIdAndRemove(shop.messages)
      Appointment.findByIdAndRemove(shop.appointments)
      Comment.findByIdAndRemove(shop.comments)
    res.status(200).json({message:`Shop ${shop.name} removed from DB.`})
  
  })
  .catch( err => res.status(500).json({message:`Delete did not succeed.`}))
})
module.exports = router;