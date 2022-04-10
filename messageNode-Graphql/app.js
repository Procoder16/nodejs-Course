const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { graphqlHTTP } = require('express-graphql');
// express-graphql takes care of all the heavy lifting, for example filtering a specific data

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const { v4: uuidv4 } = require('uuid');
 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: storage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

//The following block of middleware is applied for removing CORS error which arises if the frontend and the backend are hosted on different host
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// this is the error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  //message is a property that is in-built and holds the value we pass as the error message
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  formatError(err) {
    if(!err.originalError){
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An error occured!';
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  }
}));

//we listen to the server only when we get connected/access to the database
mongoose
  .connect(
    'mongodb+srv://soumik:shopapp@cluster0.858cx.mongodb.net/messages?retryWrites=true'
  )
  .then(result => {
      app.listen(9080);
  })
  .catch(err => console.log(err));
