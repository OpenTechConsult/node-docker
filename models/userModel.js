const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
    username: {
        type: String,
        require: [true, "User must have a username"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "User must have a password"],
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;