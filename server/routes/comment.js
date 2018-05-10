const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");
const User = require("../models/User");
const Comment = require("../models/Comment");
const _ = require("lodash");

//  Showing comments on shop's page
router.get("/shop/:id", (req, res, next) => {
  Shop.findById(req.params.id)
    .populate("comments")
    .then(list => {
      res.status(200).json(list.comments);
    })
    .catch(err => res.status(400).json(err));
});

//  Showing comments on user's page
router.get("/user/:id", (req, res) => {
  User.findById(req.user.id)
    .populate("comments")
    .then(list => {
      res.status(200).json(list.comments);
    })
    .catch(err => res.status(400).json(err));
});

//  Putting a comment in the store
router.post("/shop/:id", (req, res) => {
  const { content } = req.body;
  const _author = req.user.id;
  const _shop = req.params.id;
  const comment = { _author, _shop, content };
  Comment.create(comment, (err, arrayComment) => {
    console.log(arrayComment);
    if (err)
      return res.status(400).json({ message: "Unable to fetch new comment" });
    return Promise.all([
      Shop.findByIdAndUpdate(_shop, { $push: { comments: arrayComment._id } }),
      User.findByIdAndUpdate(_author, { $push: { comments: arrayComment._id } })
    ])
      .then(() => res.status(200).json(arrayComment))
      .catch(err => res.status(500).json({ message: err }));
  }).catch(err => res.status(400).json(err));
});


//:id --> id comment; :num ---> "1" = comment positive, "2" = comment negative;
router.get("/:id/:num", (req, res) => {
  const num = req.params.num;
  const id = req.params.id;

  function updateComment(comment, num) {
    Comment.findByIdAndUpdate(comment._id, { $inc: { value: num } },{new:true})
    .then(comment => res.status(200).json(comment))   
  
  }
  function pushUserPositive(id, comment) {
    comment.update({ $push: { evalueesPositive: id } }).then();
  }

  function pushUserNegative(id, comment) {
    comment.update({ $push: { evalueesNegative: id } }).then();
  }

  function pullUserPositive(id, comment) {
    comment.update({ $pull: { evalueesPositive: id } }).then();
  }

  function pullUserNegative(id, comment) {
    comment.update({ $pull: { evalueesNegative: id } }).then();
  }

  Comment.findById(id).then(comment => {
    
    if(!comment) return res.status(500).json({message:"Error"})

    if (comment.evalueesPositive.indexOf(req.user.id) != -1) {
      if (num == "1") {
        pullUserPositive(req.user.id, comment);
        updateComment(comment, -1);
      } else {
        pullUserPositive(req.user.id, comment);
        pushUserNegative(req.user.id, comment);
        updateComment(comment, -2);
      }
    } else if (comment.evalueesNegative.indexOf(req.user.id) != -1) {
      if (num == "2") {
        pullUserNegative(req.user.id, comment);
        updateComment(comment, +1);
      } else {
        pullUserNegative(req.user.id, comment);
        pushUserPositive(req.user.id, comment);
        updateComment(comment, +2);
      }
    } else {
      if (num == "1") {
        pushUserPositive(req.user.id, comment);
        updateComment(comment, 1);
      } else {
        pushUserNegative(req.user.id, comment);
        updateComment(comment, -1);
      }
    }
  });
});

module.exports = router;
