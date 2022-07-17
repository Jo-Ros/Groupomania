const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, },
    postTitle: { type: String, },
    postText: { type: String, },
    image: { type: String, },
    //likes: { type: Number, required: true },
    usersIdLiked: { type: [String], }
})

module.exports = mongoose.model('Post', postSchema);