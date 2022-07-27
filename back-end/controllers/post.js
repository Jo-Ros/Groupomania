const Post = require('../models/post');
const User = require('../models/user');
const fs = require('fs');

// ==============
exports.getAllPosts = async (req, res, next) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' });
            if(!posts) return res.status(400).json({ error: 'Can Not Find Any Post!' });
            res.status(200).json(posts);
        }
        catch (err) {
            console.error(`Error has occured: ${err}`);
            res.status(500).json({ message: `Error has occured: ${err}` });
        }
};

// ==============
exports.createPost = async (req, res, next) => {
    try {
        const currentUser = await User.findOne({ _id: req.auth.userId });

        const postObject = JSON.parse(req.body.post);
        delete postObject._id;
        const newPost =  new Post({
            ...postObject,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            usersIdLiked: [],
            createdAt: Date.now(),
            username: currentUser.username
        });
        
        const post = await newPost.save();

        if(!post) return res.status(400).json({ error: 'Post has not been loaded!' });
        res.status(201).json(({ message: 'Post loaded' }));
    }
    catch (err) {
        console.error(`Error has occured: ${err}`);
        res.status(500).json({ message: `Error has occured: ${err}` })
    }
};

// ==============
exports.getOnePost = async (req, res, next) => {
    try {
        const singlePost = await Post.findOne({ _id: req.params.id });

        if(!singlePost) return res.status(404).json({ error: 'No such post' });
        res.status(200).json(singlePost);
    }
    catch (err) {
        console.error(`Error has occured: ${err}`);
        res.status(500).json({ message: `Error has occured: ${err}` })
    }
};

// ==============
exports.modifyPost = async (req, res, next) => {
    try {
        let postObject;
        const post = await Post.findOne({ _id: req.params.id })

        if (post.userId === req.auth.userId || req.auth.userRole === 'Admin') {
            if (req.file) {
                const filename = post.image.split('/images/')[1];
            
                fs.unlink(`images/${filename}`, (err) => {
                    if(err) throw err;
                })
        
                postObject = 
                {
                    ...JSON.parse(req.body.post),
                    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                }
            }
        
            else {
                postObject = { ...req.body };
            }
        
            await Post.updateOne(
                { _id: req.params.id },
                { ...postObject, _id: req.params.id });
            res.status(200).json({ message: "Modified Post!" });

        }

    }

    catch (err) {
        console.error(`Error has occured: ${err}`);
        res.status(500).json({ message: `Error has occured: ${err}` })
    }
};

// ============== 
exports.deletePost = async (req, res, next) => {
    try {
        const singlePost = await Post.findOne({ _id: req.params.id });
        const filename = singlePost.image.split('/images/')[1];
        const post = await Post.findOne({ _id: req.params.id });

        if (post.userId === req.auth.userId || req.auth.userRole === 'Admin') {

            fs.unlink(`images/${filename}`, async () => {
                if(!post) {
                    return res.status(404).json({ error: new Error('No such post')})
                }
                    
                await Post.deleteOne({ _id: req.params.id });
                res.status(200).json({ message: 'Post has been deleted!'});
            })
        } else {
            return res.status(403).json({ error: new Error('Unauthorized request!')})
        }
    }
    catch (err) {
        console.error(`Error has occured: ${err}`);
        res.status(500).json({ message: `Error has occured: ${err}` })
    }
}

// ==============
exports.likePost = async (req, res, next) =>  {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.usersIdLiked.includes(req.body.userId)) {
            await post.updateOne(
                { $push: { usersIdLiked: req.body.userId }});
            res.status(200).json('The Post Has Been Liked');
        }
        else {
            await post.updateOne(
                { $pull: { usersIdLiked: req.body.userId }});
            res.status(200).json('The Post Has Been UnLiked');
        }
    }
    catch (error) {
        res.status(501).json(error);
    }

};