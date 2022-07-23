const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, },
    postTitle: { type: String, },
    postText: { type: String, },
    image: { type: String, },
    usersIdLiked: { type: [String], },
    username: { type: String, },
    createdAt: { type: Date }
})

module.exports = mongoose.model('Post', postSchema);