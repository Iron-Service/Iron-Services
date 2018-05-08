const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const directionSchema = new Schema({
    address:String,
    long: Number,
    lat: Number,
      
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Direction = mongoose.model('Direction', directionSchema);
module.exports = Direction;
