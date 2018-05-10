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

router.put("/shop/:id", (req, res) => {
  const { positive } = req.body.positive;
  const { negative } = req.body.negative * -1;

  const commentEval = { positive, negative };
  const p = _.pickBy(commentEval, _.identity);
  //if(req.params.id.indexOf(req.params.id) === -1)
  Shop.findById(req.params.id).then(shop => {
    shop.positive += p;
    shop
      .update(
        {
          $and: [
            { $push: { evaluees: req.user.id } },
            { positive: shop.positive }
          ]
        },
        { new: true }
      )
      .then(() => res.status(200).json(shop))
      .catch(err => res.status(400).json(err));
  });
});

module.exports = router;
