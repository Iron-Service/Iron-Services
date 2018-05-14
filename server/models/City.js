const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const citySchema = new Schema({
  name: {type:String, required:true},
  districts:[{
      name:String,
      lat:Number,
      long:Number
  }],
  lat:Number,
  long:Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const City = mongoose.model('City', citySchema);
module.exports = City;
