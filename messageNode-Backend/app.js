const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');

const app = express();

const { v4: uuidv4 } = require('uuid');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, uuidv4())
//     }
// });

const storage = multer.diskStorage({
    destination: './images/',
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    },
  });

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

app.use(bodyParser.json());
//.json() because this time we will be inly dealing with JSON data

app.use(multer({storage: storage, fileFilter: fileFilter}).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

//The following block of middleware is applied for removing CORS error which arises if the frontend and the backend are hosted on different host
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    }
);

app.use('/feed', feedRoutes);

// this is the error handling middleware 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    //message is a property that is in-built and holds the value we pass as the error message
    const message = error.message;
    res.status(status).json({message: message});
});

//we listen to the server only when we get connected/access to the database
mongoose.connect('mongodb+srv://soumik:shopapp@cluster0.858cx.mongodb.net/messages')
.then(result => {
    app.listen(9080);
})
.catch(err => {
    console.log(err);
});
