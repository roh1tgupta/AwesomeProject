const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema1 = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
})

mongoose.model('messageInfo', userSchema1)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pending:[{
    type: String,
    // ref: "messageInfo"
  }],
  isOffline: {
    type: String,
    default: "false"
  }

//   resetToken:String,
//   expireToken:Date,
})

mongoose.model('user', userSchema)