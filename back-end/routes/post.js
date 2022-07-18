const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postController = require('../controllers/post');

router.get('/', auth, postController.getAllPosts);
router.post('/', auth, multer, postController.createPost);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);
router.put('/:id/like', auth, postController.likePost);

module.exports = router;