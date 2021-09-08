const mongoose = require("mongoose");
const User = mongoose.model("user");

async function updateUser(filter, update) {
    let output = await User.findOneAndUpdate(filter, update);
    return output;
};

async function getUser(filter) {
    let output = await User.findOne(filter);
    return output;
};

module.exports.updateUser = updateUser;
module.exports.getUser = getUser;

