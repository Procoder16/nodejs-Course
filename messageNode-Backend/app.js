const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
//.json() because this time we will be inly dealing with JSON data

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
    res.statusCode(status).json({message: message});
});

//we listen to the server only when we get connected/access to the database
mongoose.connect('mongodb+srv://soumik:shopapp@cluster0.858cx.mongodb.net/messages')
.then(result => {
    app.listen(9080);
})
.catch(err => {
    console.log(err);
});
