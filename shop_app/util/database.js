const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://shop_app:shop_app@cluster0.36ffq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(client => {
    console.log('Database Connected!');
    _db = client.db;
    callback();
  })
  .catch(err => {
    console.log(err)
    throw(err);
  });
}

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'Database error!';
}

exports.MongoClient = MongoClient;
exports.getDb = getDb;