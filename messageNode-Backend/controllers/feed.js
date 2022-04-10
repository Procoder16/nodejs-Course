const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

// async await and try-catch block
//.json() because we send a json response only in rest API
exports.getPosts = async(req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try{
    totalItems = await Post.find().countDocuments();  // here it will not fetch all the documents, rather it returns the count of the docs present in the db
    const posts = await Post.find().skip((currentPage - 1) * perPage) // since we are adding pagination, this skip() will skip certain number of documents based on the page number
    .limit(perPage); // this specifies the number of documents to have on a particular page
    res.status(200).json({ message: 'Fetched posts successfully.', posts: posts, totalItems: totalItems });
  }
  catch(err){
    if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
  }
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    //here statusCode is the variable name that depends on us
    throw error;
    //throwing the error basically skips the entire block under this and looks for an error handling middleware
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace("\\" ,"/");;
  const title = req.body.title;
  const content = req.body.content;
  let creator;

  //we are not passing id as mongoose will automatically do that for us
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  post
    .save()
    .then(result => {
      return User.findById(req.userId);
      })
      .then(user => {
        creator = user;
        user.posts.push(post);
        return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: post,
        creator: {
          _id: creator._id,
          name: creator.name
        }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
      //here throwing won't work and hence we are looking for that next error handling middleware and passed err to it
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    //here statusCode is the variable name that depends on us
    throw error;
    //throwing the error basically skips the entire block under this and looks for an error handling middleware
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if(req.file){
    imageUrl = req.file.path;
  }
  if(!imageUrl){
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if(!post){
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId){
        const error = new Error('Not authorised!');
        error.statusCode = 403;
        throw error;
      }
      if(imageUrl !== post.imageUrl){
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({message: 'Post Updated!', post: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if(!post){
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId){
        const error = new Error('Not authorised!');
        error.statusCode = 403;
        throw error;
      }
      //check logged in user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({message: 'Deleted post!'});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};