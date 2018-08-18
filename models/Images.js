var mongoose = require('mongoose');

var imagesSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    user: String
});

module.exports = mongoose.model('Image', imagesSchema);
