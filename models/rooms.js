var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var roomsSchema = new Schema({
  _id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  persons: {
    type: Array,
  },
  maxNum: String,
});
// 将数据模型暴露出去
module.exports = mongoose.model('rooms', roomsSchema);