const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    

})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;