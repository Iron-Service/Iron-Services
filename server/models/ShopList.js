const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shopListSchema = new Schema({
  serviceType: {type:String, required:true},
  serviceList:[{
      name:String
  }]
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ShopList = mongoose.model('ShopList', shopListSchema);
module.exports = ShopList;
