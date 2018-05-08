require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGODB_URI);

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync("1234", salt);


const users = [
  {
    username: "Pepe",
    email: "pepe@pepe.pepe",
    password: hashPass,
    shop: false,
    admin: false
  }
];

User.create(users, err => {
  if (err) {
    throw err;
  }
  console.log("Se ha añadido un Pepe");
  mongoose.connection.close();
});
