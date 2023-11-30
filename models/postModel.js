const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Post must have a title"],
    },
    body: {
        type: String,
        required: [true, "Post must have a body"],
    }, 
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;