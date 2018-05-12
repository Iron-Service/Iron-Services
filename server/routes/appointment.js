const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Shop = require("../models/Shop");
const Appointment = require("../models/Appointment");
const isAdmin = require("../middlewares/isAdmin");

/* GET home page */
router.get('/', (req, res, next) => {
  Appointment.findOne({_author:req.user.id})
  .then(appointment => res.status(200).json(appointment))
  .catch(err => res.status(500).json({message:err}));
});


router.post("/create/:id", (req, res) => {
  const {content} = req.body;
  const _new = {content, author:req.user.id, shop:req.params.id}
  
  const newAppointment = new Appointment(_new)
  newAppointment.save()
  .then(appointment => res.status(200).json(appointment))
  .catch(err => res.status(500).json({message:err}))
})

router.get("/view", isAdmin("/appointment"), (req, res) => {
  Appointment.find()
  .then(appointment => res.status(200).json(appointment))
  .catch(err => res.status(500).json({message:err}))
})

router.get("/:id", (req, res) => {
  Appointment.findById(req.params.id)
  .then(appointment => res.status(200).json(appointment))
  .catch(err => res.status(500).json({message:err}));
})
module.exports = router;
