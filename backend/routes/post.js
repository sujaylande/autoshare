import express from 'express';
import { createPost, deletePost, updateCaption, getAllPosts, searchPosts } from '../controllers/post.js';
import isAuthenticated from '../middlewares/auth.js';

const router = express.Router();

router.route('/post/upload').post(isAuthenticated, createPost);

router.route('/post/:id')
.put(isAuthenticated, updateCaption)
.delete(isAuthenticated, deletePost);

router.route('/posts').get(isAuthenticated, getAllPosts);

router.route('/search-posts').post(isAuthenticated, searchPosts);




export default router;