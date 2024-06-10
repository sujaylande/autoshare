import Post from '../models/Post.js';
import User from '../models/User.js';

const createPost = async (req, res) => {

    try {
        const newPostData = {
            source: req.body.source,
            destination: req.body.destination,
            date: req.body.date,
            time: req.body.time,
            passengerNeeded: req.body.passengerNeeded,
            autobooked: req.body.autobooked,
            contact: req.body.contact,
            caption: req.body.caption,

            owner: req.user._id
        }


        const post = await Post.create(newPostData);

        const user = await User.findById(req.user._id);
        //console.log(user);

        user.posts.push(post._id);

        await user.save();

        res.status(201).json({
            success: true,
            post
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const deletePost = async (req, res) => {
    try{                                       //params is used to get the id from the url
        const post = await Post.findById(req.params.id); //find post by id 

        if(!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        if(post.owner.toString() !== req.user._id.toString()){ //check if the post belongs to the user
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this post'
            });
        }

        await post.deleteOne(); //remove is deprecated and no need to give id

        const user = await User.findById(req.user._id); //current user who is logged in

        const index = user.posts.indexOf(req.params.id);

        user.posts.splice(index, 1); //delete post from user's post array

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Post deleted'
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//update caption, passenger and autobooked
const updateCaption = async (req, res) => {

    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        if(post.owner.toString() !== req.user._id.toString()){ //check if the post belongs to the user
            return res.status(404).json({
                success: false,
                message: 'You are not authorized to update this post'
            });
        }

        post.caption = req.body.caption;
        post.passengerNeeded = req.body.passengerNeeded;
        post.autobooked = req.body.autobooked;

        await post.save();

        res.status(200).json({
            success: true,
            message: 'Post updated'
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        // Assuming req.user.id contains the ID of the authenticated user
        const userId = req.user.id;

        // Find the user by their ID and retrieve their posts array
        const user = await User.findById(userId).populate('posts');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            posts: user.posts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const searchPosts = async (req, res) => {
    try {
        const { source, destination, date } = req.body;

        // Check if all required parameters are provided
        if (!source || !destination || !date) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: source, destination, date'
            });
        }

        // Find posts that match all three criteria
        const posts = await Post.find({ 
            source: source,
            destination: destination,
            date: new Date(date)
        });

        res.status(200).json({
            success: true,
            posts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export { createPost, deletePost, updateCaption, getAllPosts, searchPosts};