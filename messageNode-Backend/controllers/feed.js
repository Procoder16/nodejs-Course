const { validationResult } = require('express-validator');
const Post = require('../models/post');

//.json() because we send a json response only in rest API
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Soumik'
            },
            createdAt: new Date()
        }
    ]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(! errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        //here statusCode is the variable name that depends on us
        throw error;
        //throwing the error basically skips the entire block under this and looks for an error handling middleware
    }
    const title = req.body.title;
    const content = req.body.content;

    //we are not passing id as mongoose will automatically do that for us
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/duck.jpg',
        creator: {
            name: 'Soumik'
        },
    });

    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
            //post here should be equal to the result object that we get in the then block after the save function would be completed successfully
        });
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        //here throwing won't work and hence we are looking for that next error handling middleware and passed err to it
    });
};