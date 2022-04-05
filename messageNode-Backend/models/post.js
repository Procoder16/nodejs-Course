const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema is the constructor provided by the mongoose package for creating a new schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    creator: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);
//timestamps option automatically generates the createdAt and updatedAt objects
module.exports = mongoose.model('Post', postSchema);
//In case of the mongoose schema, we do not export the schema, rather we export a model based on that schema with a new name, here Post is the new name