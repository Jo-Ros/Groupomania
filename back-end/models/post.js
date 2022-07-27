const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    postTitle: { type: String },
    postText: { type: String, required: true },
    image: { type: String, required: true },
    usersIdLiked: { type: [String], required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, required: true }
})

module.exports = mongoose.model('Post', postSchema);